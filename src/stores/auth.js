import { defineStore } from 'pinia';
import { authService, studentService } from '../services/api';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const dashboard = ref(null);

    const isAuthenticated = computed(() => !!token.value);
    const userRole = computed(() => user.value?.role);
    const isAdmin = computed(() => user.value?.role === 'admin');
    const isTeacher = computed(() => user.value?.role === 'teacher');
    const isStudent = computed(() => user.value?.role === 'student');

    async function initialize() {
        try {
            const storedUser = authService.getCurrentUser();
            if (storedUser) {
                user.value = storedUser;
                token.value = localStorage.getItem('token');
                if (user.value.role === 'student') {
                    await fetchDashboard();
                }
            }
        } catch (err) {
            console.error('Failed to initialize auth store:', err);
            authService.logout();
        }
    }

    async function register(userData) {
        try {
            loading.value = true;
            error.value = null;
            const response = await authService.signup(userData);
            user.value = response.user;
            token.value = response.token;
            return response;
        } catch (err) {
            error.value = err.response?.data?.message || err.message || 'Signup failed';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function login(email, password) {
        try {
            loading.value = true;
            error.value = null;
            const response = await authService.login(email, password);
            user.value = response.user;
            token.value = response.token;
            
            if (response.user.role === 'student') {
                await fetchDashboard();
            }
            
            return response;
        } catch (err) {
            error.value = err.response?.data?.message || err.message || 'Login failed';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function fetchDashboard() {
        try {
            const response = await studentService.getDashboard();
            dashboard.value = response.data;
        } catch (err) {
            console.error('Error fetching dashboard:', err);
        }
    }

    async function updateProfile(profileData) {
        try {
            const response = await studentService.updateProfile(profileData);
            user.value = response.data;
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || err.message || 'Profile update failed';
            throw err;
        }
    }

    function logout() {
        authService.logout();
        user.value = null;
        token.value = null;
        dashboard.value = null;
        error.value = null;
    }

    return {
        user,
        token,
        loading,
        error,
        dashboard,
        isAuthenticated,
        userRole,
        isAdmin,
        isTeacher,
        isStudent,
        initialize,
        register,
        login,
        fetchDashboard,
        updateProfile,
        logout
    };
}); 