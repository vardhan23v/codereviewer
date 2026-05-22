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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-gray-850">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h2 className="text-lg font-bold text-slate-100">API Settings</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition text-2xl font-semibold leading-none p-1 rounded-lg hover:bg-gray-800"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <p className="text-sm text-slate-300 leading-relaxed">
            Configure your private API keys below. They are saved <strong>locally in your browser's local storage</strong>, never sent to any server except the official AI provider endpoints.
          </p>

          <div className="space-y-4">
            {/* Gemini */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  Gemini API Key
                  {hasEnvGemini && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase">
                      env active
                    </span>
                  )}
                  {localStorage.getItem('VITE_GEMINI_API_KEY') && (
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase">
                      local
                    </span>
                  )}
                </label>
                <a 
                  href="https://aistudio.google.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-0.5"
                >
                  Get Gemini Key ↗
                </a>
              </div>
              <div className="relative flex rounded-md shadow-sm">
                <input
                  type={showGemini ? 'text' : 'password'}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder={hasEnvGemini ? "•••••••••••••••• (Using system default)" : "Enter Gemini API Key..."}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowGemini(!showGemini)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-gray-700/50 text-xs"
                >
                  {showGemini ? '🙈 Hide' : '👁️ Show'}
                </button>
              </div>
            </div>

            {/* OpenAI */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  OpenAI (ChatGPT) Key
                  {hasEnvOpenai && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase">
                      env active
                    </span>
                  )}
                  {localStorage.getItem('VITE_OPENAI_API_KEY') && (
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase">
                      local
                    </span>
                  )}
                </label>
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-0.5"
                >
                  Get OpenAI Key ↗
                </a>
              </div>
              <div className="relative flex rounded-md shadow-sm">
                <input
                  type={showOpenai ? 'text' : 'password'}
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder={hasEnvOpenai ? "•••••••••••••••• (Using system default)" : "Enter OpenAI API Key..."}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowOpenai(!showOpenai)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-gray-700/50 text-xs"
                >
                  {showOpenai ? '🙈 Hide' : '👁️ Show'}
                </button>
              </div>
            </div>

            {/* Groq */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  Groq API Key (Free)
                  {hasEnvGroq && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase">
                      env active
                    </span>
                  )}
                  {localStorage.getItem('VITE_GROQ_API_KEY') && (
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-1.5 py-0.5 rounded font-normal lowercase">
                      local
                    </span>
                  )}
                </label>
                <a 
                  href="https://console.groq.com/keys" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-0.5"
                >
                  Get Groq Key ↗
                </a>
              </div>
              <div className="relative flex rounded-md shadow-sm">
                <input
                  type={showGroq ? 'text' : 'password'}
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  placeholder={hasEnvGroq ? "•••••••••••••••• (Using system default)" : "Enter Groq API Key..."}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowGroq(!showGroq)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-gray-700/50 text-xs"
                >
                  {showGroq ? '🙈 Hide' : '👁️ Show'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-850 bg-gray-900 flex flex-col sm:flex-row gap-2 sm:justify-between items-center">
          <button
            onClick={handleClearAll}
            className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 rounded transition w-full sm:w-auto"
          >
            🗑️ Clear Local Keys
          </button>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md text-slate-300 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition font-medium shadow-md hover:shadow-blue-500/10"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
