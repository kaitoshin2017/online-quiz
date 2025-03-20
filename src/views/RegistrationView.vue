<template>
  <div class="registration-container">
    <form @submit.prevent="handleSubmit" class="registration-form">
      <div class="form-header">
        <i class="fas fa-user-plus"></i>
        <h2>Sign Up</h2>
      </div>
      
      <div class="form-grid">
        <!-- Column 1 - Quote -->
        <div class="form-column quote-column">
          <div class="quote-section">
            <i class="fas fa-quote-left quote-icon"></i>
            <p class="quote-text">"It always seems impossible until it's done."</p>
            <p class="quote-author">- Nelson Mandela</p>
          </div>
        </div>

        <!-- Column 2 - Personal Information -->
        <div class="form-column">
          <div class="form-group">
            <label for="firstname">
              <i class="fas fa-user"></i>
              First Name
            </label>
            <input 
              type="text" 
              id="firstname" 
              v-model="formData.firstname" 
              placeholder="Enter your first name"
              required
            >
          </div>

          <div class="form-group">
            <label for="lastname">
              <i class="fas fa-user"></i>
              Last Name
            </label>
            <input 
              type="text" 
              id="lastname" 
              v-model="formData.lastname" 
              placeholder="Enter your last name"
              required
            >
          </div>

          <div class="form-group">
            <label for="section">
              <i class="fas fa-graduation-cap"></i>
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
            <label for="birthdate">
              <i class="fas fa-calendar-alt"></i>
              Birth Date
            </label>
            <input 
              type="date" 
              id="birthdate" 
              v-model="formData.birthdate" 
              required
            >
          </div>
        </div>

        <!-- Column 3 - Profile & Security -->
        <div class="form-column">
          <div class="form-group">
            <label for="profile">
              <i class="fas fa-camera"></i>
              Profile Picture
            </label>
            <div class="file-input-wrapper">
              <input 
                type="file" 
                id="profile" 
                @change="handleFileUpload" 
                accept="image/*"
                required
              >
              <div class="file-input-placeholder" v-if="!formData.profile">
                <i class="fas fa-cloud-upload-alt"></i>
                <span>Click to upload photo</span>
              </div>
              <div class="file-input-preview" v-else>
                <i class="fas fa-check-circle"></i>
                <span>{{ formData.profile.name }}</span>
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
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="formData.confirmPassword" 
                placeholder="Confirm your password"
                required
              >
              <i 
                :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                @click="toggleConfirmPassword"
                class="password-toggle"
              ></i>
            </div>
            <span class="error" v-if="passwordError">
              <i class="fas fa-exclamation-circle"></i>
              {{ passwordError }}
            </span>
          </div>
        </div>
      </div>

      <div class="button-group">
        <button type="button" class="cancel-button" @click="handleCancel">
          <i class="fas fa-times"></i>
          Cancel
        </button>
        <button type="submit" :disabled="!isFormValid">
          <i class="fas fa-user-plus"></i>
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  firstname: '',
  lastname: '',
  section: '',
  birthdate: '',
  profile: null,
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const passwordError = computed(() => {
  if (formData.value.password && formData.value.confirmPassword &&
      formData.value.password !== formData.value.confirmPassword) {
    return 'Passwords do not match'
  }
  return ''
})

const isFormValid = computed(() => {
  return formData.value.firstname &&
         formData.value.lastname &&
         formData.value.section &&
         formData.value.birthdate &&
         formData.value.profile &&
         formData.value.password &&
         formData.value.confirmPassword &&
         formData.value.password === formData.value.confirmPassword
})

const handleFileUpload = (event) => {
  formData.value.profile = event.target.files[0]
}

const handleSubmit = () => {
  if (isFormValid.value) {
    console.log('Form submitted:', formData.value)
    // Here you would typically send the data to your backend
  }
}

const handleCancel = () => {
  // Reset form data
  formData.value = {
    firstname: '',
    lastname: '',
    section: '',
    birthdate: '',
    profile: null,
    password: '',
    confirmPassword: ''
  }
  // Reset password visibility
  showPassword.value = false
  showConfirmPassword.value = false
}
</script>

<style scoped>
/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.registration-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 95vh;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  width: 100%;
  box-sizing: border-box;
}

.quote-section {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #212529;
  max-width: 600px;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.quote-icon {
  font-size: 1.75rem;
  color: #212529;
  margin-bottom: 0.75rem;
}

.quote-text {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-style: italic;
  margin: 0.5rem 0;
  line-height: 1.3;
  color: #343a40;
}

.quote-author {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  color: #495057;
  margin-top: 0.25rem;
}

.registration-form {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.full-width {
  grid-column: 1 / -1;
}

.form-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-header i {
  font-size: 2rem;
  color: #212529;
  margin-bottom: 0.75rem;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 0.25rem;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
}

.form-group {
  margin-bottom: 1rem;
  width: 100%;
}

label {
  display: flex;
  align-items: center;
  margin-bottom: 0.35rem;
  color: #666;
  font-weight: 500;
  font-size: clamp(0.8rem, 1.8vw, 0.95rem);
}

label i {
  margin-right: 0.5rem;
  color: #212529;
  width: 20px;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: clamp(0.85rem, 1.8vw, 0.95rem);
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #212529;
  box-shadow: 0 0 0 3px rgba(33, 37, 41, 0.1);
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
  color: #666;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #212529;
}

.file-input-wrapper {
  position: relative;
  width: 100%;
  min-height: 85px;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.file-input-wrapper:hover {
  border-color: #212529;
}

.file-input-wrapper input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.file-input-placeholder,
.file-input-preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
}

.file-input-placeholder i,
.file-input-preview i {
  font-size: 1.5rem;
  color: #212529;
  margin-bottom: 0.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.cancel-button {
  background: transparent;
  border: 2px solid #212529;
  color: #212529;
}

.cancel-button:hover {
  background: rgba(33, 37, 41, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 37, 41, 0.1);
}

.cancel-button:disabled {
  border-color: #cccccc;
  color: #cccccc;
  background: transparent;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

button {
  width: 100%;
  padding: clamp(0.6rem, 1.8vw, 0.8rem);
  background: linear-gradient(135deg, #212529 0%, #343a40 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: clamp(0.85rem, 1.8vw, 0.95rem);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

button:hover {
  background: linear-gradient(135deg, #343a40 0%, #212529 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 37, 41, 0.2);
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error {
  color: #ff3333;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Media Queries */
@media screen and (max-width: 900px) {
  .form-grid {
    gap: 1rem;
  }

  .registration-form {
    padding: 1.25rem;
    max-width: 700px;
  }

  .form-group {
    margin-bottom: 0.75rem;
  }
}

@media screen and (max-width: 600px) {
  .registration-container {
    padding: 10px;
  }

  .registration-form {
    padding: 1rem;
    max-width: 450px;
  }

  .form-grid {
    gap: 0.75rem;
  }

  .quote-section {
    padding: 0.75rem;
    margin-bottom: 1rem;
  }

  .form-header {
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 0.5rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .registration-container {
    background: linear-gradient(135deg, #212529 0%, #343a40 100%);
  }

  .registration-form {
    background-color: #1a1a1a;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }

  h2 {
    color: #f8f9fa;
  }

  label {
    color: #dee2e6;
  }

  input {
    background-color: #2d2d2d;
    border-color: #495057;
    color: #f8f9fa;
  }

  input:focus {
    border-color: #f8f9fa;
    box-shadow: 0 0 0 3px rgba(248, 249, 250, 0.2);
  }

  .file-input-wrapper {
    border-color: #495057;
  }

  .password-toggle {
    color: #dee2e6;
  }

  .file-input-placeholder,
  .file-input-preview {
    color: #dee2e6;
  }

  .quote-section {
    background: rgba(26, 26, 26, 0.95);
    color: #f8f9fa;
  }

  .quote-author {
    color: #dee2e6;
  }

  .quote-icon,
  .form-header i,
  label i,
  .file-input-placeholder i,
  .file-input-preview i {
    color: #f8f9fa;
  }

  .cancel-button {
    border-color: #dee2e6;
    color: #dee2e6;
  }

  .cancel-button:hover {
    background: rgba(222, 226, 230, 0.1);
  }

  .cancel-button:disabled {
    border-color: #495057;
    color: #495057;
  }
}
</style>