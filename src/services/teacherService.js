import api from './api';

const teacherService = {
  initializeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    }
    return false;
  },

  async getDashboard() {
    const response = await api.get('/teacher/dashboard');
    return response.data;
  },

  async getQuizzes() {
    const response = await api.get('/teacher/quizzes');
    return response.data;
  },

  async createQuiz(quizData) {
    const response = await api.post('/teacher/quizzes', quizData);
    return response.data;
  },

  async updateQuiz(id, quizData) {
    const response = await api.put(`/teacher/quizzes/${id}`, quizData);
    return response.data;
  },

  async deleteQuiz(id) {
    const response = await api.delete(`/teacher/quizzes/${id}`);
    return response.data;
  },

  async getStudents() {
    const response = await api.get('/teacher/students');
    return response.data;
  },

  async addStudent(studentData) {
    const response = await api.post('/teacher/students', studentData);
    return response.data;
  },

  async updateStudent(id, studentData) {
    const response = await api.put(`/teacher/students/${id}`, studentData);
    return response.data;
  },

  async deleteStudent(id) {
    const response = await api.delete(`/teacher/students/${id}`);
    return response.data;
  },

  async getResults(quizId, timeRange) {
    // Assuming timeRange is sent as query param
    const params = {};
    if (quizId) params.quizId = quizId;
    if (timeRange) params.timeRange = timeRange;
    const response = await api.get('/teacher/results', { params });
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/teacher/profile');
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.put('/teacher/profile', profileData);
    return response.data;
  },

  async getSettings() {
    const response = await api.get('/teacher/settings');
    return response.data;
  },

  async updateSettings(settingsData) {
    const response = await api.put('/teacher/settings', settingsData);
    return response.data;
  },

  async updateAvatar(formData) {
    const response = await api.post('/teacher/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async changePassword(passwordData) {
    const response = await api.put('/teacher/password', passwordData);
    return response.data;
  }
};

export default teacherService;
