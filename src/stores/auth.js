import { defineStore } from 'pinia';
import { authService, studentService } from '../services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        loading: false,
        error: null,
        dashboard: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        userRole: (state) => state.user?.role,
        isAdmin: (state) => state.user?.role === 'admin',
        isTeacher: (state) => state.user?.role === 'teacher',
        isStudent: (state) => state.user?.role === 'student'
    },

    actions: {
        async initialize() {
            const user = authService.getCurrentUser();
            const token = localStorage.getItem('token');
            if (token && user) {
                this.token = token;
                this.user = user;
                if (user.role === 'student') {
                    await this.fetchDashboard();
                }
            }
        },

        async register(userData) {
            this.loading = true;
            this.error = null;
            try {
                const response = await authService.signup(userData);
                this.user = response.user;
                this.token = response.token;
                return response;
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async login(credentials) {
            this.loading = true;
            this.error = null;
            try {
                const response = await authService.login(credentials.email, credentials.password);
                this.user = response.user;
                this.token = response.token;
                
                if (response.user.role === 'student') {
                    await this.fetchDashboard();
                }
                
                return response;
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchDashboard() {
            try {
                const response = await studentService.getDashboard();
                this.dashboard = response.data;
            } catch (error) {
                console.error('Error fetching dashboard:', error);
            }
        },

        async updateProfile(profileData) {
            try {
                const response = await studentService.updateProfile(profileData);
                this.user = response.data;
                localStorage.setItem('user', JSON.stringify(response.data));
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
                throw error;
            }
        },

        logout() {
            authService.logout();
            this.user = null;
            this.token = null;
            this.dashboard = null;
        }
    }
}); 