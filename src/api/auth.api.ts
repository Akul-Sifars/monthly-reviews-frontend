import api from './axios.config';
import { hashPassword } from '../utils/crypto';
import type { AuthResponse } from '../types';

const CLIENT_SALT = import.meta.env.VITE_CLIENT_SALT || 'client_salt_development';

/**
 * Validate admin password
 * @param password - The plain text password
 * @returns Promise with auth response
 */
export const validatePassword = async (password: string): Promise<AuthResponse> => {
  const hashedPassword = await hashPassword(password, CLIENT_SALT);
  const response = await api.post<{ success: boolean; access_token?: string; message: string }>('/api/auth/validate', { hash: hashedPassword });
  return response.data;
};

/**
 * Logout by clearing JWT token
 */
export const logout = (): void => {
  localStorage.removeItem('access_token');
};
