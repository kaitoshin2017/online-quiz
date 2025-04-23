<template>
  <div class="admin-panel">
    <div class="sidebar">
      <div class="logo">
        <Logo />
      </div>
      <nav>
        <ul>
          <li @click="$router.push('/')" :class="{ active: currentPath === '/' }">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </li>
          <li @click="activeTab = 'dashboard'" :class="{ active: activeTab === 'dashboard' }">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </li>
          <li @click="activeTab = 'users'" :class="{ active: activeTab === 'users' }">
            <i class="fas fa-users"></i>
            <span>User Management</span>
          </li>
          <li @click="activeTab = 'teachers'" :class="{ active: activeTab === 'teachers' }">
            <i class="fas fa-chalkboard-teacher"></i>
            <span>Teachers</span>
          </li>
          <li @click="activeTab = 'students'" :class="{ active: activeTab === 'students' }">
            <i class="fas fa-user-graduate"></i>
            <span>Students</span>
          </li>
          <li @click="activeTab = 'quizzes'" :class="{ active: activeTab === 'quizzes' }">
            <i class="fas fa-question-circle"></i>
            <span>Quizzes</span>
          </li>
          <li @click="activeTab = 'reports'" :class="{ active: activeTab === 'reports' }">
            <i class="fas fa-chart-bar"></i>
            <span>Reports</span>
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
            <span class="notification-badge">5</span>
          </div>
        </div>
        <div class="user-profile">
          <div class="user-info">
            <span class="welcome-text">Welcome back,</span>
            <span class="user-name">{{ adminName }}</span>
          </div>
          <div class="avatar-container">
            <img :src="adminAvatar" alt="Admin Avatar" class="avatar">
            <div class="status-indicator"></div>
          </div>
        </div>
      </div>

      <div class="content">
        <!-- Dashboard Tab -->
        <AdminDashboard v-if="activeTab === 'dashboard'" />

        <!-- Users Tab -->
        <UserManagement v-if="activeTab === 'users'" />

        <!-- Teachers Tab -->
        <TeacherManagement v-if="activeTab === 'teachers'" />

        <!-- Students Tab -->
        <StudentManagement v-if="activeTab === 'students'" />

        <!-- Quizzes Tab -->
        <QuizManagement v-if="activeTab === 'quizzes'" />

        <!-- Reports Tab -->
        <ReportManagement v-if="activeTab === 'reports'" />

        <!-- Settings Tab -->
        <SettingsManagement v-if="activeTab === 'settings'" />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import AdminDashboard from '../components/AdminDashboard.vue'
import TeacherManagement from '../components/TeacherManagement.vue'
import StudentManagement from '../components/StudentManagement.vue'
import QuizManagement from '../components/QuizManagement.vue'
import ReportManagement from '../components/ReportManagement.vue'
import SettingsManagement from '../components/SettingsManagement.vue'
import UserManagement from '../components/UserManagement.vue'

export default {
  name: 'AdminPanel',
  components: {
    Logo,
    AdminDashboard,
    TeacherManagement,
    StudentManagement,
    QuizManagement,
    ReportManagement,
    SettingsManagement,
    UserManagement
  },
  data() {
    return {
      activeTab: 'dashboard',
      searchQuery: '',
      adminName: 'Warren',
      adminAvatar: 'https://via.placeholder.com/40',
      totalUsers: 150,
      activeTeachers: 25,
      activeStudents: 120,
      totalQuizzes: 45,
      recentActivities: [
        {
          id: 1,
          type: 'user',
          description: 'New user registration',
          time: '5 minutes ago'
        },
        {
          id: 2,
          type: 'quiz',
          description: 'New quiz created',
          time: '1 hour ago'
        },
        {
          id: 3,
          type: 'report',
          description: 'Monthly report generated',
          time: '2 hours ago'
        }
      ],
      userFilter: 'all',
      statusFilter: 'all',
      users: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Teacher',
          status: 'active',
          lastLogin: '2024-03-15 10:30'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Student',
          status: 'active',
          lastLogin: '2024-03-15 09:15'
        }
      ],
      teachers: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://via.placeholder.com/50',
          courses: 5,
          students: 45,
          rating: 4.8
        }
      ],
      students: [
        {
          id: 1,
          name: 'Jane Smith',
          email: 'jane@example.com',
          grade: 10,
          quizzesTaken: 8,
          averageScore: 85,
          status: 'active'
        }
      ],
      quizzes: [
        {
          id: 1,
          title: 'Mathematics Basics',
          subject: 'Mathematics',
          duration: 45,
          questions: 20,
          participants: 30,
          averageScore: 75,
          status: 'active'
        }
      ],
      settings: {
        systemName: 'Online Quiz System',
        systemEmail: 'admin@example.com',
        timezone: 'UTC',
        passwordPolicy: 'medium',
        sessionTimeout: 30,
        twoFactorAuth: true,
        emailNotifications: true,
        systemNotifications: true,
        notificationFrequency: 'realtime'
      },
      timezones: ['UTC', 'EST', 'PST', 'GMT'],
      grades: [9, 10, 11, 12],
      subjects: ['Mathematics', 'Science', 'English', 'History'],
      userGrowthPeriod: 'month',
      quizPerformancePeriod: 'month',
      systemUsagePeriod: 'month'
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        if (this.userFilter !== 'all' && user.role.toLowerCase() !== this.userFilter) {
          return false;
        }
        if (this.statusFilter !== 'all' && user.status !== this.statusFilter) {
          return false;
        }
        return true;
      });
    },
    filteredStudents() {
      return this.students.filter(student => {
        if (this.studentFilter !== 'all' && student.status !== this.studentFilter) {
          return false;
        }
        if (this.gradeFilter !== 'all' && student.grade !== parseInt(this.gradeFilter)) {
          return false;
        }
        return true;
      });
    },
    filteredQuizzes() {
      return this.quizzes.filter(quiz => {
        if (this.quizFilter !== 'all' && quiz.status !== this.quizFilter) {
          return false;
        }
        if (this.subjectFilter !== 'all' && quiz.subject !== this.subjectFilter) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    getActivityIcon(type) {
      const icons = {
        user: 'fas fa-user',
        quiz: 'fas fa-question-circle',
        report: 'fas fa-chart-bar'
      }
      return icons[type] || 'fas fa-info-circle'
    },
    addNewUser() {
      // Implement user creation logic
    },
    editUser(user) {
      // Implement user editing logic
    },
    deleteUser(user) {
      // Implement user deletion logic
    },
    addNewTeacher() {
      // Implement teacher creation logic
    },
    editTeacher(teacher) {
      // Implement teacher editing logic
    },
    deleteTeacher(teacher) {
      // Implement teacher deletion logic
    },
    addNewStudent() {
      // Implement student creation logic
    },
    editStudent(student) {
      // Implement student editing logic
    },
    deleteStudent(student) {
      // Implement student deletion logic
    },
    createNewQuiz() {
      // Implement quiz creation logic
    },
    editQuiz(quiz) {
      // Implement quiz editing logic
    },
    previewQuiz(quiz) {
      // Implement quiz preview logic
    },
    deleteQuiz(quiz) {
      // Implement quiz deletion logic
    },
    generateReport() {
      // Implement report generation logic
    },
    exportData() {
      // Implement data export logic
    },
    saveSettings() {
      // Implement settings save logic
    },
    resetSettings() {
      // Implement settings reset logic
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.admin-panel {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #e4e7eb);
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: #fff;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
  padding: 20px 0;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow-y: auto;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 0 20px;
  margin-bottom: 30px;
  text-align: center;
}

nav {
  flex: 1;
  padding: 0 15px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

nav li {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #64748b;
  border-radius: 10px;
  font-weight: 500;
}

nav li i {
  font-size: 1.2rem;
  color: #64748b;
  transition: all 0.3s ease;
}

nav li span {
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

nav li:hover, nav li.active {
  background: #4f46e5;
  color: white;
}

nav li:hover i, nav li.active i {
  color: white;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 20px 30px;
  transition: all 0.3s ease;
}

/* Header Styles */
.header {
  background: #fff;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 10px 40px 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  background: #f8fafc;
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.search-bar i {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.notifications {
  position: relative;
  cursor: pointer;
}

.notifications i {
  font-size: 1.2rem;
  color: #64748b;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
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
  font-size: 0.85rem;
  color: #64748b;
}

.user-name {
  font-weight: 600;
  color: #1e293b;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #4f46e5;
  padding: 2px;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid white;
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .admin-panel {
    background: linear-gradient(135deg, #1e293b, #0f172a);
  }

  .sidebar {
    background: #1e293b;
  }

  nav li {
    color: #94a3b8;
  }

  nav li i {
    color: #94a3b8;
  }

  nav li:hover, nav li.active {
    background: #4f46e5;
    color: white;
  }

  .header {
    background: #1e293b;
  }

  .search-bar input {
    background: #0f172a;
    border-color: #334155;
    color: #e2e8f0;
  }

  .search-bar input:focus {
    border-color: #4f46e5;
  }

  .welcome-text {
    color: #94a3b8;
  }

  .user-name {
    color: #e2e8f0;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
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
  .header {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  .header-left {
    width: 100%;
    flex-direction: column;
  }

  .search-bar {
    width: 100%;
  }

  .user-profile {
    width: 100%;
    justify-content: center;
  }
}
</style> 