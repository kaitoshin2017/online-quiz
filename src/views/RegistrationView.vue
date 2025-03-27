<template>
  <div class="registration-container">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <ul>
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
          <div class="form-grid">
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
              <label for="section">
                <i class="fas fa-users"></i>
                Section
              </label>
              <input 
                type="text" 
                id="section" 
                v-model="formData.section" 
                placeholder="Enter your section"
                required
              >
            </div>

            <div class="form-group">
              <label for="birthDate">
                <i class="fas fa-calendar"></i>
                Birth Date
              </label>
              <input 
                type="date" 
                id="birthDate" 
                v-model="formData.birthDate" 
                required
              >
            </div>

            <div class="form-group">
              <label for="profilePicture">
                <i class="fas fa-camera"></i>
                Profile Picture
              </label>
              <div class="file-upload">
                <input 
                  type="file" 
                  id="profilePicture" 
                  @change="handleFileUpload" 
                  accept="image/*"
                  ref="fileInput"
                >
                <div class="upload-preview" v-if="formData.profilePicture">
                  <img :src="formData.profilePicture" alt="Profile Preview">
                  <button type="button" class="remove-image" @click="removeImage">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="upload-placeholder" v-else>
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload</span>
                </div>
              </div>
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
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="handleCancel">
              <i class="fas fa-times"></i> Cancel
            </button>
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="!isFormValid"
            >
              <i class="fas fa-user-plus"></i> Create Account
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

export default {
  name: "RegistrationView",
  components: {
    Logo
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        section: '',
        birthDate: '',
        profilePicture: null,
        password: '',
        confirmPassword: ''
      },
      showPassword: false
    };
  },
  computed: {
    passwordsMatch() {
      return this.formData.password === this.formData.confirmPassword;
    },
    isFormValid() {
      return (
        this.formData.firstName &&
        this.formData.lastName &&
        this.formData.section &&
        this.formData.birthDate &&
        this.formData.password &&
        this.formData.confirmPassword &&
        this.passwordsMatch
      );
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage() {
      this.formData.profilePicture = null;
      this.$refs.fileInput.value = '';
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    handleSubmit() {
      if (this.isFormValid) {
        console.log('Registration data:', this.formData);
        // Here you would typically send the data to your backend
        this.$router.push('/login');
      }
    },
    handleCancel() {
      this.formData = {
        firstName: '',
        lastName: '',
        section: '',
        birthDate: '',
        profilePicture: null,
        password: '',
        confirmPassword: ''
      };
      this.showPassword = false;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    }
  }
};
</script>

<style scoped>
.registration-container {
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

.registration-header h2 {
  color: #4a90e2;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Form Styles */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

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

input {
  width: 85%;
  padding: 12px;
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

/* File Upload Styles */
.file-upload {
  position: relative;
  width: 100%;
}

.file-upload input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-placeholder {
  border: 2px dashed rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #666;
  transition: all 0.3s ease;
}

.upload-placeholder:hover {
  border-color: #4a90e2;
  background: rgba(74, 144, 226, 0.05);
}

.upload-placeholder i {
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 10px;
}

.upload-preview {
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
}

.upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #e74c3c;
  transition: all 0.3s ease;
}

.remove-image:hover {
  background: #e74c3c;
  color: white;
}

/* Password Input Styles */
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

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 5px;
}

/* Form Actions */
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

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-btn:hover, .submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Dark Mode Styles */
:global(.dark-mode) .registration-container {
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

:global(.dark-mode) .registration-section {
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

:global(.dark-mode) input {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

:global(.dark-mode) input:focus {
  border-color: #7b61ff;
  box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .upload-placeholder {
  border-color: rgba(255, 255, 255, 0.1);
  color: #aaa;
}

:global(.dark-mode) .upload-placeholder:hover {
  border-color: #7b61ff;
  background: rgba(123, 97, 255, 0.05);
}

:global(.dark-mode) .remove-image {
  background: rgba(0, 0, 0, 0.7);
  color: #e74c3c;
}

:global(.dark-mode) .remove-image:hover {
  background: #e74c3c;
  color: white;
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

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn, .submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>