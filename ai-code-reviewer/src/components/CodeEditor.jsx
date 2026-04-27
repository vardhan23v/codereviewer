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
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-700 p-4 border-b border-gray-600">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-3 py-2 bg-gray-600 hover:bg-gray-500 border border-gray-500 rounded text-sm font-medium transition"
            >
              📁 Upload File
            </button>
            <button
              onClick={onReview}
              disabled={!code.trim() || isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm font-medium transition"
            >
              {isLoading ? '⏳ Reviewing...' : '🔍 Review Code'}
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
      <div className="flex-1">
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
          }}
        />
      </div>
    </div>
  );
}