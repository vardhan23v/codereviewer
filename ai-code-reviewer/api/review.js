const buildPrompt = (code, language) => `You are an expert code reviewer. Analyze the provided ${language} code and provide structured feedback in the following JSON format:
{
  "overallScore": <number 0-100>,
  "correctedCode": "<fully corrected code with ALL issues fixed>",
  "issues": [
    {
      "category": "Bugs|Quality|Performance|Security|BestPractices",
      "severity": "Critical|Warning|Info",
      "lineNumber": <number>,
      "title": "<short title>",
      "description": "<detailed explanation>",
      "suggestedFix": "<code suggestion or fix>"
    }
  ],
  "categoryCounts": {
    "Bugs": <count>,
    "Quality": <count>,
    "Performance": <count>,
    "Security": <count>,
    "BestPractices": <count>
  },
  "summary": "<brief summary of overall code quality>"
}
Return ONLY valid JSON, no markdown or extra text.

IMPORTANT: The "correctedCode" field must contain the complete ${language} code with ALL detected issues resolved (bugs, security vulnerabilities, performance issues, and best practice violations fixed). Use the same coding style and structure as the original.

Review this ${language} code:
${code}`;

// --- Gemini API ---
const callGemini = async (prompt, key) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const err = await response.json();
    console.error('Gemini error:', err);
    throw new Error(`Gemini API error: ${response.status} - ${err?.error?.message}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

// --- OpenAI (ChatGPT) API ---
const callOpenAI = async (prompt, key) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const err = await response.json();
    console.error('OpenAI error:', err);
    throw new Error(`OpenAI API error: ${response.status} - ${err?.error?.message}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

// --- Groq API ---
const callGroq = async (prompt, key) => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const err = await response.json();
    console.error('Groq error:', err);
    throw new Error(`Groq API error: ${response.status} - ${err?.error?.message}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, language, customKeys } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Read keys from environment variables or custom frontend overrides
    const geminiKey = customKeys?.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    const openaiKey = customKeys?.OPENAI_API_KEY || process.env.OPENAI_API_KEY || '';
    const groqKey = customKeys?.GROQ_API_KEY || process.env.GROQ_API_KEY || '';

    const prompt = buildPrompt(code, language);
    let text;
    let usedProvider = '';

    const providers = [
      { name: 'Gemini', key: geminiKey, call: callGemini },
      { name: 'ChatGPT', key: openaiKey, call: callOpenAI },
      { name: 'Groq', key: groqKey, call: callGroq },
    ];

    const errors = [];

    for (const provider of providers) {
      if (!provider.key) continue;
      try {
        text = await provider.call(prompt, provider.key);
        usedProvider = provider.name;
        break;
      } catch (err) {
        console.warn(`⚠️ ${provider.name} failed: ${err.message}`);
        errors.push(`${provider.name}: ${err.message}`);
      }
    }

    if (!text) {
      const configured = providers.filter(p => p.key).map(p => p.name);
      if (configured.length === 0) {
        return res.status(400).json({
          error: 'No API keys configured on Vercel. Please add GEMINI_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY in your Vercel Dashboard.'
        });
      }
      return res.status(502).json({
        error: `All configured AI providers failed. Errors: ${errors.join(' | ')}`
      });
    }

    let cleaned = text.replace(/```json|```/g, '').trim();
    let result;
    try {
      result = JSON.parse(cleaned);
    } catch {
      // Escape control chars ONLY inside JSON string values
      cleaned = cleaned.replace(/"(?:[^"\\]|\\.)*"/g, (match) => {
        // eslint-disable-next-line no-control-regex
        return match.replace(/[\u0000-\u001F\u007F]/g, (ch) => {
          const map = { '\n': '\\n', '\r': '\\r', '\t': '\\t', '\b': '\\b', '\f': '\\f' };
          return map[ch] || '';
        });
      });
      result = JSON.parse(cleaned);
    }

    result._provider = usedProvider;
    return res.status(200).json(result);

  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
}
