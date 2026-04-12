import api from './axios.config';
import type { Question } from '../types';

/**
 * Get all active questions (public)
 */
export const getActiveQuestions = async (): Promise<Question[]> => {
  const response = await api.get<Question[]>('/api/questions/active');
  return response.data;
};

/**
 * Get all questions (admin only)
 */
export const getAllQuestions = async (): Promise<Question[]> => {
  const response = await api.get<Question[]>('/api/questions');
  return response.data;
};

/**
 * Create a new question (admin only)
 */
export const createQuestion = async (questionText: string): Promise<Question> => {
  const response = await api.post<Question>('/api/admin/questions', { question_text: questionText });
  return response.data;
};

/**
 * Update a question (admin only)
 */
export const updateQuestion = async (id: number, questionText: string, isActive?: boolean): Promise<Question> => {
  const response = await api.put<Question>(`/api/admin/questions/${id}`, {
    question_text: questionText,
    is_active: isActive,
  });
  return response.data;
};

/**
 * Delete a question (admin only)
 */
export const deleteQuestion = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/questions/${id}`);
};

/**
 * Toggle question active status (admin only)
 */
export const toggleQuestion = async (id: number): Promise<Question> => {
  const response = await api.patch<Question>(`/api/admin/questions/${id}/toggle`);
  return response.data;
};
