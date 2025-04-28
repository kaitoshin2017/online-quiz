import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to add the auth token to requests
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

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(`${API_URL}/auth/refresh-token`, {
                        refreshToken,
                    });

                    const { token } = response.data;
                    localStorage.setItem('token', token);

                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, clear tokens and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const authService = {
    async login(email, password, role = 'student') {
        try {
            // Ensure password is trimmed and not empty
            const trimmedPassword = password.trim();
            if (!trimmedPassword) {
                throw new Error('Password cannot be empty');
            }

            const response = await api.post('/auth/login', { 
                email: email.trim().toLowerCase(), 
                password: trimmedPassword,
                role 
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    async signup(userData) {
        try {
            const formData = new FormData();
            
            // Add all user data to FormData
            Object.keys(userData).forEach(key => {
                if (userData[key] !== null && userData[key] !== undefined) {
                    formData.append(key, userData[key]);
                }
            });

            const response = await api.post('/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Signup failed' };
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
};

export const studentService = {
    getProfile: async () => {
        const response = await api.get('/student/profile');
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/student/profile', profileData);
        return response.data;
    },

    getDashboard: async () => {
        const response = await api.get('/student/dashboard');
        return response.data;
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