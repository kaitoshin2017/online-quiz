<template>
  <div class="registration-container">
    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    
    <!-- Overlay for mobile -->
    <div class="overlay" :class="{ 'overlay-open': isSidebarOpen }" @click="isSidebarOpen = false"></div>

    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <button class="menu-btn" @click="isSidebarOpen = true">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="desktop-nav">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/signup" class="active">Sign Up</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section class="registration-section">
        <div class="registration-header">
          <button class="back-btn" @click="$router.push('/')">
            <i class="fas fa-arrow-left"></i> Back to Home
          </button>
          <h2><i class="fas fa-user-plus"></i> Create Account</h2>
        </div>

        <form @submit.prevent="handleSubmit" class="registration-form">
          <!-- Error Message -->
          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="username">
                <i class="fas fa-user"></i>
                Username
              </label>
              <input 
                type="text" 
                id="username" 
                v-model="formData.username" 
                placeholder="Choose a username"
                required
              >
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
              <label for="firstName">
                <i class="fas fa-user"></i>
                First Name
              </label>
              <input 
                type="text" 
                id="firstName" 
                v-model="formData.firstName" 
                placeholder="Enter your first name"
                required
              >
            </div>

            <div class="form-group">
              <label for="lastName">
                <i class="fas fa-user"></i>
                Last Name
              </label>
              <input 
                type="text" 
                id="lastName" 
                v-model="formData.lastName" 
                placeholder="Enter your last name"
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
                  placeholder="Choose a password"
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
              <label for="confirmPassword">
                <i class="fas fa-lock"></i>
                Confirm Password
              </label>
              <div class="password-input-wrapper">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="confirmPassword" 
                  v-model="formData.confirmPassword" 
                  placeholder="Confirm your password"
                  required
                >
              </div>
              <span class="error-message" v-if="!passwordsMatch">
                Passwords do not match
              </span>
            </div>

            <div class="form-group">
              <label for="role">
                <i class="fas fa-user-shield"></i>
                Register As
              </label>
              <select 
                id="role" 
                v-model="formData.role" 
                required
                class="role-select"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div class="form-group" v-if="formData.role === 'teacher'">
              <label for="teacherCode">
                <i class="fas fa-key"></i>
                Teacher Code
              </label>
              <input 
                type="text" 
                id="teacherCode" 
                v-model="formData.teacherCode" 
                placeholder="Enter teacher code"
                :required="formData.role === 'teacher'"
              >
            </div>

            <div class="form-group" v-if="formData.role === 'admin'">
              <label for="adminCode">
                <i class="fas fa-key"></i>
                Admin Code
              </label>
              <input 
                type="text" 
                id="adminCode" 
                v-model="formData.adminCode" 
                placeholder="Enter admin code"
                :required="formData.role === 'admin'"
              >
            </div>

            <div class="form-group">
              <label for="avatar">
                <i class="fas fa-image"></i>
                Avatar
              </label>
              <input 
                type="file" 
                id="avatar" 
                @change="handleAvatarChange"
              >
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="handleCancel" :disabled="loading">
              <i class="fas fa-times"></i> Cancel
            </button>
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="!isFormValid || loading"
            >
              <i class="fas fa-user-plus"></i>
              {{ loading ? 'Creating Account...' : 'Create Account' }}
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
import Sidebar from '../components/Sidebar.vue'
import { authService } from '../services/api'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: "RegistrationView",
  components: {
    Logo,
    Sidebar
  },
  setup() {
    const router = useRouter()
    const error = ref('')
    const loading = ref(false)
    const isSidebarOpen = ref(false)

    const formData = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      role: 'student',
      teacherCode: '',
      adminCode: '',
      avatar: null
    })

    const showPassword = ref(false)

    const passwordsMatch = computed(() => {
      return formData.value.password === formData.value.confirmPassword
    })

    const isFormValid = computed(() => {
      const baseValid = (
        formData.value.username &&
        formData.value.email &&
        formData.value.password &&
        formData.value.confirmPassword &&
        formData.value.firstName &&
        formData.value.lastName &&
        passwordsMatch.value
      );

      if (formData.value.role === 'teacher') {
        return baseValid && formData.value.teacherCode;
      } else if (formData.value.role === 'admin') {
        return baseValid && formData.value.adminCode;
      }

      return baseValid;
    })

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const handleSubmit = async () => {
      if (!isFormValid.value) return

      try {
        loading.value = true
        error.value = ''

        const formDataToSend = new FormData()
        formDataToSend.append('username', formData.value.username)
        formDataToSend.append('email', formData.value.email)
        formDataToSend.append('password', formData.value.password)
        formDataToSend.append('confirmPassword', formData.value.confirmPassword)
        formDataToSend.append('firstName', formData.value.firstName)
        formDataToSend.append('lastName', formData.value.lastName)
        formDataToSend.append('role', formData.value.role)
        
        if (formData.value.role === 'teacher') {
          formDataToSend.append('teacherCode', formData.value.teacherCode)
        } else if (formData.value.role === 'admin') {
          formDataToSend.append('adminCode', formData.value.adminCode)
        }

        if (formData.value.avatar) {
          formDataToSend.append('avatar', formData.value.avatar)
        }

        await authService.signup(formDataToSend)
        router.push('/login')
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed. Please try again.'
      } finally {
        loading.value = false
      }
    }

    const handleCancel = () => {
      formData.value = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: 'student',
        teacherCode: '',
        adminCode: '',
        avatar: null
      }
      showPassword.value = false
      error.value = ''
    }

    const handleAvatarChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        formData.value.avatar = file
      }
    }

    return {
      formData,
      showPassword,
      error,
      loading,
      isSidebarOpen,
      passwordsMatch,
      isFormValid,
      togglePassword,
      handleSubmit,
      handleCancel,
      handleAvatarChange
    }
  }
}
</script>
<style scoped>
.registration-container {
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e3f2fd);
  font-family: "Poppins", sans-serif;
}

/* Overlay for mobile */
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay-open {
  display: block;
  opacity: 1;
}

/* Header styles */
header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Menu Button for Mobile */
.menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.menu-btn:hover {
  color: #4a90e2;
  transform: scale(1.1);
}

.logo h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Navigation Styles */
.desktop-nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 25px;
}

.desktop-nav li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 500;
}

.desktop-nav li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.desktop-nav li a:hover::after {
  width: 80%;
}

.desktop-nav li a:hover {
  color: #4a90e2;
}

.desktop-nav li a.active {
  color: #4a90e2;
}

.desktop-nav li a.active::after {
  width: 80%;
}

/* Main Content Styles */
main {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.registration-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  margin: 0 auto;
}

.registration-header {
  margin-bottom: 30px;
  text-align: center;
}

.registration-header h2 {
  color: #4a90e2;
  font-size: 2rem;
  margin: 20px 0;
}

.back-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  color: #4a90e2;
}

.back-btn i {
  margin-right: 5px;
}

/* Form Styles */
.registration-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-group label i {
  color: #4a90e2;
}

.form-group input,
.form-group select {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #4a90e2;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.cancel-btn,
.submit-btn {
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cancel-btn {
  background: #f8f9fa;
  border: 1px solid #ddd;
  color: #666;
}

.cancel-btn:hover {
  background: #e9ecef;
  color: #333;
}

.submit-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  border: none;
  color: white;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Footer Styles */
footer {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .desktop-nav {
    display: none;
  }

  header {
    padding: 1rem;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  .registration-section {
    padding: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn,
  .submit-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .registration-header h2 {
    font-size: 1.5rem;
  }

  .form-group input,
  .form-group select {
    padding: 10px 12px;
  }

  .cancel-btn,
  .submit-btn {
    padding: 10px 20px;
  }
}

.role-select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

.role-select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

:global(.dark-mode) .role-select {
  background-color: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

:global(.dark-mode) .role-select:focus {
  border-color: #7b61ff;
  box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.1);
}
</style>
