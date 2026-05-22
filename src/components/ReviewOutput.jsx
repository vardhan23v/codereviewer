import React, { useState } from 'react';

export default function ReviewOutput({ review, onExport, onCopy }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedIssue, setExpandedIssue] = useState(null);

  if (!review) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
        <p className="text-gray-400">No review yet. Submit code to get started.</p>
      </div>
    );
  }

  const severityColors = {
    Critical: 'bg-red-900 border-red-600 text-red-100',
    Warning: 'bg-amber-900 border-amber-600 text-amber-100',
    Info: 'bg-blue-900 border-blue-600 text-blue-100',
  };

  const severityBadgeColors = {
    Critical: 'bg-red-600 text-white',
    Warning: 'bg-amber-600 text-white',
    Info: 'bg-blue-600 text-white',
  };

  const categories = ['Bugs', 'Quality', 'Performance', 'Security', 'BestPractices'];
  const categoryLabels = {
    Bugs: '🐛 Bugs',
    Quality: '✨ Quality',
    Performance: '⚡ Performance',
    Security: '🔒 Security',
    BestPractices: '📋 Best Practices',
  };

  const issuesByCategory = {};
  categories.forEach((cat) => {
    issuesByCategory[cat] = review.issues.filter((issue) => issue.category === cat);
  });

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-700 p-4 border-b border-gray-600">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Code Review Results</h2>
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-500 border border-gray-500 rounded text-sm font-medium transition"
            >
              📋 Copy
            </button>
            <button
              onClick={onExport}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-500 border border-gray-500 rounded text-sm font-medium transition"
            >
              📥 Export
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-300">
          <p className="font-semibold">
            Overall Score: <span className="text-2xl font-bold text-blue-400">{review.overallScore}/100</span>
          </p>
          <p className="mt-2">{review.summary}</p>
        </div>
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {categories.map((category) => {
          const issues = issuesByCategory[category];
          const count = review.categoryCounts?.[category] || issues.length;

          return (
            <div key={category} className="border border-gray-600 rounded-lg">
              <button
                onClick={() =>
                  setExpandedCategory(expandedCategory === category ? null : category)
                }
                className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 flex justify-between items-center transition"
              >
                <span className="font-semibold">
                  {categoryLabels[category]} ({count})
                </span>
                <span>{expandedCategory === category ? '▼' : '▶'}</span>
              </button>

              {expandedCategory === category && (
                <div className="bg-gray-750 border-t border-gray-600 p-3 space-y-2">
                  {issues.length > 0 ? (
                    issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className={`p-3 border-l-4 rounded cursor-pointer transition ${
                          severityColors[issue.severity]
                        }`}
                        onClick={() =>
                          setExpandedIssue(expandedIssue === `${category}-${idx}` ? null : `${category}-${idx}`)
                        }
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  severityBadgeColors[issue.severity]
                                }`}
                              >
                                {issue.severity}
                              </span>
                              <span className="text-sm font-mono text-gray-300">
                                Line {issue.lineNumber}
                              </span>
                            </div>
                            <p className="font-semibold">{issue.title}</p>
                            {expandedIssue === `${category}-${idx}` && (
                              <div className="mt-2 space-y-2">
                                <p className="text-sm">{issue.description}</p>
                                {issue.suggestedFix && (
                                  <div className="bg-gray-900 p-2 rounded text-sm font-mono overflow-x-auto border border-gray-600">
                                    <p className="text-gray-400 mb-1">Suggested Fix:</p>
                                    <pre>{issue.suggestedFix}</pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="ml-2">
                            {expandedIssue === `${category}-${idx}` ? '▼' : '▶'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">No issues found in this category!</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
