import axios from 'axios';

// API base URL - update this to match your backend
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000/api' 
  : 'https://your-production-api.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Token will be added by individual methods when needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error status
      return Promise.reject({
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: -1,
      });
    }
  }
);

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Register new user
  register: async (userData: RegisterData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response;
    } catch (error) {
      console.error('Registration service error:', error);
      throw error;
    }
  },

  // Login user
  login: async (loginData: LoginData) => {
    try {
      const response = await api.post('/auth/login', loginData);
      return response;
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  },

  // Get current user
  getMe: async (token: string) => {
    try {
      const response = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error('Get me service error:', error);
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (token: string) => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return response;
    } catch (error) {
      console.error('Email verification service error:', error);
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      console.error('Forgot password service error:', error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token: string, password: string) => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password });
      return response;
    } catch (error) {
      console.error('Reset password service error:', error);
      throw error;
    }
  },
};

// Calendar service
export const calendarService = {
  // Get today's calendar information
  getToday: async () => {
    try {
      const response = await api.get('/calendar/today');
      return response;
    } catch (error) {
      console.error('Get today calendar error:', error);
      throw error;
    }
  },

  // Get calendar information for specific date
  getDate: async (date: string) => {
    try {
      const response = await api.get(`/calendar/date/${date}`);
      return response;
    } catch (error) {
      console.error('Get date calendar error:', error);
      throw error;
    }
  },

  // Get events for specific month
  getMonthEvents: async (year: number, month: number) => {
    try {
      const response = await api.get(`/calendar/events/${year}/${month}`);
      return response;
    } catch (error) {
      console.error('Get month events error:', error);
      throw error;
    }
  },

  // Get cultural events
  getCulturalEvents: async () => {
    try {
      const response = await api.get('/cultural-events');
      return response;
    } catch (error) {
      console.error('Get cultural events error:', error);
      throw error;
    }
  },
};

// Wisdom service
export const wisdomService = {
  // Get today's wisdom
  getToday: async () => {
    try {
      const response = await api.get('/wisdom/today');
      return response;
    } catch (error) {
      console.error('Get today wisdom error:', error);
      throw error;
    }
  },
};

export default api;