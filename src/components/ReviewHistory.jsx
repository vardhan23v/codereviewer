import React, { useState, useEffect } from 'react';

export default function ReviewHistory({ onLoadReview, currentReview }) {
  const [reviews, setReviews] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadReviews = () => {
    try {
      const stored = localStorage.getItem('codeReviews');
      if (stored) {
        setReviews(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadReviews();
  }, [currentReview]);

  const deleteReview = (id) => {
    try {
      const updated = reviews.filter((r) => r.id !== id);
      localStorage.setItem('codeReviews', JSON.stringify(updated));
      setReviews(updated);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all review history?')) {
      localStorage.removeItem('codeReviews');
      setReviews([]);
    }
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl border border-white/5 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-slate-950/60 p-4 border-b border-white/5 backdrop-blur-md flex items-center justify-between">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full text-left font-bold font-heading text-sm sm:text-base text-slate-100 flex justify-between items-center transition"
        >
          <span className="flex items-center gap-2">
            <span>📚</span> Review History ({reviews.length})
          </span>
          <span className="text-xs text-slate-400">{showHistory ? '▼' : '▶'}</span>
        </button>
      </div>

      {/* History List */}
      {showHistory && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#040711]/45 max-h-[300px]">
          {reviews.length > 0 ? (
            <>
              <button
                onClick={clearHistory}
                className="w-full px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 rounded-lg text-xs font-semibold transition"
              >
                🗑️ Clear History Cache
              </button>

              {reviews.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950/30 p-3 rounded-xl border border-white/5 hover:border-indigo-500/30 hover:bg-slate-950/50 transition duration-300 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-mono text-xs text-indigo-400 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded-md inline-block mb-1">
                        {item.language}
                      </p>
                      <p className="text-[10px] text-slate-500 font-heading">{item.timestamp}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => onLoadReview(item)}
                        className="btn-glow btn-glow-primary px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1"
                      >
                        📂 Load
                      </button>
                      <button
                        onClick={() => deleteReview(item.id)}
                        className="btn-glow btn-glow-secondary hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 px-2 py-1 rounded-md text-xs font-semibold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 font-heading">
                    Health Score: <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{item.review.overallScore}/100</span>
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-1.5 line-clamp-2 bg-slate-950/50 p-1.5 rounded border border-white/5">
                    {item.code.trim().substring(0, 75)}...
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-6">
              <span className="text-3xl inline-block mb-2 filter saturate-50">📁</span>
              <p className="text-xs text-slate-500 italic">No saved audits in local history</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { ReviewHistory };
