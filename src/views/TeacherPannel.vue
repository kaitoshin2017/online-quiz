<template>
  <div class="teacher-panel">
    <div class="sidebar">
      <div class="logo">
        <h2>Teacher Panel</h2>
      </div>
      <nav>
        <ul>
          <li @click="activeTab = 'dashboard'" :class="{ active: activeTab === 'dashboard' }">
            <i class="fas fa-home"></i> Dashboard
          </li>
          <li @click="activeTab = 'quizzes'" :class="{ active: activeTab === 'quizzes' }">
            <i class="fas fa-question-circle"></i> Quizzes
          </li>
          <li @click="activeTab = 'students'" :class="{ active: activeTab === 'students' }">
            <i class="fas fa-users"></i> Students
          </li>
          <li @click="activeTab = 'results'" :class="{ active: activeTab === 'results' }">
            <i class="fas fa-chart-bar"></i> Results
          </li>
        </ul>
      </nav>
    </div>

    <div class="main-content">
      <div class="header">
        <div class="search-bar">
          <input type="text" placeholder="Search..." v-model="searchQuery">
          <i class="fas fa-search"></i>
        </div>
        <div class="user-profile">
          <span>Welcome, {{ teacherName }}</span>
          <img :src="teacherAvatar" alt="Teacher Avatar" class="avatar">
        </div>
      </div>

      <div class="content">
        <!-- Dashboard Tab -->
        <div v-if="activeTab === 'dashboard'" class="dashboard">
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Total Quizzes</h3>
              <p>{{ totalQuizzes }}</p>
            </div>
            <div class="stat-card">
              <h3>Active Students</h3>
              <p>{{ activeStudents }}</p>
            </div>
            <div class="stat-card">
              <h3>Average Score</h3>
              <p>{{ averageScore }}%</p>
            </div>
            <div class="stat-card">
              <h3>Pending Reviews</h3>
              <p>{{ pendingReviews }}</p>
            </div>
          </div>

          <div class="recent-activity">
            <h3>Recent Activity</h3>
            <div class="activity-list">
              <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                <span class="activity-icon" :class="activity.type">
                  <i :class="getActivityIcon(activity.type)"></i>
                </span>
                <div class="activity-details">
                  <p>{{ activity.description }}</p>
                  <small>{{ activity.time }}</small>
                </div>
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
export default {
  name: 'TeacherPanel',
  data() {
    return {
      activeTab: 'dashboard',
      searchQuery: '',
      teacherName: 'John Doe',
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
}

.sidebar {
  width: 250px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.logo {
  padding: 0 20px;
  margin-bottom: 30px;
}

.logo h2 {
  color: #4a90e2;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 700;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  color: #333;
  margin: 5px 0;
  border-radius: 8px;
}

nav li i {
  margin-right: 10px;
  width: 20px;
  font-size: 1.2rem;
}

nav li:hover, nav li.active {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  transform: translateX(5px);
}

.main-content {
  flex: 1;
  padding: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 15px 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.search-bar {
  position: relative;
  width: 300px;
}

.search-bar input {
  width: 85%;
  padding: 12px 35px 12px 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.search-bar i {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a90e2;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #333;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #4a90e2;
  padding: 2px;
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
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  margin: 0;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
}

.stat-card p {
  margin: 10px 0 0;
  font-size: 2rem;
  font-weight: 700;
  color: #4a90e2;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.recent-activity {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.recent-activity h3 {
  color: #4a90e2;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.activity-item:hover {
  transform: translateX(5px);
}

.activity-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  background: rgba(74, 144, 226, 0.1);
  font-size: 1.2rem;
}

.activity-icon.quiz { color: #4a90e2; }
.activity-icon.student { color: #2ecc71; }
.activity-icon.result { color: #e74c3c; }

.activity-details p {
  margin: 0;
  color: #333;
  font-weight: 500;
}

.activity-details small {
  color: #666;
  font-size: 0.85rem;
}

.quizzes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.quizzes-header h2 {
  color: #4a90e2;
  font-size: 1.8rem;
  margin: 0;
}

.create-quiz-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.create-quiz-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.quiz-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.quiz-card h3 {
  color: #4a90e2;
  margin: 0 0 10px 0;
  font-size: 1.3rem;
}

.quiz-card p {
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.quiz-stats {
  display: flex;
  gap: 20px;
  margin: 15px 0;
  color: #666;
  font-size: 0.9rem;
}

.quiz-stats span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quiz-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.quiz-actions button {
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  font-weight: 500;
  transition: all 0.3s ease;
}

.quiz-actions button:hover {
  background: #4a90e2;
  color: white;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

th {
  background: rgba(74, 144, 226, 0.1);
  font-weight: 600;
  color: #4a90e2;
}

.status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
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

.status.completed {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.results-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.results-filters select {
  padding: 10px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.results-filters select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.results-chart {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  height: 300px;
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

  .logo h2 {
    color: #7b61ff;
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

  .user-profile {
    color: #fff;
  }

  .stat-card, .recent-activity, .quiz-card, table, .results-chart {
    background: rgba(30, 30, 30, 0.8);
  }

  .stat-card h3, .activity-details p {
    color: #fff;
  }

  .stat-card p {
    color: #7b61ff;
  }

  .activity-details small {
    color: #aaa;
  }

  .quiz-card h3 {
    color: #7b61ff;
  }

  .quiz-card p, .quiz-stats {
    color: #aaa;
  }

  .quiz-actions button {
    background: rgba(123, 97, 255, 0.1);
    color: #7b61ff;
  }

  .quiz-actions button:hover {
    background: #7b61ff;
    color: white;
  }

  th {
    background: rgba(123, 97, 255, 0.1);
    color: #7b61ff;
  }

  td {
    color: #fff;
  }

  .results-filters select {
    background: rgba(40, 40, 40, 0.9);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
