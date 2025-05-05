import axios from 'axios';

const API_URL = 'http://localhost:3000/api/teacher';

class TeacherService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  initializeToken() {
    this.token = localStorage.getItem('token');
  }

  setAuthToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  async getProfile() {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch profile');
      }

      if (!response.data.teacher) {
        throw new Error('Teacher profile data is missing');
      }

      return {
        success: true,
        teacher: {
          id: response.data.teacher.id,
          firstName: response.data.teacher.firstName,
          lastName: response.data.teacher.lastName,
          email: response.data.teacher.email,
          phone: response.data.teacher.phone,
          bio: response.data.teacher.bio,
          avatar: response.data.teacher.avatar,
          role: response.data.teacher.role,
          settings: response.data.teacher.settings || {},
          statistics: response.data.teacher.statistics || {
            quizzesCount: 0,
            studentsCount: 0
          }
        }
      };
    } catch (error) {
      console.error('Error fetching teacher profile:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await axios.put(`${API_URL}/profile`, profileData, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  async getSettings() {
    try {
      const response = await axios.get(`${API_URL}/settings`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch settings');
    }
  }

  async updateSettings(settings) {
    try {
      const response = await axios.put(`${API_URL}/settings`, settings, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update settings');
    }
  }

  async updateAvatar(formData) {
    try {
      const response = await axios.post(`${API_URL}/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update avatar');
    }
  }

  async changePassword(passwordData) {
    try {
      const response = await axios.put(`${API_URL}/password`, passwordData, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
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

  // Get dashboard data
  async getDashboard() {
    try {
      const response = await axios.get(`${API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
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
      const response = await axios.get(`${API_URL}/quizzes`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
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
      const response = await axios.get(`${API_URL}/students`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
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

      const response = await axios.get(`${API_URL}/results`, {
        params,
        headers: { Authorization: `Bearer ${this.token}` }
      });
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid results response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create quiz
  async createQuiz(quizData) {
    try {
      const response = await axios.post(`${API_URL}/quizzes`, quizData, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Invalid quiz creation response');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete quiz
  async deleteQuiz(quizId) {
    try {
      const response = await axios.delete(`${API_URL}/quizzes/${quizId}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      return response.data;
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