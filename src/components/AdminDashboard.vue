<template>
  <div class="admin-dashboard">
    <div class="page-header">
      <h2>Admin Dashboard</h2>
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
          <button class="action-btn" @click="addNewUser">
            <i class="fas fa-user-plus"></i>
            <span>Add User</span>
          </button>
          <button class="action-btn" @click="createNewQuiz">
            <i class="fas fa-plus"></i>
            <span>Create Quiz</span>
          </button>
          <button class="action-btn" @click="generateReport">
            <i class="fas fa-file-export"></i>
            <span>Generate Report</span>
          </button>
          <button class="action-btn" @click="openSettings">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
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
      ]
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
    createNewQuiz() {
      // Implement quiz creation logic
    },
    generateReport() {
      // Implement report generation logic
    },
    openSettings() {
      // Implement settings opening logic
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
</style> 