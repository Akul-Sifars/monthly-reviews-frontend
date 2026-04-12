import React, { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getAllReviews } from '../../api/reviews.api';
import type { Review } from '../../types';
import { Card } from '../../components/ui/Card';

export const ViewReviews: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Query to fetch all reviews
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['allReviews'],
    queryFn: () => getAllReviews(),
  });

  // Compute available months from reviews
  const availableMonths = useMemo(() => {
    if (!reviews) return [];
    const months = Array.from(new Set(reviews.map(r => r.review_month))).sort().reverse();
    return months;
  }, [reviews]);

  // Filter reviews based on selected month
  const filteredReviews = useMemo(() => {
    if (!reviews) return [];
    if (selectedMonth === 'all') return reviews;
    return reviews.filter(r => r.review_month === selectedMonth);
  }, [reviews, selectedMonth]);

  const getQuestionText = (review: Review): string => {
    return `Question #${review.question_id}`;
  };

  const groupReviewsByQuestion = (reviewsToGroup: Review[]): Record<string, Review[]> => {
    const grouped: Record<string, Review[]> = {};
    reviewsToGroup.forEach(review => {
      const key = review.question_id.toString();
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(review);
    });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-blue-600 hover:text-blue-800">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">View Reviews</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="font-medium text-gray-900">Filter by Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Months</option>
              {availableMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <div className="text-sm text-gray-600">
              Showing {filteredReviews.length} review(s)
            </div>
          </div>
        </Card>

        {/* Reviews */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-xl">Loading reviews...</div>
          </div>
        ) : filteredReviews.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500 py-8">No reviews found for the selected period.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupReviewsByQuestion(filteredReviews)).map(([questionId, questionReviews]) => (
              <Card key={questionId}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {getQuestionText(questionReviews[0])}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({questionReviews.length} response{questionReviews.length !== 1 ? 's' : ''})
                  </span>
                </h3>
                <div className="space-y-3">
                  {questionReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 bg-gray-50 rounded border border-gray-200"
                    >
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <p className="text-gray-900 flex-1">{review.answer}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        Submitted: {new Date(review.submitted_at).toLocaleString()} •
                        Month: {review.review_month}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
