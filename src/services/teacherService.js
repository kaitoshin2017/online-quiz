import axios from 'axios';

const API_URL = 'http://localhost:3000/api/teacher';

class TeacherService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor to add token to all requests
    this.api.interceptors.request.use(
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

    // Add response interceptor to handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.setAuthToken(null);
        }
        return Promise.reject(error);
      }
    );
  }

  // Update the authorization token
  setAuthToken(token) {
    if (token) {
      localStorage.setItem('token', token);
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete this.api.defaults.headers.common['Authorization'];
    }
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

  // Login method
  async login(email, password) {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
        role: 'teacher'
      });

      if (response.data.success && response.data.token) {
        this.setAuthToken(response.data.token);
        return response.data;
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get teacher profile
  async getProfile() {
    try {
      const response = await this.api.get('/profile');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid profile response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update teacher profile
  async updateProfile(profileData) {
    try {
      const response = await this.api.put('/profile', profileData);
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid update response');
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
        throw new Error('Invalid dashboard response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get quizzes
  async getQuizzes() {
    try {
      const response = await this.api.get('/quizzes');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid quizzes response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get students
  async getStudents() {
    try {
      const response = await this.api.get('/students');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid students response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get results
  async getResults(quizId, timeRange) {
    try {
      const params = {};
      if (quizId) params.quizId = quizId;
      if (timeRange) params.timeRange = timeRange;

      const response = await this.api.get('/results', { params });
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid results response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get settings
  async getSettings() {
    try {
      const response = await this.api.get('/settings');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid settings response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update settings
  async updateSettings(settings) {
    try {
      const response = await this.api.put('/settings', settings);
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid settings response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create quiz
  async createQuiz(quizData) {
    try {
      const response = await this.api.post('/quizzes', quizData);
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid quiz creation response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling
  handleError(error) {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error
      const message = error.response.data.message || 'Server error occurred';
      if (error.response.status === 401) {
        // Clear token on authentication error
        this.setAuthToken(null);
      }
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server. Please check your connection.');
    } else {
      // Request setup error
      return new Error(error.message || 'Error setting up request');
    }
  }
}

export default new TeacherService(); 