<template>
  <div class="student-panel">
    <div class="sidebar" :class="{ active: isSidebarOpen }">
      <div class="logo">
        <Logo />
      </div>
      <nav>
        <ul>
          <li @click="activeTab = 'dashboard'" :class="{ active: activeTab === 'dashboard' }">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </li>
          <li @click="activeTab = 'quizzes'" :class="{ active: activeTab === 'quizzes' }">
            <i class="fas fa-question-circle"></i>
            <span>My Quizzes</span>
          </li>
          <li @click="activeTab = 'results'" :class="{ active: activeTab === 'results' }">
            <i class="fas fa-chart-bar"></i>
            <span>My Results</span>
          </li>
          <li @click="activeTab = 'profile'" :class="{ active: activeTab === 'profile' }">
            <i class="fas fa-user"></i>
            <span>Profile</span>
          </li>
        </ul>
      </nav>
    </div>

    <button class="mobile-menu-btn" @click="toggleSidebar" aria-label="Toggle Menu">
      <i class="fas fa-bars"></i>
    </button>

    <div class="main-content">
      <div class="header">
        <div class="header-left">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search..." v-model="searchQuery">
          </div>
          <div class="notifications">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">2</span>
          </div>
        </div>
        <div class="user-profile">
          <div class="user-info">
            <span class="welcome-text">Welcome back,</span>
            <span class="user-name">{{ studentName }}</span>
          </div>
          <div class="avatar-container">
            <img :src="studentAvatar" alt="Student Avatar" class="avatar">
            <div class="status-indicator"></div>
          </div>
        </div>
      </div>

      <div class="content">
        <!-- Dashboard Tab -->
        <div v-if="activeTab === 'dashboard'" class="dashboard">
          <div class="page-header">
            <h2>Dashboard Overview</h2>
          </div>
          <div class="stats-grid">
            <div class="stat-card gradient-card">
              <div class="stat-icon gradient-bg">
                <i class="fas fa-question-circle"></i>
              </div>
              <div class="stat-info">
                <h3>Total Quizzes</h3>
                <p>{{ availableQuizzes.length }}</p>
              </div>
            </div>
            <div class="stat-card gradient-card">
              <div class="stat-icon gradient-bg">
                <i class="fas fa-chart-bar"></i>
              </div>
              <div class="stat-info">
                <h3>Completed Quizzes</h3>
                <p>{{ quizResults.length }}</p>
              </div>
            </div>
            <div class="stat-card gradient-card">
              <div class="stat-icon gradient-bg">
                <i class="fas fa-star"></i>
              </div>
              <div class="stat-info">
                <h3>Average Score</h3>
                <p>{{ averageScore }}%</p>
              </div>
            </div>
          </div>
          <div class="dashboard-chart">
            <BarChart :data="chartData" :options="chartOptions" style="max-width: 600px; margin: 0 auto;" />
          </div>
        </div>

        <!-- Quizzes Tab -->
        <section v-if="activeTab === 'quizzes'" id="available-quizzes">
          <h2><i class="fas fa-list-alt"></i> Available Quizzes</h2>
          <div class="quizzes-grid">
            <div v-for="quiz in availableQuizzes" :key="quiz.id" class="quiz-card">
              <div class="quiz-header">
                <h3>{{ quiz.title }}</h3>
                <span class="quiz-status" :class="quiz.status">{{ quiz.status }}</span>
              </div>
              <div class="quiz-details">
                <p><i class="fas fa-clock"></i> Duration: {{ quiz.duration }} minutes</p>
                <p><i class="fas fa-question-circle"></i> Questions: {{ quiz.questions }}</p>
                <p><i class="fas fa-star"></i> Points: {{ quiz.points }}</p>
              </div>
              <p class="quiz-description">{{ quiz.description }}</p>
              <button class="start-quiz-btn" @click="startQuiz(quiz)" :disabled="quiz.status !== 'Available'">
                <i class="fas fa-play"></i> Start Quiz
              </button>
            </div>
          </div>
        </section>

        <!-- Results Tab -->
        <section v-if="activeTab === 'results'" id="results" class="results-section">
          <h2><i class="fas fa-chart-bar"></i> My Results</h2>
          <div class="results-grid">
            <div v-for="result in quizResults" :key="result.id" class="result-card">
              <div class="result-header">
                <h3>{{ result.title }}</h3>
                <span class="result-date">{{ result.date }}</span>
              </div>
              <div class="score-circle">
                <div class="score">{{ result.score }}%</div>
                <div class="score-label">Score</div>
              </div>
              <div class="result-stats">
                <div class="stat">
                  <i class="fas fa-check-circle"></i>
                  <span>Correct: {{ result.correctAnswers }}</span>
                </div>
                <div class="stat">
                  <i class="fas fa-times-circle"></i>
                  <span>Wrong: {{ result.wrongAnswers }}</span>
                </div>
                <div class="stat">
                  <i class="fas fa-clock"></i>
                  <span>Time: {{ result.timeTaken }} min</span>
                </div>
              </div>
              <button class="review-btn" @click="reviewQuiz(result.id)">
                <i class="fas fa-search"></i> Review Quiz
              </button>
            </div>
          </div>
        </section>

        <!-- Profile Tab -->
        <section v-if="activeTab === 'profile'" id="profile" class="profile-section">
          <h2><i class="fas fa-user"></i> My Profile</h2>
          <div v-if="loading" class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i> Loading...
          </div>
          <div v-else-if="error" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ error }}
          </div>
          <div v-else class="profile-container">
            <div class="profile-header">
              <div class="profile-avatar">
                <img :src="studentAvatar" alt="Profile Picture">
                <input 
                  type="file" 
                  accept="image/*" 
                  @change="handleAvatarChange"
                  class="avatar-input"
                  v-if="editMode"
                >
                <button 
                  class="change-avatar-btn"
                  @click="editMode = true"
                  v-if="!editMode"
                >
                  <i class="fas fa-camera"></i>
                </button>
                <div v-if="avatarUploadMessage" class="success-message">{{ avatarUploadMessage }}</div>
              </div>
              <div class="profile-info">
                <template v-if="!editMode">
                  <h3>{{ studentName }}</h3>
                  <p class="student-id">Student ID: {{ studentId }}</p>
                  <p class="student-email">{{ studentEmail }}</p>
                  <p v-if="studentData?.profile?.phone" class="student-phone">
                    <i class="fas fa-phone"></i> {{ studentData.profile.phone }}
                  </p>
                  <p v-if="studentData?.profile?.address" class="student-address">
                    <i class="fas fa-map-marker-alt"></i> {{ studentData.profile.address }}
                  </p>
                  <p v-if="studentData?.profile?.bio" class="student-bio">
                    {{ studentData.profile.bio }}
                  </p>
                </template>
                <form v-else @submit.prevent="updateProfile" class="profile-form">
                  <div class="form-group">
                    <label>First Name</label>
                    <input v-model="profileForm.firstName" type="text" required>
                  </div>
                  <div class="form-group">
                    <label>Last Name</label>
                    <input v-model="profileForm.lastName" type="text" required>
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input v-model="profileForm.email" type="email" required>
                  </div>
                  <div class="form-group">
                    <label>Phone</label>
                    <input v-model="profileForm.phone" type="tel">
                  </div>
                  <div class="form-group">
                    <label>Address</label>
                    <input v-model="profileForm.address" type="text">
                  </div>
                  <div class="form-group">
                    <label>Bio</label>
                    <textarea v-model="profileForm.bio" rows="3"></textarea>
                  </div>
                  <div class="form-actions">
                    <button type="submit" class="save-btn" :disabled="loading">
                      <i class="fas fa-save"></i> Save Changes
                    </button>
                    <button type="button" class="cancel-btn" @click="editMode = false">
                      <i class="fas fa-times"></i> Cancel
                    </button>
                  </div>
                </form>
                <div v-if="editMode" class="change-password-form">
                  <h4>Change Password</h4>
                  <input v-model="passwordForm.currentPassword" type="password" placeholder="Current Password">
                  <input v-model="passwordForm.newPassword" type="password" placeholder="New Password">
                  <button type="button" @click="changePassword" class="save-btn">Change Password</button>
                  <div v-if="passwordChangeMessage" class="success-message">{{ passwordChangeMessage }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import studentService from '../services/studentService';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Bar } from 'vue-chartjs';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  name: "StudentPanel",
  components: {
    Logo,
    BarChart: Bar
  },
  setup() {
    const router = useRouter();
    const isSidebarOpen = ref(false);
    const activeTab = ref('quizzes');
    const searchQuery = ref('');
    const studentData = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const editMode = ref(false);
    const currentPath = ref(router.currentRoute.value.path);
    const availableQuizzes = ref([]);
    const activeQuiz = ref(null);
    const quizResult = ref(null);
    const quizResults = ref([]);
    const remainingTime = ref(0);
    const currentQuestion = ref(0);
    const selectedAnswer = ref(null);

    const profileForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      bio: '',
      avatar: ''
    });

    // Add change password form state
    const passwordForm = ref({
      currentPassword: '',
      newPassword: ''
    });
    const passwordChangeMessage = ref('');

    // Add avatar upload state
    const avatarUploadMessage = ref('');

    // Computed properties
    const studentName = computed(() => {
      if (!studentData.value) return '';
      return `${studentData.value.firstName} ${studentData.value.lastName}`;
    });

    const studentAvatar = computed(() => {
      return studentData.value?.avatar || '/default-avatar.png';
    });

    const studentEmail = computed(() => {
      return studentData.value?.email || '';
    });

    const studentId = computed(() => {
      return studentData.value?._id || '';
    });

    const totalQuizzesTaken = computed(() => {
      return studentData.value?.statistics?.totalQuizzes || 0;
    });

    const averageScore = computed(() => {
      return studentData.value?.statistics?.averageScore || 0;
    });

    const totalPoints = computed(() => {
      return studentData.value?.statistics?.totalPoints || 0;
    });

    // Chart Data
    const chartData = computed(() => {
      const lastResults = quizResults.value.slice(-5);
      return {
        labels: lastResults.map(r => r.title),
        datasets: [
          {
            label: 'Quiz Score',
            backgroundColor: 'rgba(74, 144, 226, 0.7)',
            borderColor: '#4a90e2',
            borderWidth: 2,
            borderRadius: 8,
            data: lastResults.map(r => r.score)
          }
        ]
      };
    });
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Last 5 Quiz Scores',
          color: '#4a90e2',
          font: { size: 18, weight: 'bold' }
        },
        tooltip: {
          backgroundColor: '#4a90e2',
          titleColor: '#fff',
          bodyColor: '#fff',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { color: '#64748b', font: { weight: 'bold' } },
          grid: { color: 'rgba(74,144,226,0.1)' }
        },
        x: {
          ticks: { color: '#64748b', font: { weight: 'bold' } },
          grid: { color: 'rgba(74,144,226,0.05)' }
        }
      }
    };

    // Methods
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const navigateToHome = () => {
      router.push('/');
    };

    const fetchStudentData = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await studentService.getDashboardData();
        if (response?.success && response?.data) {
          studentData.value = response.data;
          // Initialize profile form with current data
          profileForm.value = {
            firstName: studentData.value.profile?.firstName || '',
            lastName: studentData.value.profile?.lastName || '',
            email: studentData.value.profile?.email || '',
            phone: studentData.value.profile?.phone || '',
            address: studentData.value.profile?.address || '',
            bio: studentData.value.profile?.bio || '',
            avatar: studentData.value.profile?.avatar || ''
          };
        } else {
          throw new Error('Invalid response format from server');
        }
      } catch (err) {
        error.value = err.message || 'Failed to fetch student data';
        console.error('Error fetching student data:', err);
      } finally {
        loading.value = false;
      }
    };

    const fetchQuizzes = async () => {
      try {
        const response = await studentService.getAvailableQuizzes();
        if (response?.success) {
          availableQuizzes.value = response.data || [];
        }
      } catch (err) {
        console.error('Error fetching quizzes:', err);
        availableQuizzes.value = [];
      }
    };

    const fetchResults = async () => {
      try {
        const response = await studentService.getQuizResults();
        if (response?.success) {
          quizResults.value = response.data || [];
        }
      } catch (err) {
        console.error('Error fetching results:', err);
        quizResults.value = [];
      }
    };

    const updateProfile = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await studentService.updateProfile(profileForm.value);
        if (response.success) {
          studentData.value = {
            ...studentData.value,
            profile: response.data
          };
          editMode.value = false;
        }
      } catch (err) {
        error.value = err.message;
        console.error('Error updating profile:', err);
      } finally {
        loading.value = false;
      }
    };

    const handleAvatarChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        // Simulate upload and get base64 URL (in real app, upload to server and get URL)
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const response = await studentService.updateAvatar(e.target.result);
            if (response.success) {
              profileForm.value.avatar = response.avatar;
              avatarUploadMessage.value = 'Avatar updated!';
              setTimeout(() => (avatarUploadMessage.value = ''), 2000);
            }
          } catch (err) {
            avatarUploadMessage.value = err.message || 'Failed to update avatar';
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const changePassword = async () => {
      passwordChangeMessage.value = '';
      try {
        const response = await studentService.changePassword(passwordForm.value);
        if (response.success) {
          passwordChangeMessage.value = 'Password updated successfully!';
          passwordForm.value.currentPassword = '';
          passwordForm.value.newPassword = '';
        }
      } catch (err) {
        passwordChangeMessage.value = err.message || 'Failed to change password';
      }
    };

    const startQuiz = (quiz) => {
      activeQuiz.value = quiz;
      remainingTime.value = quiz.duration * 60; // Convert minutes to seconds
      currentQuestion.value = 0;
      selectedAnswer.value = null;
    };

    const selectAnswer = (index) => {
      selectedAnswer.value = index;
    };

    const nextQuestion = () => {
      if (currentQuestion.value < activeQuiz.value.questions.length - 1) {
        currentQuestion.value++;
        selectedAnswer.value = null;
      }
    };

    const previousQuestion = () => {
      if (currentQuestion.value > 0) {
        currentQuestion.value--;
        selectedAnswer.value = null;
      }
    };

    const submitQuiz = async () => {
      try {
        const response = await studentService.submitQuiz({
          quizId: activeQuiz.value._id,
          answers: activeQuiz.value.questions.map((q, index) => ({
            questionId: q._id,
            selectedAnswer: selectedAnswer.value
          }))
        });
        if (response.success) {
          quizResult.value = response.data;
          activeQuiz.value = null;
          fetchResults(); // Refresh results list
        }
      } catch (err) {
        console.error('Error submitting quiz:', err);
      }
    };

    const reviewQuiz = (resultId) => {
      const result = quizResults.value.find(r => r._id === resultId);
      if (result) {
        quizResult.value = result;
      }
    };

    const reviewAnswers = () => {
      quizResult.value = null;
    };

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Lifecycle hooks
    onMounted(() => {
      fetchStudentData();
      fetchQuizzes();
      fetchResults();
    });

    return {
      isSidebarOpen,
      activeTab,
      searchQuery,
      studentData,
      loading,
      error,
      editMode,
      profileForm,
      studentName,
      studentAvatar,
      studentEmail,
      studentId,
      totalQuizzesTaken,
      averageScore,
      totalPoints,
      currentPath,
      availableQuizzes,
      activeQuiz,
      quizResult,
      quizResults,
      remainingTime,
      currentQuestion,
      selectedAnswer,
      toggleSidebar,
      navigateToHome,
      updateProfile,
      handleAvatarChange,
      startQuiz,
      selectAnswer,
      nextQuestion,
      previousQuestion,
      submitQuiz,
      reviewQuiz,
      reviewAnswers,
      formatTime,
      chartData,
      chartOptions,
      passwordForm,
      passwordChangeMessage,
      changePassword,
      avatarUploadMessage
    };
  }
};
</script>

<style scoped>
.student-panel {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%);
  position: relative;
}

.sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: fixed;
  height: 100vh;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}

.sidebar.active {
  left: 0;
  transform: translateX(0);
}

.logo {
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

nav li {
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #64748b;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

nav li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #4a90e2, #7b61ff);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

nav li:hover {
  background: linear-gradient(145deg, #f1f5f9, #ffffff);
  color: #0f172a;
  transform: translateX(5px);
}

nav li:hover::before {
  transform: scaleY(1);
}

nav li.active {
  background: linear-gradient(145deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

nav li.active::before {
  transform: scaleY(1);
  background: white;
}

nav li i {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
  transition: transform 0.3s ease;
}

nav li:hover i {
  transform: scale(1.1);
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
}

/* Mobile menu button */
.mobile-menu-btn {
  display: none;
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  color: white;
  border: none;
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
  z-index: 1001;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-btn:hover {
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 12px 30px rgba(74, 144, 226, 0.4);
}

/* Responsive styles */
@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
    padding: 1.5rem 0.5rem;
  }

  .main-content {
    margin-left: 80px;
  }

  nav li span {
    display: none;
  }

  nav li {
    justify-content: center;
    padding: 12px;
  }

  nav li i {
    margin: 0;
    font-size: 1.4rem;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -280px;
    width: 280px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
  }

  .sidebar.active {
    left: 0;
  }

  .sidebar nav li span {
    display: inline-block;
  }

  .sidebar nav li {
    padding: 1rem;
    justify-content: flex-start;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .header {
    padding: 1rem;
  }

  .search-bar {
    width: 100%;
  }

  .user-profile {
    display: none;
  }
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .student-panel {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%);
  }

  .sidebar {
    background: rgba(30, 30, 30, 0.95);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
  }

  nav li:hover {
    background: linear-gradient(145deg, #2d3748, #1a202c);
  }

  .header {
    background: rgba(30, 30, 30, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .search-bar {
    background: rgba(30, 30, 30, 0.8);
  }

  .search-bar:focus-within {
    background: rgba(40, 40, 40, 0.95);
  }

  .quiz-card,
  .active-quiz {
    background: rgba(30, 30, 30, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .option {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .option:hover {
    border-color: #7b61ff;
  }

  .option.selected {
    background: rgba(123, 97, 255, 0.1);
    border-color: #7b61ff;
  }

  .question-container h3 {
    color: #fff;
  }

  .nav-btn {
    background: rgba(123, 97, 255, 0.1);
    color: #7b61ff;
  }

  .stat {
    color: #aaa;
  }
}

/* Update header styles */
.header {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.search-bar {
  background: rgba(241, 245, 249, 0.8);
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.search-bar i {
  color: #64748b;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.search-bar:focus-within {
  background: white;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.2);
  border-color: rgba(74, 144, 226, 0.3);
}

.search-bar:focus-within i {
  color: #4a90e2;
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 0.95rem;
  color: #1e293b;
}

.search-bar input::placeholder {
  color: #94a3b8;
}

.notifications {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(241, 245, 249, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.notifications:hover {
  background: rgba(74, 144, 226, 0.1);
  transform: scale(1.05);
}

.notifications i {
  font-size: 1.2rem;
  color: #64748b;
  transition: color 0.3s ease;
}

.notifications:hover i {
  color: #4a90e2;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(239, 68, 68, 0.3);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: rgba(241, 245, 249, 0.8);
  transition: all 0.3s ease;
  cursor: pointer;
}

.user-profile:hover {
  background: rgba(74, 144, 226, 0.1);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.welcome-text {
  font-size: 0.8rem;
  color: #64748b;
}

.user-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
}

.avatar-container {
  position: relative;
  width: 40px;
  height: 40px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.avatar-container:hover .avatar {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(74, 144, 226, 0.3);
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2ecc71;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(46, 204, 113, 0.3);
}

/* Dark mode styles for header */
:global(.dark-mode) .header {
  background: rgba(30, 30, 30, 0.98);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

:global(.dark-mode) .search-bar {
  background: rgba(30, 30, 30, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .search-bar:focus-within {
  background: rgba(40, 40, 40, 0.95);
  border-color: rgba(123, 97, 255, 0.3);
}

:global(.dark-mode) .search-bar i {
  color: #94a3b8;
}

:global(.dark-mode) .search-bar:focus-within i {
  color: #7b61ff;
}

:global(.dark-mode) .search-bar input {
  color: #fff;
}

:global(.dark-mode) .search-bar input::placeholder {
  color: #64748b;
}

:global(.dark-mode) .notifications {
  background: rgba(30, 30, 30, 0.8);
}

:global(.dark-mode) .notifications:hover {
  background: rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .notifications i {
  color: #94a3b8;
}

:global(.dark-mode) .notifications:hover i {
  color: #7b61ff;
}

:global(.dark-mode) .user-profile {
  background: rgba(30, 30, 30, 0.8);
}

:global(.dark-mode) .user-profile:hover {
  background: rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .welcome-text {
  color: #94a3b8;
}

:global(.dark-mode) .user-name {
  color: #fff;
}

/* Responsive styles for header */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .search-bar {
    min-width: auto;
    flex: 1;
  }

  .user-profile {
    display: none;
  }

  .notifications {
    margin-left: auto;
  }
}

/* Main Content Styles */
main {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

section {
  margin-bottom: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Quizzes Grid */
.quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.quiz-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.quiz-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(123, 97, 255, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.quiz-card:hover::before {
  opacity: 1;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.quiz-header h3 {
  margin: 0;
  color: #4a90e2;
  font-size: 1.3rem;
}

.quiz-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.quiz-status.Available {
  background: rgba(46, 204, 113, 0.15);
  color: #2ecc71;
}

.quiz-status.Completed {
  background: rgba(74, 144, 226, 0.15);
  color: #4a90e2;
}

.quiz-details {
  margin: 15px 0;
}

.quiz-details p {
  margin: 8px 0;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

.quiz-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.start-quiz-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.start-quiz-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.start-quiz-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
}

.start-quiz-btn:hover::after {
  transform: translateX(0);
}

.start-quiz-btn:disabled {
  background: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Active Quiz Styles */
.active-quiz {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.timer {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ef4444;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 8px 16px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.timer:hover {
  transform: scale(1.05);
}

.quiz-progress {
  margin: 20px 0;
}

.progress-bar {
  height: 8px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  transition: width 0.3s ease;
}

.question-container {
  margin: 30px 0;
}

.question-container h3 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.options {
  display: grid;
  gap: 15px;
}

.option {
  padding: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.option:hover {
  border-color: #4a90e2;
  transform: translateX(5px);
}

.option:hover::before {
  opacity: 1;
}

.option.selected {
  background: rgba(74, 144, 226, 0.1);
  border-color: #4a90e2;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.2);
}

.quiz-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.nav-btn, .submit-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.nav-btn {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.submit-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
}

.nav-btn:hover, .submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Quiz Results Styles */
.quiz-results {
  text-align: center;
}

.result-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin: 30px 0;
}

.score-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.score {
  font-size: 3rem;
  font-weight: 700;
}

.score-label {
  font-size: 1rem;
  opacity: 0.9;
}

.result-details {
  text-align: left;
}

.result-details h3 {
  color: #4a90e2;
  margin-bottom: 20px;
}

.stats {
  display: grid;
  gap: 15px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
}

.stat i {
  color: #4a90e2;
}

.review-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.review-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Results Section Styles */
.results-section {
  padding: 30px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.result-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.result-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-header h3 {
  margin: 0;
  color: #4a90e2;
  font-size: 1.3rem;
}

.result-date {
  color: #666;
  font-size: 0.9rem;
}

.result-stats {
  display: grid;
  gap: 10px;
}

/* Profile Section Styles */
.profile-section {
  padding: 30px;
}

.profile-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
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
  border: 4px solid #4a90e2;
}

.change-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4a90e2;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.change-avatar-btn:hover {
  transform: scale(1.1);
}

.profile-info {
  flex: 1;
}

.profile-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  color: #333;
}

.student-id, .student-email {
  margin: 5px 0;
  color: #666;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  margin: 30px 0;
}

.stat-card {
  background: rgba(74, 144, 226, 0.1);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
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
  font-weight: 600;
  color: #333;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.profile-actions {
  display: flex;
    gap: 15px;
  margin-top: 30px;
}

.edit-profile-btn,
.change-password-btn {
  padding: 12px 25px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.edit-profile-btn {
  background: #4a90e2;
  color: white;
}

.change-password-btn {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.edit-profile-btn:hover,
.change-password-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Dark Mode Styles for Results and Profile */
:global(.dark-mode) .result-card,
:global(.dark-mode) .profile-container {
  background: rgba(40, 40, 40, 0.9);
}

:global(.dark-mode) .result-header h3,
:global(.dark-mode) .profile-info h3 {
  color: #7b61ff;
}

:global(.dark-mode) .result-date,
:global(.dark-mode) .student-id,
:global(.dark-mode) .student-email,
:global(.dark-mode) .stat-label {
  color: #aaa;
}

:global(.dark-mode) .stat-card {
  background: rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .stat-card i {
  color: #7b61ff;
}

:global(.dark-mode) .stat-value {
  color: #fff;
}

:global(.dark-mode) .edit-profile-btn {
  background: #7b61ff;
}

:global(.dark-mode) .change-password-btn {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

/* Responsive Design for Results and Profile */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-stats {
    grid-template-columns: 1fr;
  }

  .profile-actions {
    flex-direction: column;
  }

  .edit-profile-btn,
  .change-password-btn {
    width: 100%;
    justify-content: center;
  }
}

.profile-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.save-btn,
.cancel-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  border: none;
}

.avatar-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.loading-spinner,
.error-message {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error-message {
  color: #f44336;
}

/* Add/modify styles for gradient cards and chart */
.gradient-card {
  background: linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 100%);
  box-shadow: 0 4px 24px rgba(74, 144, 226, 0.08);
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s;
  animation: fadeInUp 0.7s;
}
.gradient-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 32px rgba(74, 144, 226, 0.15);
}
.gradient-bg {
  background: linear-gradient(135deg, #4a90e2 0%, #7b61ff 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.15);
}
.dashboard-chart {
  margin-top: 2.5rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(74, 144, 226, 0.07);
  padding: 2rem 1rem 1rem 1rem;
  animation: fadeIn 1s;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
