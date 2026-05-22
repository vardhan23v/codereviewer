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
