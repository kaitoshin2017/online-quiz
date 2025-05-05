import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const studentService = {
  // Get student profile
  async getProfile() {
    try {
      const response = await axios.get(`${API_URL}/student/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Update student profile
  async updateProfile(profileData) {
    try {
      const response = await axios.put(`${API_URL}/student/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Get student dashboard data
  async getDashboardData() {
    try {
      const response = await axios.get(`${API_URL}/student/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Get all quiz results for student
  async getQuizResults() {
    try {
      const response = await axios.get(`${API_URL}/student/results`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Submit quiz
  async submitQuiz(submitData) {
    try {
      const response = await axios.post(`${API_URL}/student/submit-quiz`, submitData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await axios.post(`${API_URL}/student/change-password`, passwordData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Update avatar
  async updateAvatar(avatarUrl) {
    try {
      const response = await axios.post(`${API_URL}/student/update-avatar`, { avatar: avatarUrl }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data.message || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error('Error setting up request');
    }
  }
};

export default studentService; 