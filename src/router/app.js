import HomeView from '@/pages/HomeView.vue';
import RegistrationView from '@/pages/RegistrationView.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/user/:id', // ✅ Corrected path
        name: 'user-profile',
        component: () => import('../pages/UserProfile.vue'),
    },
    {
        path: '/registration',
        name: 'registration',
        component: RegistrationView,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/Login.vue'),
    },
    




];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


export default router;