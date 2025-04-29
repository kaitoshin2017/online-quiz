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
            <div class="avatar-placeholder">
              <i class="fas fa-user"></i>
            </div>
            <div class="status-indicator"></div>
          </div>
          <button class="logout-btn" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>

      <div class="content">
        <div v-if="isLoading" class="loading-overlay">
          <div class="spinner"></div>
        </div>
        <div v-else-if="error" class="error-message">
          {{ error }}
        </div>
        <template v-else>
        <!-- Dashboard Tab -->
          <AdminDashboard v-if="activeTab === 'dashboard'" 
            :totalUsers="totalUsers"
            :activeTeachers="activeTeachers"
            :activeStudents="activeStudents"
            :totalQuizzes="totalQuizzes"
            :recentActivities="recentActivities"
          />

        <!-- Users Tab -->
          <UserManagement v-if="activeTab === 'users'" 
            :users="users"
          />

        <!-- Teachers Tab -->
          <TeacherManagement v-if="activeTab === 'teachers'" 
            :teachers="teachers"
          />

        <!-- Students Tab -->
          <StudentManagement v-if="activeTab === 'students'" 
            :students="students"
          />

        <!-- Quizzes Tab -->
          <QuizManagement v-if="activeTab === 'quizzes'" 
            :quizzes="quizzes"
            @update:quizzes="updateQuizzes"
          />

        <!-- Reports Tab -->
        <ReportManagement v-if="activeTab === 'reports'" />

        <!-- Settings Tab -->
          <SettingsManagement v-if="activeTab === 'settings'" 
            :settings="settings"
            @update-settings="updateSettings"
          />
        </template>
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
import adminService from '../services/adminService'
import { ref, onMounted } from 'vue'

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
  setup() {
    const activeTab = ref('dashboard');
    const searchQuery = ref('');
    const adminName = ref('');
    const adminAvatar = ref('/default-avatar.png');
    const isLoading = ref(false);
    const error = ref('');
    const currentPath = ref(window.location.pathname);

    // Initialize data
    const totalUsers = ref(0);
    const activeTeachers = ref(0);
    const activeStudents = ref(0);
    const totalQuizzes = ref(0);
    const recentActivities = ref([]);
    const users = ref([]);
    const teachers = ref([]);
    const students = ref([]);
    const quizzes = ref([]);
    const settings = ref({
        systemName: 'Online Quiz System',
        systemEmail: 'admin@example.com',
        timezone: 'UTC',
        passwordPolicy: 'medium',
        sessionTimeout: 30,
        twoFactorAuth: true,
        emailNotifications: true,
        systemNotifications: true,
        notificationFrequency: 'realtime'
    });

    // Initialize component
    onMounted(async () => {
      try {
        isLoading.value = true;
        error.value = '';
        
        // Initialize token from localStorage
        const hasToken = adminService.initializeToken();
        
        if (!hasToken) {
          window.location.href = '/login';
          return;
        }
        
        // Fetch quizzes first
        console.log('Fetching initial quizzes...');
        const quizzesResponse = await adminService.getQuizzes();
        if (!quizzesResponse.success) {
          throw new Error(quizzesResponse.message || 'Failed to fetch quizzes');
        }
        console.log('Initial quizzes loaded:', quizzesResponse.quizzes);
        quizzes.value = quizzesResponse.quizzes || [];
        
        // Rest of the initialization...
        const profileResponse = await adminService.getProfile();
        if (!profileResponse.success) {
          throw new Error(profileResponse.message || 'Failed to fetch profile');
        }
        
        const { firstName, lastName, email, avatar } = profileResponse.admin;
        adminName.value = `${firstName} ${lastName}`;
        adminAvatar.value = avatar || '/default-avatar.png';

        // Fetch dashboard data
        const dashboardResponse = await adminService.getDashboard();
        if (!dashboardResponse.success) {
          throw new Error(dashboardResponse.message || 'Failed to fetch dashboard data');
        }
        
        const { statistics, recentActivities: activities } = dashboardResponse.data;
        totalUsers.value = statistics.totalUsers;
        activeTeachers.value = statistics.activeTeachers;
        activeStudents.value = statistics.activeStudents;
        totalQuizzes.value = statistics.totalQuizzes;
        recentActivities.value = activities;

        // Fetch other data...
        const [usersResponse, teachersResponse, studentsResponse] = await Promise.all([
          adminService.getUsers(),
          adminService.getTeachers(),
          adminService.getStudents()
        ]);

        if (usersResponse.success) users.value = usersResponse.users;
        if (teachersResponse.success) teachers.value = teachersResponse.teachers;
        if (studentsResponse.success) students.value = studentsResponse.students;

      } catch (err) {
        console.error('Error initializing admin panel:', err);
        error.value = err.message || 'An error occurred while initializing the admin panel';
        
        if (err.status === 401) {
          window.location.href = '/login';
        }
      } finally {
        isLoading.value = false;
      }
    });

    // Update settings
    const updateSettings = async (newSettings) => {
      try {
        isLoading.value = true;
        error.value = '';
        
        const response = await adminService.updateSettings(newSettings);
        if (!response.success) {
          throw new Error(response.message || 'Failed to update settings');
        }
        
        settings.value = newSettings;
      } catch (err) {
        error.value = err.message || 'An error occurred while updating settings';
        console.error('Error updating settings:', err);
      } finally {
        isLoading.value = false;
      }
    };

    // Handle logout
    const logout = () => {
      adminService.setAuthToken(null);
      window.location.href = '/login';
    };

    // Update quizzes method
    const updateQuizzes = (newQuizzes) => {
      console.log('Updating quizzes in AdminPanel:', newQuizzes);
      if (Array.isArray(newQuizzes)) {
        quizzes.value = [...newQuizzes];
        console.log('Quizzes updated successfully:', quizzes.value);
      } else {
        console.error('Invalid quizzes data received:', newQuizzes);
      }
    };

    return {
      activeTab,
      searchQuery,
      adminName,
      adminAvatar,
      isLoading,
      error,
      currentPath,
      totalUsers,
      activeTeachers,
      activeStudents,
      totalQuizzes,
      recentActivities,
      users,
      teachers,
      students,
      quizzes,
      settings,
      updateSettings,
      logout,
      updateQuizzes
    };
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

.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: 2px solid #4f46e5;
}

.avatar-placeholder i {
  color: white;
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-message {
  padding: 20px;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  margin: 20px;
  text-align: center;
}

.logout-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 