const getKeys = () => ({
  GEMINI_API_KEY: localStorage.getItem('VITE_GEMINI_API_KEY') || import.meta.env.VITE_GEMINI_API_KEY || '',
  OPENAI_API_KEY: localStorage.getItem('VITE_OPENAI_API_KEY') || import.meta.env.VITE_OPENAI_API_KEY || '',
  GROQ_API_KEY: localStorage.getItem('VITE_GROQ_API_KEY') || import.meta.env.VITE_GROQ_API_KEY || '',
});

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
const callGemini = async (prompt) => {
  const { GEMINI_API_KEY } = getKeys();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

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
  const text = data.candidates[0].content.parts[0].text;
  return text;
};

// --- OpenAI (ChatGPT) API ---
const callOpenAI = async (prompt) => {
  const { OPENAI_API_KEY } = getKeys();
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
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
  const text = data.choices[0].message.content;
  return text;
};

// --- Groq API (FREE - Llama models) ---
const callGroq = async (prompt) => {
  const { GROQ_API_KEY } = getKeys();
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
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
  const text = data.choices[0].message.content;
  return text;
};

// --- Main review function with fallback chain ---
export const reviewCode = async (code, language) => {
  const { GEMINI_API_KEY, OPENAI_API_KEY, GROQ_API_KEY } = getKeys();

  // Try calling the Vercel serverless proxy endpoint first
  try {
    const response = await fetch('/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        language,
        customKeys: {
          GEMINI_API_KEY,
          OPENAI_API_KEY,
          GROQ_API_KEY,
        },
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }

    // If the endpoint exists but threw a structured API error, propagate it
    if (response.status !== 404) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Serverless Proxy Error: ${response.status}`);
    }
  } catch (backendError) {
    // Only log a warning and fallback if it's a 404 (local dev without vercel CLI) or a network connection failure
    console.warn('Vercel serverless proxy unavailable/failed. Falling back to local client-side direct calls:', backendError.message);
  }

  // --- FALLBACK: Client-side direct provider call (useful for local testing) ---
  const prompt = buildPrompt(code, language);
  let text;
  let usedProvider = '';

  const providers = [
    { name: 'Gemini', key: GEMINI_API_KEY, call: callGemini },
    { name: 'ChatGPT', key: OPENAI_API_KEY, call: callOpenAI },
    { name: 'Groq', key: GROQ_API_KEY, call: callGroq },
  ];

  const errors = [];

  for (const provider of providers) {
    if (!provider.key) continue;
    try {
      text = await provider.call(prompt);
      usedProvider = provider.name;
      console.log(`✅ Review completed locally using ${provider.name}`);
      break;
    } catch (err) {
      console.warn(`⚠️ ${provider.name} failed: ${err.message}`);
      errors.push(`${provider.name}: ${err.message}`);
    }
  }

  if (!text) {
    const configured = providers.filter(p => p.key).map(p => p.name);
    if (configured.length === 0) {
      throw new Error('No API keys configured. Please click the Settings (⚙️) icon in the top right to configure your API keys (Gemini, ChatGPT, or Groq) in your browser.');
    }
    throw new Error(`All AI providers failed (${configured.join(', ')}). Please check your API keys or try again later.`);
  }

  let cleaned = text.replace(/```json|```/g, '').trim();

  let result;
  try {
    result = JSON.parse(cleaned);
  } catch {
    // Escape control chars ONLY inside JSON string values (between quotes)
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
  return result;
};

export const detectLanguage = (code) => {
  const patterns = {
    python: /^(?:import|from|def|class|if __name__|print\()/m,
    javascript: /^(?:const|let|var|function|=>|require\(|import\s)/m,
    typescript: /^(?:interface|type|namespace|decorator|import.*from)/m,
    java: /^(?:public class|package|import|synchronized|interface)/m,
    cpp: /^(?:#include|using namespace|int main|template)/m,
    go: /^(?:package|func|import|defer|goroutine)/m,
  };

  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(code)) {
      return lang;
    }
  }
  return 'javascript';
};