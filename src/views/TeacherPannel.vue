<template>
  <div class="teacher-panel">
    <div class="sidebar">
      <div class="logo">
        <Logo />
      </div>
      <nav>
        <ul>
          <li @click="activeTab = 'dashboard'" :class="{ active: activeTab === 'dashboard' }">
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
          </li>
          <li @click="activeTab = 'quizzes'" :class="{ active: activeTab === 'quizzes' }">
            <i class="fas fa-question-circle"></i>
            <span>Quizzes</span>
          </li>
          <li @click="activeTab = 'students'" :class="{ active: activeTab === 'students' }">
            <i class="fas fa-users"></i>
            <span>Students</span>
          </li>
          <li @click="activeTab = 'results'" :class="{ active: activeTab === 'results' }">
            <i class="fas fa-chart-bar"></i>
            <span>Results</span>
          </li>
          <li @click="activeTab = 'settings'" :class="{ active: activeTab === 'settings' }">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </div>

    <div class="main-content">
      <div class="header">
        <div class="header-left">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search..." v-model="searchQuery">
          </div>
          <div class="notifications">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">3</span>
          </div>
        </div>
        <div class="user-profile">
          <div class="user-info">
            <span class="welcome-text">Welcome back,</span>
            <span class="user-name">{{ teacherName }}</span>
          </div>
          <div class="avatar-container">
            <img :src="teacherAvatar" alt="Teacher Avatar" class="avatar">
            <div class="status-indicator"></div>
          </div>
        </div>
      </div>

      <div class="content">
        <!-- Dashboard Tab -->
        <div v-if="activeTab === 'dashboard'" class="dashboard">
          <div class="page-header">
            <h2>Dashboard Overview</h2>
            <div class="date-range">
              <button class="date-btn active">Today</button>
              <button class="date-btn">Week</button>
              <button class="date-btn">Month</button>
              <button class="date-btn">Year</button>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-question-circle"></i>
              </div>
              <div class="stat-info">
                <h3>Total Quizzes</h3>
                <p>{{ totalQuizzes }}</p>
                <span class="trend positive">+12% from last month</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-info">
                <h3>Active Students</h3>
                <p>{{ activeStudents }}</p>
                <span class="trend positive">+5% from last month</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="stat-info">
                <h3>Average Score</h3>
                <p>{{ averageScore }}%</p>
                <span class="trend positive">+3% from last month</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="stat-info">
                <h3>Pending Reviews</h3>
                <p>{{ pendingReviews }}</p>
                <span class="trend negative">-2% from last month</span>
              </div>
            </div>
          </div>

          <div class="dashboard-grid">
            <div class="recent-activity">
              <div class="section-header">
                <h3>Recent Activity</h3>
                <button class="view-all">View All</button>
              </div>
              <div class="activity-list">
                <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                  <div class="activity-icon" :class="activity.type">
                    <i :class="getActivityIcon(activity.type)"></i>
                  </div>
                  <div class="activity-details">
                    <p>{{ activity.description }}</p>
                    <small>{{ activity.time }}</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="quick-actions">
              <div class="section-header">
                <h3>Quick Actions</h3>
                <button class="view-all">More</button>
              </div>
              <div class="actions-grid">
                <button class="action-btn" @click="createNewQuiz">
                  <i class="fas fa-plus"></i>
                  <span>Create Quiz</span>
                </button>
                <button class="action-btn">
                  <i class="fas fa-user-plus"></i>
                  <span>Add Student</span>
                </button>
                <button class="action-btn">
                  <i class="fas fa-file-export"></i>
                  <span>Export Results</span>
                </button>
                <button class="action-btn">
                  <i class="fas fa-cog"></i>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quizzes Tab -->
        <div v-if="activeTab === 'quizzes'" class="quizzes">
          <div class="quizzes-header">
            <h2>Manage Quizzes</h2>
            <button class="create-quiz-btn" @click="createNewQuiz">
              <i class="fas fa-plus"></i> Create New Quiz
            </button>
          </div>
          <div class="quizzes-grid">
            <div v-for="quiz in quizzes" :key="quiz.id" class="quiz-card">
              <h3>{{ quiz.title }}</h3>
              <p>{{ quiz.description }}</p>
              <div class="quiz-stats">
                <span><i class="fas fa-users"></i> {{ quiz.participants }}</span>
                <span><i class="fas fa-clock"></i> {{ quiz.duration }}min</span>
              </div>
              <div class="quiz-actions">
                <button @click="editQuiz(quiz)">Edit</button>
                <button @click="deleteQuiz(quiz)">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Students Tab -->
        <div v-if="activeTab === 'students'" class="students">
          <h2>Student Management</h2>
          <div class="students-list">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Quizzes Taken</th>
                  <th>Average Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student.id">
                  <td>{{ student.name }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.quizzesTaken }}</td>
                  <td>{{ student.averageScore }}%</td>
                  <td>
                    <span :class="['status', student.status]">{{ student.status }}</span>
                  </td>
                  <td>
                    <button @click="viewStudentDetails(student)">View</button>
                    <button @click="editStudent(student)">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Results Tab -->
        <div v-if="activeTab === 'results'" class="results">
          <h2>Quiz Results</h2>
          <div class="results-filters">
            <select v-model="selectedQuiz">
              <option value="">Select Quiz</option>
              <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
                {{ quiz.title }}
              </option>
            </select>
            <select v-model="timeRange">
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
          <div class="results-chart">
            <!-- Chart component will be added here -->
          </div>
          <div class="results-table">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Score</th>
                  <th>Time Taken</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="result in quizResults" :key="result.id">
                  <td>{{ result.studentName }}</td>
                  <td>{{ result.score }}%</td>
                  <td>{{ result.timeTaken }}min</td>
                  <td>{{ result.date }}</td>
                  <td>
                    <span :class="['status', result.status]">{{ result.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'

export default {
  name: 'TeacherPanel',
  components: {
    Logo
  },
  data() {
    return {
      activeTab: 'dashboard',
      searchQuery: '',
      teacherName: 'IGNA',
      teacherAvatar: 'https://via.placeholder.com/40',
      totalQuizzes: 12,
      activeStudents: 45,
      averageScore: 85,
      pendingReviews: 3,
      recentActivities: [
        {
          id: 1,
          type: 'quiz',
          description: 'New quiz submission from Sarah',
          time: '5 minutes ago'
        },
        {
          id: 2,
          type: 'student',
          description: 'New student registration',
          time: '1 hour ago'
        },
        {
          id: 3,
          type: 'result',
          description: 'Quiz results updated',
          time: '2 hours ago'
        }
      ],
      quizzes: [
        {
          id: 1,
          title: 'Mathematics Basics',
          description: 'Basic arithmetic and algebra',
          participants: 30,
          duration: 45
        },
        {
          id: 2,
          title: 'Science Quiz',
          description: 'Physics and Chemistry fundamentals',
          participants: 25,
          duration: 60
        }
      ],
      students: [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          quizzesTaken: 5,
          averageScore: 92,
          status: 'active'
        },
        {
          id: 2,
          name: 'Mike Wilson',
          email: 'mike@example.com',
          quizzesTaken: 3,
          averageScore: 78,
          status: 'inactive'
        }
      ],
      selectedQuiz: '',
      timeRange: 'all',
      quizResults: [
        {
          id: 1,
          studentName: 'Sarah Johnson',
          score: 95,
          timeTaken: 35,
          date: '2024-03-15',
          status: 'completed'
        }
      ]
    }
  },
  methods: {
    getActivityIcon(type) {
      const icons = {
        quiz: 'fas fa-question-circle',
        student: 'fas fa-user',
        result: 'fas fa-chart-bar'
      }
      return icons[type] || 'fas fa-info-circle'
    },
    createNewQuiz() {
      // Implement quiz creation logic
    },
    editQuiz(quiz) {
      // Implement quiz editing logic
    },
    deleteQuiz(quiz) {
      // Implement quiz deletion logic
    },
    viewStudentDetails(student) {
      // Implement student details view logic
    },
    editStudent(student) {
      // Implement student editing logic
    }
  }
}
</script>

<style scoped>
.teacher-panel {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e3f2fd);
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

.sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow-y: auto;
}

.logo {
  padding: 0 20px;
  margin-bottom: 30px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #333;
  margin: 5px 0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

nav li i {
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  transition: all 0.3s ease;
}

nav li:hover, nav li.active {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  transform: translateX(5px);
}

nav li:hover i, nav li.active i {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: scale(1.1);
}

.main-content {
  flex: 1;
  margin-left: 280px;
  height: 100vh;
  overflow-y: auto;
  padding: 30px;
}

.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 30px;
  z-index: 900;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-bar {
  position: relative;
  width: 300px;
}

.search-bar input {
  width: 100%;
  padding: 12px 35px 12px 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.search-bar i {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a90e2;
}

.notifications {
  position: relative;
  cursor: pointer;
}

.notifications i {
  font-size: 1.2rem;
  color: #4a90e2;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.welcome-text {
  font-size: 0.9rem;
  color: #666;
}

.user-name {
  font-weight: 600;
  color: #333;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #4a90e2;
  padding: 2px;
  transition: all 0.3s ease;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #2ecc71;
  border-radius: 50%;
  border: 2px solid white;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-header h2 {
  color: #4a90e2;
  font-size: 1.8rem;
  margin: 0;
}

.date-range {
  display: flex;
  gap: 10px;
}

.date-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  cursor: pointer;
  transition: all 0.3s ease;
}

.date-btn.active {
  background: #4a90e2;
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  position: relative;
  overflow: hidden;
}

.stat-icon::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

.stat-info h3 {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-info p {
  margin: 5px 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #4a90e2;
}

.trend {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.trend.positive {
  color: #2ecc71;
}

.trend.negative {
  color: #e74c3c;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
}

.recent-activity, .quick-actions {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  color: #4a90e2;
  margin: 0;
  font-size: 1.2rem;
}

.view-all {
  background: none;
  border: none;
  color: #4a90e2;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.view-all:hover {
  background: rgba(74, 144, 226, 0.1);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.activity-item:hover {
  transform: translateX(5px);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.2);
  position: relative;
  overflow: hidden;
}

.activity-icon::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

.activity-icon.quiz {
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  color: white;
}

.activity-icon.student {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
}

.activity-icon.result {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.activity-details p {
  margin: 0;
  color: #333;
  font-weight: 500;
}

.activity-details small {
  color: #666;
  font-size: 0.85rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: none;
  border-radius: 12px;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

.action-btn i {
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  color: white;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.action-btn:hover {
  background: rgba(74, 144, 226, 0.2);
  transform: translateY(-3px);
}

.action-btn:hover i {
  transform: scale(1.1);
}

/* Remove mobile menu button styles */
.mobile-menu-btn {
  display: none;
}

/* Update responsive styles */
@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
  }

  .main-content {
    margin-left: 80px;
  }

  .logo h2 {
    display: none;
  }

  nav li span {
    display: none;
  }

  nav li {
    justify-content: center;
    padding: 15px;
  }

  nav li i {
    margin: 0;
    font-size: 1.4rem;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    padding: 10px 0;
  }

  .main-content {
    margin-left: 0;
    height: auto;
  }

  .teacher-panel {
    flex-direction: column;
  }

  nav ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
  }

  nav li {
    padding: 10px 15px;
    margin: 0;
    flex: 1;
    min-width: 100px;
    max-width: 150px;
  }

  nav li span {
    display: block;
    font-size: 0.8rem;
  }

  .header {
    position: relative;
    margin-top: 20px;
  }
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .teacher-panel {
    background: linear-gradient(to right, #1a1a1a, #2d3436);
  }

  .sidebar {
    background: rgba(30, 30, 30, 0.8);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }

  nav li {
    color: #fff;
  }

  nav li:hover, nav li.active {
    background: linear-gradient(to right, #7b61ff, #4a90e2);
  }

  .header {
    background: rgba(30, 30, 30, 0.8);
  }

  .search-bar input {
    background: rgba(40, 40, 40, 0.9);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.1);
  }

  .welcome-text {
    color: #aaa;
  }

  .user-name {
    color: #fff;
  }

  .stat-card {
    background: rgba(30, 30, 30, 0.8);
  }

  .stat-info h3 {
    color: #aaa;
  }

  .stat-info p {
    color: #7b61ff;
  }

  .recent-activity, .quick-actions {
    background: rgba(30, 30, 30, 0.8);
  }

  .activity-details p {
    color: #fff;
  }

  .activity-details small {
    color: #aaa;
  }

  .action-btn {
    background: rgba(123, 97, 255, 0.1);
    color: #7b61ff;
  }

  .action-btn:hover {
    background: #7b61ff;
    color: white;
  }

  .mobile-menu-btn {
    background: rgba(30, 30, 30, 0.8);
  }

  .mobile-menu-btn i {
    color: #7b61ff;
  }

  .mobile-menu-btn:hover {
    background: rgba(123, 97, 255, 0.1);
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

/* Dashboard Section Styles */
.dashboard {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dashboard h2 {
  color: #4a90e2;
  font-size: 2rem;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
}

.dashboard h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  border-radius: 3px;
}

/* Quizzes Section Styles */
.quizzes {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.quizzes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.quizzes-header h2 {
  color: #7b61ff;
  font-size: 2rem;
  position: relative;
  display: inline-block;
}

.quizzes-header h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #7b61ff, #4a90e2);
  border-radius: 3px;
}

.create-quiz-btn {
  background: linear-gradient(to right, #7b61ff, #4a90e2);
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.create-quiz-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(123, 97, 255, 0.4);
}

.quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.quiz-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.quiz-card h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.quiz-card p {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.quiz-stats {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  color: #666;
  font-size: 0.9rem;
}

.quiz-actions {
  display: flex;
  gap: 10px;
}

.quiz-actions button {
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.quiz-actions button:first-child {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.quiz-actions button:last-child {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.quiz-actions button:hover {
  transform: translateY(-2px);
}

/* Students Section Styles */
.students {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.students h2 {
  color: #2ecc71;
  font-size: 2rem;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
}

.students h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #2ecc71, #27ae60);
  border-radius: 3px;
}

.students-list table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.students-list th {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  padding: 15px;
  text-align: left;
  font-weight: 500;
}

.students-list td {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.students-list tr:last-child td {
  border-bottom: none;
}

.status {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status.active {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.status.inactive {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

/* Results Section Styles */
.results {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.results h2 {
  color: #e74c3c;
  font-size: 2rem;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
}

.results h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #e74c3c, #c0392b);
  border-radius: 3px;
}

.results-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.results-filters select {
  padding: 12px 20px;
  border: 2px solid rgba(231, 76, 60, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.results-filters select:focus {
  outline: none;
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.results-table {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.results-table th {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  padding: 15px;
  text-align: left;
  font-weight: 500;
}

.results-table td {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.results-table tr:last-child td {
  border-bottom: none;
}

/* Settings Section Styles */
.settings {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.settings h2 {
  color: #f1c40f;
  font-size: 2rem;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
}

.settings h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #f1c40f, #f39c12);
  border-radius: 3px;
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .dashboard, .quizzes, .students, .results, .settings {
    background: rgba(30, 30, 30, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .quiz-card, .students-list table, .results-table {
    background: rgba(40, 40, 40, 0.8);
  }

  .quiz-card h3, .students-list td, .results-table td {
    color: #fff;
  }

  .quiz-card p, .quiz-stats {
    color: #aaa;
  }

  .students-list th {
    background: rgba(46, 204, 113, 0.2);
  }

  .results-table th {
    background: rgba(231, 76, 60, 0.2);
  }
}
</style>
