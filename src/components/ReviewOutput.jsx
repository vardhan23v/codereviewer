import React, { useState } from 'react';

export default function ReviewOutput({ review, onExport, onCopy }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedIssue, setExpandedIssue] = useState(null);

  if (!review) {
    return (
      <div className="flex flex-col items-center justify-center h-full glass-panel rounded-2xl p-8 text-center min-h-[360px] border border-white/5">
        <div className="text-5xl mb-4 animate-pulse">🤖</div>
        <h3 className="text-xl font-extrabold font-heading mb-2 text-slate-200">No Review Session Active</h3>
        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
          Submit your codebase or files to run a full automated audit. We will evaluate performance, find security vulnerabilities, bugs, and quality recommendations instantly.
        </p>
      </div>
    );
  }

  const severityCardClasses = {
    Critical: 'severity-card-Critical border border-white/5',
    Warning: 'severity-card-Warning border border-white/5',
    Info: 'severity-card-Info border border-white/5',
  };

  const severityBadgeClasses = {
    Critical: 'bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs px-2 py-0.5 rounded font-heading font-semibold',
    Warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2 py-0.5 rounded font-heading font-semibold',
    Info: 'bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs px-2 py-0.5 rounded font-heading font-semibold',
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
    <div className="flex flex-col h-full glass-panel rounded-2xl shadow-2xl overflow-hidden border border-white/5">
      {/* Header */}
      <div className="bg-slate-950/60 p-5 border-b border-white/5 backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold font-heading text-slate-100 flex items-center gap-1.5">
            <span>🛡️</span> Code Review Audit
          </h2>
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              className="btn-glow btn-glow-secondary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <span>📋</span> Copy Report
            </button>
            <button
              onClick={onExport}
              className="btn-glow btn-glow-secondary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <span>📥</span> Export MD
            </button>
          </div>
        </div>

        <div className="text-sm">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-slate-400 font-heading">Overall Health Score:</span>
            <span className="text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              {review.overallScore}/100
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm bg-slate-900/40 p-3 rounded-lg border border-white/5">
            {review.summary}
          </p>
        </div>
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#040711]/45">
        {categories.map((category) => {
          const issues = issuesByCategory[category];
          const count = review.categoryCounts?.[category] || issues.length;

          return (
            <div key={category} className="border border-white/5 bg-slate-950/30 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() =>
                  setExpandedCategory(expandedCategory === category ? null : category)
                }
                className="w-full px-4 py-3 bg-slate-950/40 hover:bg-slate-900/60 border-b border-white/5 flex justify-between items-center transition duration-200 font-heading text-slate-200"
              >
                <span className="font-semibold text-sm sm:text-base flex items-center gap-2">
                  {categoryLabels[category]} <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">{count}</span>
                </span>
                <span className="text-xs text-slate-400">{expandedCategory === category ? '▼' : '▶'}</span>
              </button>

              {expandedCategory === category && (
                <div className="bg-slate-950/10 p-3 space-y-3 border-t border-white/5">
                  {issues.length > 0 ? (
                    issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl cursor-pointer transition-all duration-300 ${
                          severityCardClasses[issue.severity]
                        }`}
                        onClick={() =>
                          setExpandedIssue(expandedIssue === `${category}-${idx}` ? null : `${category}-${idx}`)
                        }
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={severityBadgeClasses[issue.severity]}>
                                {issue.severity}
                              </span>
                              <span className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                                Line {issue.lineNumber}
                              </span>
                            </div>
                            <p className="font-bold text-sm sm:text-base text-slate-100 font-heading">{issue.title}</p>
                            {expandedIssue === `${category}-${idx}` && (
                              <div className="mt-3 space-y-3 border-t border-white/5 pt-3">
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{issue.description}</p>
                                {issue.suggestedFix && (
                                  <div className="code-fix-block p-3 rounded-lg text-xs font-mono overflow-x-auto border border-white/5 shadow-inner mt-2">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                                      <span>💡</span> Suggested Fix:
                                    </p>
                                    <pre className="text-slate-100 font-mono text-xs max-w-full overflow-x-auto">{issue.suggestedFix}</pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="ml-2 text-xs text-slate-400">
                            {expandedIssue === `${category}-${idx}` ? '▼' : '▶'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-400 italic text-center py-3 flex items-center justify-center gap-1.5">
                      <span>🎉</span> Clean! No issues found in this category.
                    </p>
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
