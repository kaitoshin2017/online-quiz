<template>
  <div class="profile-container">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <h1>EvoQuiz</h1>
        </div>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/student">My Quizzes</router-link></li>
          <li><router-link to="/results">My Results</router-link></li>
          <li><router-link to="/profile" class="active">Profile</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section class="profile-section">
        <div class="profile-header">
          <div class="profile-avatar">
            <img :src="userProfile.avatar" alt="Profile Avatar">
            <button class="change-avatar-btn">
              <i class="fas fa-camera"></i>
            </button>
          </div>
          <div class="profile-info">
            <h2>{{ userProfile.name }}</h2>
            <p class="role">{{ userProfile.role }}</p>
          </div>
        </div>

        <!-- Profile Stats -->
        <div class="profile-stats">
          <div class="stat-card">
            <i class="fas fa-trophy"></i>
            <div class="stat-info">
              <span class="stat-value">{{ userProfile.quizzesCompleted }}</span>
              <span class="stat-label">Quizzes Completed</span>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-star"></i>
            <div class="stat-info">
              <span class="stat-value">{{ userProfile.averageScore }}%</span>
              <span class="stat-label">Average Score</span>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-clock"></i>
            <div class="stat-info">
              <span class="stat-value">{{ userProfile.timeSpent }}h</span>
              <span class="stat-label">Time Spent</span>
            </div>
          </div>
        </div>

        <!-- Profile Form -->
        <form @submit.prevent="updateProfile" class="profile-form">
          <h3>Profile Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" v-model="userProfile.name" placeholder="Your full name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="userProfile.email" placeholder="Your email">
            </div>
            <div class="form-group">
              <label>Username</label>
              <input type="text" v-model="userProfile.username" placeholder="Your username">
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" v-model="userProfile.phone" placeholder="Your phone number">
            </div>
          </div>

          <h3>Change Password</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Current Password</label>
              <input type="password" v-model="password.current" placeholder="Enter current password">
            </div>
            <div class="form-group">
              <label>New Password</label>
              <input type="password" v-model="password.new" placeholder="Enter new password">
            </div>
            <div class="form-group">
              <label>Confirm New Password</label>
              <input type="password" v-model="password.confirm" placeholder="Confirm new password">
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="save-btn">
              <i class="fas fa-save"></i> Save Changes
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
export default {
  name: "ProfileView",
  data() {
    return {
      userProfile: {
        name: "John Doe",
        role: "Student",
        avatar: "https://via.placeholder.com/150",
        quizzesCompleted: 12,
        averageScore: 85,
        timeSpent: 24,
        email: "john.doe@example.com",
        username: "johndoe",
        phone: "+1 234 567 8900"
      },
      password: {
        current: "",
        new: "",
        confirm: ""
      }
    };
  },
  methods: {
    updateProfile() {
      // Implement profile update logic
      console.log("Updating profile:", this.userProfile);
      console.log("Password change:", this.password);
    }
  }
};
</script>

<style scoped>
.profile-container {
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

.profile-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Profile Header */
.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
}

.profile-avatar {
  position: relative;
  width: 150px;
  height: 150px;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(74, 144, 226, 0.2);
}

.change-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #4a90e2;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.change-avatar-btn:hover {
  background: #7b61ff;
  transform: scale(1.1);
}

.profile-info h2 {
  margin: 0;
  color: #4a90e2;
  font-size: 2rem;
}

.profile-info .role {
  color: #666;
  margin: 5px 0 0 0;
}

/* Profile Stats */
.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-card i {
  font-size: 2rem;
  color: #4a90e2;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* Profile Form */
.profile-form {
  margin-top: 40px;
}

.profile-form h3 {
  color: #4a90e2;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #666;
  font-size: 0.9rem;
}

.form-group input {
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.save-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Dark Mode Styles */
:global(.dark-mode) .profile-container {
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

:global(.dark-mode) .profile-section {
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .profile-info h2 {
  color: #7b61ff;
}

:global(.dark-mode) .profile-info .role {
  color: #aaa;
}

:global(.dark-mode) .stat-card {
  background: rgba(40, 40, 40, 0.9);
}

:global(.dark-mode) .stat-value {
  color: #fff;
}

:global(.dark-mode) .stat-label {
  color: #aaa;
}

:global(.dark-mode) .form-group label {
  color: #aaa;
}

:global(.dark-mode) .form-group input {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

:global(.dark-mode) .form-group input:focus {
  border-color: #7b61ff;
  box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.1);
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

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .profile-stats {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    justify-content: center;
  }

  .save-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 