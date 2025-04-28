<script>
export default {
  name: 'App'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="@/assets/logo.svg" alt="EVOS" />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </router-link>
              <router-link
                to="/quizzes"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Quizzes
              </router-link>
              <router-link
                to="/profile"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Profile
              </router-link>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              v-if="!isAuthenticated"
              @click="$router.push('/login')"
              class="btn-primary"
            >
              Login
            </button>
            <div v-else class="ml-3 relative">
              <div class="flex items-center space-x-4">
                <span class="text-gray-700">{{ user?.firstName }}</span>
                <button
                  @click="logout"
                  class="btn-secondary"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="animate-fade-in">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white shadow-sm mt-8">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500 text-sm">
          © 2024 EVOS. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style>
@import '@/assets/styles/main.css';

.router-link-active {
  @apply border-indigo-500 text-gray-900;
}
</style>
