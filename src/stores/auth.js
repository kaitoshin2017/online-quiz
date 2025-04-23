import { defineStore } from 'pinia';
import { auth } from '../services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        loading: false,
        error: null
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
            const token = auth.getToken();
            const user = auth.getCurrentUser();
            if (token && user) {
                this.token = token;
                this.user = user;
            }
        },

        async register(userData) {
            this.loading = true;
            this.error = null;
            try {
                const response = await auth.register(userData);
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
                const response = await auth.login(credentials);
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

        logout() {
            auth.logout();
            this.user = null;
            this.token = null;
        }
    }
}); 