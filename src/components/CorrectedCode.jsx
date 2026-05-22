import React from 'react';
import Editor from '@monaco-editor/react';

const CorrectedCode = ({ correctedCode, review, language, onApplyToEditor, onCopy }) => {
  if (!correctedCode || !review) return null;

  const totalIssuesFixed = review.issues ? review.issues.length : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(correctedCode).then(() => {
      onCopy?.();
    });
  };

  const handleApply = () => {
    onApplyToEditor?.(correctedCode);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/5 shadow-2xl">
      {/* Header with title and issue count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
        <div>
          <h3 className="text-xl font-extrabold text-white mb-1 font-heading flex items-center gap-2">
            <span>✨</span> Corrected Code Recommendation
          </h3>
          <p className="text-sm">
            {totalIssuesFixed > 0 ? (
              <>
                <span className="text-emerald-400 font-semibold font-heading bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-xs">
                  {totalIssuesFixed} recommendations applied
                </span>
                <span className="text-slate-400 text-xs ml-2 font-sans font-medium">Ready to apply to workspace</span>
              </>
            ) : (
              <span className="text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-heading">No warnings or critical issues to refactor</span>
            )}
          </p>
        </div>
      </div>

      {/* Code editor */}
      <div className="mb-5 border border-white/10 rounded-xl overflow-hidden shadow-inner bg-[#040711]/60">
        <Editor
          height="320px"
          language={language}
          value={correctedCode}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            fontSize: 13,
            lineNumbers: 'on',
            theme: 'vs-dark',
            padding: { top: 12, bottom: 12 },
          }}
          theme="vs-dark"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handleCopy}
          className="btn-glow btn-glow-secondary px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-1.5"
        >
          <span>📋</span> Copy Fixed Code
        </button>
        <button
          onClick={handleApply}
          className="btn-glow btn-glow-primary px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-1.5"
        >
          <span>↙️</span> Apply to Editor
        </button>
      </div>

      {/* Info message */}
      <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm text-indigo-300 rounded-xl flex items-center gap-2 font-heading leading-relaxed">
        <span>ℹ️</span> 
        <span>Applying this recommended refactor will replace the current draft in your editor workspace.</span>
      </div>
    </div>
  );
};

export default CorrectedCode;
