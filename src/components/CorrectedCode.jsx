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
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      {/* Header with title and issue count */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">✨ Corrected Code</h3>
          <p className="text-sm text-gray-400">
            {totalIssuesFixed > 0 ? (
              <>
                <span className="text-green-400 font-semibold">{totalIssuesFixed} issues fixed</span>
                <span className="text-gray-500"> • Ready to apply</span>
              </>
            ) : (
              <span className="text-green-400">No issues to fix</span>
            )}
          </p>
        </div>
      </div>

      {/* Code editor */}
      <div className="mb-4 border border-gray-600 rounded-lg overflow-hidden">
        <Editor
          height="300px"
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
            padding: { top: 10, bottom: 10 },
          }}
          theme="vs-dark"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors flex items-center gap-2"
        >
          📋 Copy Fixed Code
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center gap-2"
        >
          ↙️ Apply to Editor
        </button>
      </div>

      {/* Info message */}
      <div className="mt-4 p-3 bg-blue-900 border border-blue-700 rounded text-sm text-blue-200">
        ℹ️ Applying this code will replace the current code in the editor. You can always review the differences before saving.
      </div>
    </div>
  );
};

export default CorrectedCode;
