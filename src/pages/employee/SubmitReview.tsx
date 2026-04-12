import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useBrowserId } from '../../hooks/useBrowserId';
import { getActiveQuestions } from '../../api/questions.api';
import { submitReview, checkSubmissionStatus } from '../../api/reviews.api';
import { Card } from '../../components/ui/Card';
import { TextArea } from '../../components/ui/TextArea';
import { Button } from '../../components/ui/Button';

export const SubmitReview: React.FC = () => {
  const browserId = useBrowserId();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string>('');

  // Query to check submission status
  const { data: statusData } = useQuery({
    queryKey: ['submissionStatus', browserId],
    queryFn: () => checkSubmissionStatus(browserId!),
    enabled: !!browserId,
  });

  // Query to fetch active questions
  const { data: questions, isLoading } = useQuery({
    queryKey: ['activeQuestions'],
    queryFn: () => getActiveQuestions(),
    enabled: !statusData?.hasSubmitted,
  });

  // Mutation to submit review
  const submitMutation = useMutation({
    mutationFn: (data: { browserId: string; answers: Array<{ questionId: number; text: string }> }) =>
      submitReview(data.browserId, data.answers),
    onSuccess: () => {
      navigate({ to: '/success' });
    },
    onError: (err: any) => {
      setError(err.message || 'Failed to submit review. Please try again.');
    },
  });

  const handleAnswerChange = (questionId: number, text: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!browserId || !questions) return;

    // Validate all questions are answered
    const unansweredQuestions = questions.filter(q => !answers[q.id]?.trim());
    if (unansweredQuestions.length > 0) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setError('');

    const answersArray = questions.map(q => ({
      questionId: q.id,
      text: answers[q.id],
    }));

    submitMutation.mutate({ browserId, answers: answersArray });
  };

  if (isLoading || !browserId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (statusData?.hasSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Already Submitted</h1>
          <p className="text-gray-600 mb-6">
            You have already submitted your review for this month. Thank you for your feedback!
          </p>
          <p className="text-sm text-gray-500">
            You can submit a new review next month.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Review</h1>
          <p className="text-gray-600 mb-6">
            Please share your honest feedback. All responses are completely anonymous.
          </p>

          {!questions || questions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No active questions available at this time.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              {questions.map(question => (
                <div key={question.id} className="mb-6">
                  <label className="block text-lg font-medium text-gray-900 mb-2">
                    {question.question_text}
                  </label>
                  <TextArea
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder="Enter your feedback here..."
                    required
                  />
                </div>
              ))}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full"
              >
                {submitMutation.isPending ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          )}
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          Your responses are completely anonymous and will be used to improve our workplace.
        </p>
      </div>
    </div>
  );
};
