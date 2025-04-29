<template>
  <div class="admin-dashboard">
    <div class="page-header">
      <h2>Admin Dashboard</h2>
      <div class="date-range">
        <button 
          v-for="range in dateRanges" 
          :key="range.id"
          class="date-btn" 
          :class="{ active: selectedDateRange === range.id }"
          @click="handleDateRangeChange(range.id)"
        >
          {{ range.label }}
        </button>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-info">
          <h3>Total Users</h3>
          <p>{{ totalUsers }}</p>
          <span class="trend positive">+15% from last month</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-chalkboard-teacher"></i>
        </div>
        <div class="stat-info">
          <h3>Active Teachers</h3>
          <p>{{ activeTeachers }}</p>
          <span class="trend positive">+8% from last month</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-user-graduate"></i>
        </div>
        <div class="stat-info">
          <h3>Active Students</h3>
          <p>{{ activeStudents }}</p>
          <span class="trend positive">+12% from last month</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-question-circle"></i>
        </div>
        <div class="stat-info">
          <h3>Total Quizzes</h3>
          <p>{{ totalQuizzes }}</p>
          <span class="trend positive">+20% from last month</span>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="recent-activity">
        <div class="section-header">
          <h3>Recent Activity</h3>
          <button class="view-all" @click="$router.push('/admin/activities')">View All</button>
        </div>
        <div class="activity-list">
          <div v-if="isLoading" class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div v-else-if="filteredActivities.length === 0" class="no-activities">
            No activities found for the selected period
          </div>
          <div v-else v-for="activity in filteredActivities" :key="activity.id" class="activity-item">
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
          <button class="view-all" @click="$router.push('/admin/actions')">More</button>
        </div>
        <div class="actions-grid">
          <button class="action-btn" @click="addNewUser" :disabled="isLoading">
            <i class="fas fa-user-plus"></i>
            <span>Add User</span>
          </button>
          <button class="action-btn" @click="createNewQuiz" :disabled="isLoading">
            <i class="fas fa-plus"></i>
            <span>Create Quiz</span>
          </button>
          <button class="action-btn" @click="generateReport" :disabled="isLoading">
            <i class="fas fa-file-export"></i>
            <span>Generate Report</span>
          </button>
          <button class="action-btn" @click="openSettings" :disabled="isLoading">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import adminService from '../services/adminService'

export default {
  name: 'AdminDashboard',
  props: {
    totalUsers: {
      type: Number,
      required: true
    },
    activeTeachers: {
      type: Number,
      required: true
    },
    activeStudents: {
      type: Number,
      required: true
    },
    totalQuizzes: {
      type: Number,
      required: true
    },
    recentActivities: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const router = useRouter()
    const selectedDateRange = ref('today')
    const isLoading = ref(false)
    const error = ref(null)

    const dateRanges = [
      { id: 'today', label: 'Today' },
      { id: 'week', label: 'Week' },
      { id: 'month', label: 'Month' },
      { id: 'year', label: 'Year' }
    ]

    const filteredActivities = computed(() => {
      if (!props.recentActivities) return []
      return props.recentActivities.filter(activity => {
        const activityDate = new Date(activity.time)
        const now = new Date()
        const diffTime = Math.abs(now - activityDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        switch (selectedDateRange.value) {
          case 'today':
            return diffDays <= 1
          case 'week':
            return diffDays <= 7
          case 'month':
            return diffDays <= 30
          case 'year':
            return diffDays <= 365
          default:
            return true
        }
      })
    })

    const handleDateRangeChange = (range) => {
      selectedDateRange.value = range
      emit('date-range-change', range)
    }

    const addNewUser = async () => {
      try {
        isLoading.value = true
        error.value = null
        await router.push('/admin/users/new')
      } catch (err) {
        error.value = 'Failed to navigate to add user page'
        console.error('Error navigating to add user:', err)
      } finally {
        isLoading.value = false
      }
    }

    const createNewQuiz = async () => {
      try {
        isLoading.value = true
        error.value = null
        await router.push('/admin/quizzes/new')
      } catch (err) {
        error.value = 'Failed to navigate to create quiz page'
        console.error('Error navigating to create quiz:', err)
      } finally {
        isLoading.value = false
      }
    }

    const generateReport = async () => {
      try {
        isLoading.value = true
        error.value = null
        
        const response = await adminService.generateReport(selectedDateRange.value)
        
        if (response.success && response.data) {
          // Create a blob from the response data
          const blob = new Blob([response.data], { type: 'application/pdf' })
          
          // Create a URL for the blob
          const url = window.URL.createObjectURL(blob)
          
          // Create a temporary link element
          const link = document.createElement('a')
          link.href = url
          link.download = `report-${selectedDateRange.value}-${new Date().toISOString().split('T')[0]}.pdf`
          
          // Append to body, click, and remove
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(link)
          
          // Show success message
          error.value = 'Report generated successfully!'
        } else {
          throw new Error('Failed to generate report: Invalid response format')
        }
      } catch (err) {
        console.error('Error generating report:', err)
        error.value = err.message || 'Failed to generate report. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    const openSettings = async () => {
      try {
        isLoading.value = true
        error.value = null
        await router.push('/admin/settings')
      } catch (err) {
        error.value = 'Failed to navigate to settings page'
        console.error('Error navigating to settings:', err)
      } finally {
        isLoading.value = false
      }
    }

    return {
      selectedDateRange,
      dateRanges,
      filteredActivities,
      isLoading,
      error,
      handleDateRangeChange,
      addNewUser,
      createNewQuiz,
      generateReport,
      openSettings
    }
  },
  methods: {
    getActivityIcon(type) {
      const icons = {
        user: 'fas fa-user',
        quiz: 'fas fa-question-circle',
        report: 'fas fa-chart-bar',
        settings: 'fas fa-cog',
        login: 'fas fa-sign-in-alt',
        logout: 'fas fa-sign-out-alt'
      }
      return icons[type] || 'fas fa-info-circle'
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  position: relative;
  display: inline-block;
}

.page-header h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  border-radius: 3px;
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
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

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.activity-item:hover {
  transform: translateX(5px);
  background: rgba(255, 255, 255, 0.8);
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

.activity-icon.user {
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  color: white;
}

.activity-icon.quiz {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
}

.activity-icon.report {
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

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .admin-dashboard {
    background: rgba(30, 30, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .stat-card {
    background: rgba(40, 40, 40, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .stat-info h3 {
    color: #aaa;
  }

  .activity-item {
    background: rgba(40, 40, 40, 0.5);
  }

  .activity-item:hover {
    background: rgba(40, 40, 40, 0.8);
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
    background: rgba(123, 97, 255, 0.2);
  }
}

/* Animations */
@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .date-range {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 5px;
  }
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.loading-spinner i {
  font-size: 24px;
  color: #4a90e2;
}

.no-activities {
  text-align: center;
  padding: 20px;
  color: #64748b;
}

.action-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.action-btn:disabled:hover {
  transform: none;
  box-shadow: none;
}
</style> 