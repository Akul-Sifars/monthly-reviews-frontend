import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import type { ReviewStats } from '../../types';
import { getReviewStats } from '../../api/reviews.api';

const EMPTY_STATS: ReviewStats = {
  totalReviews: 0,
  currentMonthReviews: 0,
  monthlyBreakdown: [],
};
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from '@tanstack/react-router';

export const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Query to fetch review statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ['reviewStats'],
    queryFn: () => getReviewStats(),
  });

  const displayStats = stats ?? EMPTY_STATS;

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  const getCurrentMonth = () => {
    return new Date().toISOString().slice(0, 7); // 'YYYY-MM'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">HR Reviews Admin</h1>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Manage questions and view employee reviews</p>
        </div>

        {/* Stats Cards */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-xl">Loading statistics...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {displayStats.totalReviews}
                </div>
                <div className="text-gray-600">Total Reviews</div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {displayStats.currentMonthReviews}
                </div>
                <div className="text-gray-600">
                  Reviews This Month ({getCurrentMonth()})
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {displayStats.monthlyBreakdown.length}
                </div>
                <div className="text-gray-600">Active Months</div>
              </div>
            </Card>
          </div>
        )}

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/questions">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Manage Questions
              </h3>
              <p className="text-gray-600 mb-4">
                Create, edit, and manage review questions
              </p>
              <div className="text-blue-600 font-medium">
                Manage Questions →
              </div>
            </Card>
          </Link>

          <Link to="/admin/reviews">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                View Reviews
              </h3>
              <p className="text-gray-600 mb-4">
                View and filter anonymous employee reviews
              </p>
              <div className="text-blue-600 font-medium">
                View Reviews →
              </div>
            </Card>
          </Link>
        </div>

        {/* Monthly Breakdown */}
        {!isLoading && displayStats.monthlyBreakdown.length > 0 && (
          <Card className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Monthly Breakdown
            </h3>
            <div className="space-y-2">
              {displayStats.monthlyBreakdown.map((item) => (
                <div
                  key={item.month}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <span className="font-medium text-gray-900">{item.month}</span>
                  <span className="text-blue-600 font-bold">{item.count} reviews</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};
