import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

function shouldRedirectToAdminLoginOn401(error: {
  config?: { url?: string };
}): boolean {
  const requestUrl = error.config?.url ?? '';
  const isAdminApi =
    requestUrl.includes('/api/admin/') || requestUrl.includes('api/admin/');
  if (!isAdminApi) {
    return false;
  }

  const path = window.location.pathname;
  if (path === '/admin/login') {
    return false;
  }
  // Logout navigates here; stale admin requests must not hijack with a hard redirect
  const publicPaths = ['/', '/submit', '/success'];
  if (publicPaths.includes(path)) {
    return false;
  }

  return true;
}

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      if (shouldRedirectToAdminLoginOn401(error)) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
