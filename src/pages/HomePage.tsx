import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Anonymous Employee Reviews
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Share your honest feedback and help us build a better workplace together.
            All responses are completely anonymous.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/submit">
              <Button className="text-lg px-8 py-4">
                Submit Your Review
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="secondary" className="text-lg px-8 py-4">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">100% Anonymous</h3>
            <p className="text-gray-600">
              Your feedback is completely anonymous. No names, emails, or identifying information.
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Open Feedback</h3>
            <p className="text-gray-600">
              Share your honest thoughts about your workplace experience. Every voice matters.
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Monthly Reviews</h3>
            <p className="text-gray-600">
              Submit one review per month. Help us track improvements over time.
            </p>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Click "Submit Your Review"</h3>
                <p className="text-gray-600">Access the review form directly - no login required</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Answer the Questions</h3>
                <p className="text-gray-600">Provide your honest feedback on the workplace questions</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Anonymously</h3>
                <p className="text-gray-600">Your responses are stored anonymously and reviewed by HR</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800 text-center">
              <strong>Note:</strong> You can submit one review per month. Reviews help us improve our workplace!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
