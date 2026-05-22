import React, { useState, useEffect } from 'react';

export default function SettingsModal({ isOpen, onClose }) {
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [groqKey, setGroqKey] = useState('');

  const [showGemini, setShowGemini] = useState(false);
  const [showOpenai, setShowOpenai] = useState(false);
  const [showGroq, setShowGroq] = useState(false);

  const [hasEnvGemini, setHasEnvGemini] = useState(false);
  const [hasEnvOpenai, setHasEnvOpenai] = useState(false);
  const [hasEnvGroq, setHasEnvGroq] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load keys from localStorage
      setGeminiKey(localStorage.getItem('VITE_GEMINI_API_KEY') || '');
      setOpenaiKey(localStorage.getItem('VITE_OPENAI_API_KEY') || '');
      setGroqKey(localStorage.getItem('VITE_GROQ_API_KEY') || '');

      // Check if keys are set in environment variables
      setHasEnvGemini(!!import.meta.env.VITE_GEMINI_API_KEY);
      setHasEnvOpenai(!!import.meta.env.VITE_OPENAI_API_KEY);
      setHasEnvGroq(!!import.meta.env.VITE_GROQ_API_KEY);
    }
  }, [isOpen]);

  const handleSave = () => {
    // Save to localStorage
    if (geminiKey.trim()) {
      localStorage.setItem('VITE_GEMINI_API_KEY', geminiKey.trim());
    } else {
      localStorage.removeItem('VITE_GEMINI_API_KEY');
    }

    if (openaiKey.trim()) {
      localStorage.setItem('VITE_OPENAI_API_KEY', openaiKey.trim());
    } else {
      localStorage.removeItem('VITE_OPENAI_API_KEY');
    }

    if (groqKey.trim()) {
      localStorage.setItem('VITE_GROQ_API_KEY', groqKey.trim());
    } else {
      localStorage.removeItem('VITE_GROQ_API_KEY');
    }

    alert('✅ API settings saved successfully!');
    onClose();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all locally saved API keys?')) {
      localStorage.removeItem('VITE_GEMINI_API_KEY');
      localStorage.removeItem('VITE_OPENAI_API_KEY');
      localStorage.removeItem('VITE_GROQ_API_KEY');
      setGeminiKey('');
      setOpenaiKey('');
      setGroqKey('');
      alert('🧹 Local API keys cleared.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition duration-300">
      <div 
        className="w-full max-w-lg glass-panel rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-950/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h2 className="text-lg font-bold font-heading text-slate-100 uppercase tracking-wider">Workspace Key Configuration</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition text-2xl font-semibold leading-none p-1 rounded-lg hover:bg-white/5"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-[#040711]/45">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-3 rounded-lg border border-white/5">
            🔒 <strong>Private Mode active:</strong> Your custom API keys are saved locally in your browser storage. They are never sent to external proxies except the direct endpoints you authorize.
          </p>

          <div className="space-y-4">
            {/* Gemini */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                  Gemini API Key
                  {hasEnvGemini && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase font-heading">
                      env default online
                    </span>
                  )}
                  {localStorage.getItem('VITE_GEMINI_API_KEY') && (
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase font-heading">
                      local overrides
                    </span>
                  )}
                </label>
                <a 
                  href="https://aistudio.google.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline font-heading flex items-center gap-0.5"
                >
                  Get Gemini Key ↗
                </a>
              </div>
              <div className="relative flex rounded-lg shadow-sm">
                <input
                  type={showGemini ? 'text' : 'password'}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder={hasEnvGemini ? "•••••••••••••••• (Using server default key)" : "Enter Gemini API Key..."}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-white/10 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowGemini(!showGemini)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-white/5 text-xs font-heading font-semibold"
                >
                  {showGemini ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* OpenAI */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                  OpenAI (ChatGPT) Key
                  {hasEnvOpenai && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase font-heading">
                      env default online
                    </span>
                  )}
                  {localStorage.getItem('VITE_OPENAI_API_KEY') && (
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase font-heading">
                      local overrides
                    </span>
                  )}
                </label>
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline font-heading flex items-center gap-0.5"
                >
                  Get OpenAI Key ↗
                </a>
              </div>
              <div className="relative flex rounded-lg shadow-sm">
                <input
                  type={showOpenai ? 'text' : 'password'}
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder={hasEnvOpenai ? "•••••••••••••••• (Using server default key)" : "Enter OpenAI API Key..."}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-white/10 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowOpenai(!showOpenai)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-white/5 text-xs font-heading font-semibold"
                >
                  {showOpenai ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Groq */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                  Groq API Key (Free)
                  {hasEnvGroq && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase font-heading">
                      env default online
                    </span>
                  )}
                  {localStorage.getItem('VITE_GROQ_API_KEY') && (
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase font-heading">
                      local overrides
                    </span>
                  )}
                </label>
                <a 
                  href="https://console.groq.com/keys" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline font-heading flex items-center gap-0.5"
                >
                  Get Groq Key ↗
                </a>
              </div>
              <div className="relative flex rounded-lg shadow-sm">
                <input
                  type={showGroq ? 'text' : 'password'}
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  placeholder={hasEnvGroq ? "•••••••••••••••• (Using server default key)" : "Enter Groq API Key..."}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-white/10 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowGroq(!showGroq)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-white/5 text-xs font-heading font-semibold"
                >
                  {showGroq ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-slate-950/40 backdrop-blur-md flex flex-col sm:flex-row gap-2 sm:justify-between items-center">
          <button
            onClick={handleClearAll}
            className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-rose-900/30 rounded-lg transition w-full sm:w-auto font-heading font-semibold text-center"
          >
            🗑️ Clear Local Storage Cache
          </button>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="btn-glow btn-glow-secondary px-4 py-2 text-sm rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-glow btn-glow-primary px-5 py-2 text-sm rounded-lg transition font-medium shadow-md"
            >
              Save Key Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
