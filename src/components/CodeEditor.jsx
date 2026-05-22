import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
  onReview,
  isLoading,
  onFileUpload,
}) {
  const fileInputRef = useRef(null);

  const languages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'cpp',
    'csharp',
    'go',
    'php',
    'ruby',
    'rust',
    'swift',
    'kotlin',
    'sql',
    'html',
    'css',
    'json',
    'yaml',
    'markdown',
    'bash',
    'powershell',
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setCode(content);
        onFileUpload?.(file.name, content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col h-full glass-panel glass-panel-hover rounded-2xl shadow-2xl overflow-hidden border border-white/5">
      {/* Header */}
      <div className="bg-slate-950/60 p-4 border-b border-white/5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-2.5">
            <label className="text-sm font-heading text-slate-300 font-medium">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 bg-slate-950/80 border border-white/10 rounded-lg text-sm text-slate-200 hover:border-indigo-500/50 hover:bg-slate-950 transition cursor-pointer font-heading"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-glow btn-glow-secondary px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5"
            >
              <span>📁</span> Upload File
            </button>
            <button
              onClick={onReview}
              disabled={!code.trim() || isLoading}
              className="btn-glow btn-glow-primary px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition flex items-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Reviewing...</span>
                </>
              ) : (
                <>
                  <span>🔍</span> Review Code
                </>
              )}
            </button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.cc,.cxx,.cs,.go,.php,.rb,.rs,.swift,.kt,.kts,.sql,.html,.htm,.css,.json,.yaml,.yml,.md,.sh,.bash,.ps1"
          className="hidden"
        />
      </div>

      {/* Editor */}
      <div className="flex-1 bg-[#040711]/60">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
}