import api from './axios.config';
import type { Answer, SubmissionResponse, SubmissionStatus, Review, ReviewStats } from '../types';

/**
 * Submit a review (public)
 */
export const submitReview = async (browserId: string, answers: Answer[]): Promise<SubmissionResponse> => {
  const response = await api.post<SubmissionResponse>('/api/reviews/submit', {
    browserId,
    answers,
  });
  return response.data;
};

/**
 * Check submission status for a browser (public)
 */
export const checkSubmissionStatus = async (browserId: string): Promise<SubmissionStatus> => {
  const response = await api.get<SubmissionStatus>(`/api/reviews/status/${browserId}`);
  return response.data;
};

/**
 * Get all reviews (admin only)
 */
export const getAllReviews = async (month?: string): Promise<Review[]> => {
  const params = month ? { month } : {};
  const response = await api.get<Review[]>('/api/admin/reviews/all', { params });
  return response.data;
};

/**
 * Get reviews for a specific month (admin only)
 */
export const getReviewsByMonth = async (month: string): Promise<Review[]> => {
  const response = await api.get<Review[]>(`/api/admin/reviews/${month}`);
  return response.data;
};

/**
 * Get review statistics (admin only)
 */
export const getReviewStats = async (): Promise<ReviewStats> => {
  const response = await api.get<ReviewStats>('/api/admin/reviews/stats/summary');
  return response.data;
};
