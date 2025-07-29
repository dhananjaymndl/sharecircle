import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    location?: string;
  }) => api.post('/auth/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),

  getProfile: () => api.get('/auth/profile'),

  updateProfile: (profileData: {
    name?: string;
    phone?: string;
    location?: string;
  }) => api.put('/auth/profile', profileData),

  updatePassword: (passwordData: { newPassword: string }) =>
    api.put('/auth/password', passwordData),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health', { baseURL: 'http://localhost:5000' }),
};

export default api;
