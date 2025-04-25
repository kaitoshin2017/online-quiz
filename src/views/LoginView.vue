<template>
  <div class="login-container">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/login" class="active">Login</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section class="login-section">
        <div class="login-header">
          <button class="back-btn" @click="$router.push('/')">
            <i class="fas fa-arrow-left"></i> Back to Home
          </button>
          <h2><i class="fas fa-sign-in-alt"></i> Login</h2>
        </div>

        <form @submit.prevent="handleSubmit" class="login-form">
          <!-- Error Message -->
          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div class="form-group">
            <label for="email">
              <i class="fas fa-envelope"></i>
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              placeholder="Enter your email"
              required
            >
          </div>

          <div class="form-group">
            <label for="password">
              <i class="fas fa-lock"></i>
              Password
            </label>
            <div class="password-input-wrapper">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="formData.password" 
                placeholder="Enter your password"
                required
              >
              <i 
                :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                @click="togglePassword"
                class="password-toggle"
              ></i>
            </div>
          </div>

          <div class="form-group">
            <label for="role">
              <i class="fas fa-user-shield"></i>
              Login As
            </label>
            <select id="role" v-model="formData.role" required>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="handleCancel" :disabled="loading">
              <i class="fas fa-times"></i> Cancel
            </button>
            <button type="submit" class="submit-btn" :disabled="loading">
              <i class="fas fa-sign-in-alt"></i> 
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>
          </div>
        </form>
      </section>
    </main>

    <!-- Footer Section -->
    <footer>
      <p>© 2025 Online Quiz System.STZ MADE CJ Kai Igna</p>
    </footer>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import { authService } from '../services/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: "LoginView",
  components: {
    Logo
  },
  setup() {
    const router = useRouter()
    const error = ref('')
    const loading = ref(false)

    const formData = ref({
      email: '',
      password: '',
      role: 'student'
    })

    const showPassword = ref(false)

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const handleSubmit = async () => {
      try {
        loading.value = true
        error.value = ''
        
        const response = await authService.login(formData.value.email, formData.value.password)
        
        // Redirect based on user role
        if (formData.value.role === 'teacher') {
          router.push('/teacher-panel')
        } else if (formData.value.role === 'admin') {
          router.push('/admin-panel')
        } else {
          router.push('/student')
        }
      } catch (err) {
        error.value = err.response?.data?.message || 'Login failed. Please try again.'
      } finally {
        loading.value = false
      }
    }

    const handleCancel = () => {
      formData.value = {
        email: '',
        password: '',
        role: 'student'
      }
      showPassword.value = false
      error.value = ''
    }

    return {
      formData,
      showPassword,
      error,
      loading,
      togglePassword,
      handleSubmit,
      handleCancel
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e3f2fd);
  font-family: "Poppins", sans-serif;
}

/* Header styles (same as other views) */
header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 25px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

nav ul li a:hover, nav ul li a.active {
  color: #4a90e2;
  background: rgba(74, 144, 226, 0.1);
}

/* Main Content Styles */
main {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.login-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  margin: 0 auto;
}

.login-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateX(-5px);
  background: rgba(74, 144, 226, 0.2);
}

.login-header h2 {
  color: #4a90e2;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

label i {
  color: #4a90e2;
}

input, select {
  width: 85%;
  padding: 12px;
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #4a90e2;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

.cancel-btn, .submit-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.submit-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
}

.cancel-btn:hover, .submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Dark Mode Styles */
:global(.dark-mode) .login-container {
  background: linear-gradient(to right, #1a1a1a, #2d3436);
}

:global(.dark-mode) header {
  background: rgba(30, 30, 30, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) nav ul li a {
  color: #fff;
}

:global(.dark-mode) nav ul li a:hover,
:global(.dark-mode) nav ul li a.active {
  color: #7b61ff;
  background: rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .login-section {
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .back-btn {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

:global(.dark-mode) .back-btn:hover {
  background: rgba(123, 97, 255, 0.2);
}

:global(.dark-mode) label {
  color: #fff;
}

:global(.dark-mode) input,
:global(.dark-mode) select {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

:global(.dark-mode) input:focus,
:global(.dark-mode) select:focus {
  border-color: #7b61ff;
  box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .cancel-btn {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

/* Responsive Design */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    gap: 20px;
  }

  nav ul {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn, .submit-btn {
    width: 100%;
    justify-content: center;
  }
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-message::before {
  content: '⚠️';
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>