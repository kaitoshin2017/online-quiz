import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin';

class AdminService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Initialize token from localStorage
    this.initializeToken();
  }

  // Initialize token from localStorage
  initializeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setAuthToken(token);
      return true;
    }
    return false;
  }

  // Set auth token
  setAuthToken(token) {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      return true;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      return false;
    }
  }

  // Login method
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      if (response.data.success && response.data.token) {
        this.setAuthToken(response.data.token);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Invalid login response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get admin profile
  async getProfile() {
    try {
      const response = await this.api.get('/profile');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch profile');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get dashboard data
  async getDashboard() {
    try {
      const response = await this.api.get('/dashboard');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all users
  async getUsers() {
    try {
      const response = await this.api.get('/users');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch users');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all teachers
  async getTeachers() {
    try {
      const response = await this.api.get('/teachers');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch teachers');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all students
  async getStudents() {
    try {
      const response = await this.api.get('/students');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch students');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all quizzes
  async getQuizzes() {
    try {
      const response = await this.api.get('/quizzes');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch quizzes');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get system settings
  async getSettings() {
    try {
      const response = await this.api.get('/settings');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch settings');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update system settings
  async updateSettings(settings) {
    try {
      const response = await this.api.put('/settings', settings);
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to update settings');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle errors
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        this.setAuthToken(null);
        // Only redirect if we're not already on the login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      return {
        success: false,
        message: error.response.data.message || 'An error occurred',
        status: error.response.status
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        success: false,
        message: 'No response from server',
        status: 0
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        message: error.message,
        status: 0
      };
    }
  }
}

export default new AdminService(); 