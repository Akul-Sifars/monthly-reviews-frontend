import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const ReviewSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You!
        </h1>

        <p className="text-gray-600 mb-6">
          Your review has been submitted successfully. We appreciate your honest feedback.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Your responses are completely anonymous and will help us improve our workplace.
        </p>

        <Link to="/">
          <Button variant="secondary" className="w-full">
            Back to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};
