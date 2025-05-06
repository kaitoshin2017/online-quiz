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
          <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
          <li><router-link to="/about"><i class="fas fa-info-circle"></i> About</router-link></li>
          <li><router-link to="/faq"><i class="fas fa-question-circle"></i> FAQ</router-link></li>
          <li><router-link to="/login" class="login-btn"><i class="fas fa-sign-in-alt"></i> Login</router-link></li>
          <li><router-link to="/signup" class="signup-btn active"><i class="fas fa-user-plus"></i> Sign Up</router-link></li>
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

            <div class="form-group avatar-upload">
              <label for="avatar">
                <i class="fas fa-image"></i>
                Profile Picture
              </label>
              <div 
                class="avatar-upload-container"
                :class="{ 'has-image': previewUrl }"
                @dragover.prevent="handleDragOver"
                @dragleave.prevent="handleDragLeave"
                @drop.prevent="handleDrop"
              >
                <div class="avatar-preview" v-if="previewUrl">
                  <img :src="previewUrl" alt="Avatar preview" />
                  <button type="button" class="remove-avatar" @click="removeAvatar">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="upload-placeholder" v-else>
                  <i class="fas fa-cloud-upload-alt"></i>
                  <p>Drag & drop your image here or</p>
                  <label for="avatar" class="upload-button">
                    Choose File
                    <input 
                      type="file" 
                      id="avatar" 
                      @change="handleAvatarChange"
                      accept="image/*"
                      class="hidden-input"
                    />
                  </label>
                  <p class="upload-hint">Max file size: 5MB</p>
                </div>
              </div>
              <p class="file-info" v-if="selectedFile">
                Selected: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
              </p>
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
import { ref, computed, onUnmounted } from 'vue'
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
    const previewUrl = ref(null)
    const selectedFile = ref(null)
    const isDragging = ref(false)

    const passwordsMatch = computed(() => {
      return formData.value.password === formData.value.confirmPassword
    })

    const isFormValid = computed(() => {
      // Check basic required fields
      const hasRequiredFields = (
        formData.value.firstName &&
        formData.value.lastName &&
        formData.value.email &&
        formData.value.password &&
        formData.value.confirmPassword &&
        passwordsMatch.value
      );

      // Check role-specific requirements
      if (formData.value.role === 'teacher') {
        return hasRequiredFields && formData.value.teacherCode;
      } else if (formData.value.role === 'admin') {
        return hasRequiredFields && formData.value.adminCode;
      }

      return hasRequiredFields;
    })

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const handleSubmit = async () => {
      if (!isFormValid.value) {
        error.value = 'Please fill in all required fields';
        return;
      }

      try {
        loading.value = true;
        error.value = '';

        // Create data object
        const data = {
          firstName: formData.value.firstName.trim(),
          lastName: formData.value.lastName.trim(),
          email: formData.value.email.trim(),
          password: formData.value.password,
          confirmPassword: formData.value.confirmPassword,
          role: formData.value.role
        };

        // Add optional fields if they exist
        if (formData.value.username) {
          data.username = formData.value.username.trim();
        }
        
        // Add role-specific codes
        if (formData.value.role === 'teacher') {
          data.teacherCode = formData.value.teacherCode;
        } else if (formData.value.role === 'admin') {
          data.adminCode = formData.value.adminCode;
        }

        // Send the request
        const response = await authService.signup(data);
        
        // Redirect to login on success
        router.push('/login');
      } catch (err) {
        console.error('Registration error:', err);
        error.value = err.response?.data?.message || 'Registration failed. Please try again.';
      } finally {
        loading.value = false;
      }
    };

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
        validateAndSetFile(file)
      }
    }

    const handleDragOver = (event) => {
      isDragging.value = true
      event.currentTarget.classList.add('dragging')
    }

    const handleDragLeave = (event) => {
      isDragging.value = false
      event.currentTarget.classList.remove('dragging')
    }

    const handleDrop = (event) => {
      isDragging.value = false
      event.currentTarget.classList.remove('dragging')
      const file = event.dataTransfer.files[0]
      if (file) {
        validateAndSetFile(file)
      }
    }

    const validateAndSetFile = (file) => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        error.value = 'Please upload an image file'
        return
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        error.value = 'File size should be less than 5MB'
        return
      }

      selectedFile.value = file
      formData.value.avatar = file
      
      // Create preview URL
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
      }
      previewUrl.value = URL.createObjectURL(file)
    }

    const removeAvatar = () => {
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
      }
      previewUrl.value = null
      selectedFile.value = null
      formData.value.avatar = null
      const input = document.getElementById('avatar')
      if (input) {
        input.value = ''
      }
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    // Clean up preview URL when component is unmounted
    onUnmounted(() => {
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
      }
    })

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
      handleAvatarChange,
      previewUrl,
      selectedFile,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      removeAvatar,
      formatFileSize
    }
  }
}
</script>
<style scoped>
.registration-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%);
  font-family: "Poppins", sans-serif;
  position: relative;
  overflow: hidden;
}

.registration-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(74, 144, 226, 0.1) 0%, transparent 70%);
  animation: rotate 30s linear infinite;
  z-index: 0;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
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

.desktop-nav li a i {
  margin-right: 8px;
  font-size: 1.1rem;
}

/* Main Content Styles */
main {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.registration-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 900px;
  margin: 40px auto;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.registration-section:hover {
  transform: translateY(-5px);
}

.registration-header {
  margin-bottom: 40px;
  text-align: center;
}

.registration-header h2 {
  color: #4a90e2;
  font-size: 2.5rem;
  margin: 20px 0;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.back-btn {
  background: rgba(74, 144, 226, 0.1);
  border: none;
  color: #4a90e2;
  cursor: pointer;
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(74, 144, 226, 0.2);
  transform: translateX(-5px);
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
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  color: #2c3e50;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
}

.form-group label i {
  color: #4a90e2;
  font-size: 1.1rem;
}

.form-group input,
.form-group select {
  padding: 14px 18px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.15);
  transform: translateY(-2px);
}

.form-group input::placeholder {
  color: #a0aec0;
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
  color: #a0aec0;
  transition: all 0.3s ease;
  padding: 5px;
}

.password-toggle:hover {
  color: #4a90e2;
  transform: translateY(-50%) scale(1.1);
}

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 5px;
  padding: 8px 12px;
  background: rgba(229, 62, 62, 0.1);
  border-radius: 8px;
  border-left: 3px solid #e53e3e;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 30px;
}

.cancel-btn,
.submit-btn {
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 160px;
  justify-content: center;
}

.cancel-btn {
  background: #f7fafc;
  border: 2px solid #e1e8ed;
  color: #4a5568;
}

.cancel-btn:hover {
  background: #edf2f7;
  color: #2d3748;
  transform: translateY(-2px);
}

.submit-btn {
  background: linear-gradient(135deg, #4a90e2 0%, #7b61ff 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.2);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Role Select Styles */
.role-select {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a90e2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2em;
  cursor: pointer;
}

.role-select:hover {
  border-color: #4a90e2;
  transform: translateY(-2px);
}

.role-select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.15);
}

/* Footer Styles */
footer {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  color: #4a5568;
  font-size: 0.9rem;
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
    padding: 30px 20px;
    margin: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn,
  .submit-btn {
    width: 100%;
  }

  .registration-header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .registration-header h2 {
    font-size: 1.8rem;
  }

  .form-group input,
  .form-group select {
    padding: 12px 16px;
  }

  .cancel-btn,
  .submit-btn {
    padding: 12px 24px;
  }
}

/* Dark Mode Support */
:global(.dark-mode) .registration-container {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
}

:global(.dark-mode) .registration-section {
  background: rgba(26, 32, 44, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .form-group input,
:global(.dark-mode) .form-group select {
  background: rgba(45, 55, 72, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

:global(.dark-mode) .form-group label {
  color: #e2e8f0;
}

:global(.dark-mode) .form-group input::placeholder {
  color: #a0aec0;
}

:global(.dark-mode) .cancel-btn {
  background: rgba(45, 55, 72, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

:global(.dark-mode) .cancel-btn:hover {
  background: rgba(55, 65, 82, 0.9);
}

/* Avatar Upload Styles */
.avatar-upload {
  grid-column: 1 / -1;
  max-width: 300px;
  margin: 0 auto;
}

.avatar-upload-container {
  border: 2px dashed #e1e8ed;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  position: relative;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-upload-container:hover,
.avatar-upload-container.dragging {
  border-color: #4a90e2;
  background: rgba(74, 144, 226, 0.05);
}

.avatar-upload-container.has-image {
  border-style: solid;
  padding: 0;
  overflow: hidden;
  min-height: 100px;
}

.avatar-preview {
  width: 100%;
  height: 100px;
  position: relative;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.remove-avatar {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
}

.remove-avatar:hover {
  background: #fff;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-placeholder i {
  font-size: 1.8rem;
  color: #4a90e2;
  margin-bottom: 5px;
}

.upload-placeholder p {
  color: #4a5568;
  margin: 0;
  font-size: 0.9rem;
}

.upload-button {
  background: #4a90e2;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.upload-button:hover {
  background: #357abd;
  transform: translateY(-2px);
}

.upload-hint {
  font-size: 0.75rem;
  color: #a0aec0;
}

.hidden-input {
  display: none;
}

.file-info {
  margin-top: 8px;
  font-size: 0.8rem;
  color: #4a5568;
  text-align: center;
}

/* Dark Mode Support for Avatar Upload */
:global(.dark-mode) .avatar-upload-container {
  background: rgba(45, 55, 72, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .avatar-upload-container:hover,
:global(.dark-mode) .avatar-upload-container.dragging {
  border-color: #7b61ff;
  background: rgba(123, 97, 255, 0.05);
}

:global(.dark-mode) .upload-placeholder p {
  color: #e2e8f0;
}

:global(.dark-mode) .upload-hint {
  color: #a0aec0;
}

:global(.dark-mode) .file-info {
  color: #e2e8f0;
}

:global(.dark-mode) .remove-avatar {
  background: rgba(45, 55, 72, 0.9);
  color: #e2e8f0;
}

:global(.dark-mode) .remove-avatar:hover {
  background: rgba(55, 65, 82, 0.9);
}

/* Responsive Styles for Avatar Upload */
@media (max-width: 768px) {
  .avatar-upload {
    max-width: 250px;
  }

  .avatar-upload-container {
    padding: 12px;
    min-height: 100px;
  }

  .avatar-preview {
    height: 90px;
  }

  .upload-placeholder i {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .avatar-upload {
    max-width: 200px;
  }

  .avatar-upload-container {
    padding: 10px;
    min-height: 90px;
  }

  .avatar-preview {
    height: 80px;
  }

  .upload-placeholder i {
    font-size: 1.3rem;
  }

  .upload-button {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
}
</style>
