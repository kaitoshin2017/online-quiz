import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const auth = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getToken: () => {
        return localStorage.getItem('token');
    }
};

export const quizzes = {
    getAll: () => api.get('/quizzes'),
    getById: (id) => api.get(`/quizzes/${id}`),
    create: (quizData) => api.post('/quizzes', quizData),
    update: (id, quizData) => api.put(`/quizzes/${id}`, quizData),
    delete: (id) => api.delete(`/quizzes/${id}`),
    submit: (id, answers) => api.post(`/quizzes/${id}/submit`, answers)
};

export const users = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (profileData) => api.put('/users/profile', profileData),
    changePassword: (passwordData) => api.put('/users/change-password', passwordData)
};

export default api; 