import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import RegistrationView from '../views/SignupView.vue'
import TeacherPannel from '../views/TeacherPannel.vue'
import StudentPanel from '../views/StudentPanel.vue'
import AdminPanel from '../views/AdminPanel.vue'
import SignupView from '../views/SignupView.vue'
import FAQView from '../views/FAQView.vue'
import QuizEditor from '../components/QuizEditor.vue'
import { useAuthStore } from '../stores/auth'

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
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/teacher-panel',
      name: 'teacher-panel',
      component: TeacherPannel,
    },
    {
      path: '/student',
      name: 'student',
      component: StudentPanel,
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
      path: '/quiz/edit/:id',
      name: 'quiz-edit',
      component: QuizEditor,
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
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQView,
    },
  ],
})

// Define which routes require authentication
const protectedRoutes = [
  'teacher-panel',
  'student',
  'admin-panel',
  'my-quizzes',
  'quiz-edit',
  'take-quiz',
  'results',
  'profile',
  'review-quiz'
]

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (protectedRoutes.includes(to.name) && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
