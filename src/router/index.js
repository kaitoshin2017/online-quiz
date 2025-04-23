import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import TeacherPannel from '../views/TeacherPannel.vue'
import StudentView from '../views/StudentView.vue'
import AdminPanel from '../views/AdminPanel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/signup',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/teacher-panel',
      name: 'teacher-panel',
      component: TeacherPannel,
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView,
    },
    {
      path: '/admin-panel',
      name: 'admin-panel',
      component: AdminPanel,
    },
    {
      path: '/my-quizzes',
      name: 'my-quizzes',
      component: () => import('../views/MyQuizzesView.vue'),
    },
    {
      path: '/take-quiz/:id',
      name: 'take-quiz',
      component: () => import('../views/TakeQuizView.vue'),
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/ResultsView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/review-quiz/:id',
      name: 'review-quiz',
      component: () => import('../views/ReviewQuizView.vue'),
    }
  ],
})

export default router
