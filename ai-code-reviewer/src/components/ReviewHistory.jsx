import React, { useState, useEffect } from 'react';

export default function ReviewHistory({ onLoadReview, currentReview }) {
  const [reviews, setReviews] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [currentReview]);

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

  const saveReview = (code, language, review) => {
    try {
      const newReview = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        code,
        language,
        review,
      };

      const stored = localStorage.getItem('codeReviews');
      const allReviews = stored ? JSON.parse(stored) : [];
      allReviews.unshift(newReview);

      // Keep only last 20 reviews
      if (allReviews.length > 20) {
        allReviews.pop();
      }

      localStorage.setItem('codeReviews', JSON.stringify(allReviews));
      setReviews(allReviews);
      return newReview.id;
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

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
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-700 p-4 border-b border-gray-600">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-semibold transition flex justify-between items-center"
        >
          <span>📚 Review History ({reviews.length})</span>
          <span>{showHistory ? '▼' : '▶'}</span>
        </button>
      </div>

      {/* History List */}
      {showHistory && (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {reviews.length > 0 ? (
            <>
              <button
                onClick={clearHistory}
                className="w-full px-3 py-2 bg-red-900 hover:bg-red-800 border border-red-700 rounded text-sm font-medium transition text-red-200 mb-3"
              >
                🗑️ Clear All History
              </button>

              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-700 p-3 rounded border border-gray-600 hover:border-gray-500 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-mono text-sm text-blue-300">{review.language}</p>
                      <p className="text-xs text-gray-400">{review.timestamp}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onLoadReview(review)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-medium transition"
                      >
                        📂 Load
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-xs font-medium transition"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    Score: <span className="font-bold text-blue-400">{review.review.overallScore}/100</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {review.code.substring(0, 50)}...
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p className="text-sm text-gray-400 italic text-center py-8">No reviews saved yet</p>
          )}
        </div>
      )}
    </div>
  );
}

export { ReviewHistory };
export const useReviewHistory = () => {
  return {
    saveReview: (code, language, review) => {
      const newReview = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        code,
        language,
        review,
      };

      try {
        const stored = localStorage.getItem('codeReviews');
        const allReviews = stored ? JSON.parse(stored) : [];
        allReviews.unshift(newReview);

        if (allReviews.length > 20) {
          allReviews.pop();
        }

        localStorage.setItem('codeReviews', JSON.stringify(allReviews));
      } catch (error) {
        console.error('Error saving review:', error);
      }
    },
  };
};
