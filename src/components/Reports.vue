<template>
  <div class="reports">
    <div class="section-header">
      <h2>System Reports</h2>
      <div class="report-actions">
        <button class="generate-report-btn" @click="generateReport">
          <i class="fas fa-file-export"></i> Generate Report
        </button>
        <button class="export-data-btn" @click="exportData">
          <i class="fas fa-download"></i> Export Data
        </button>
      </div>
    </div>

    <div class="reports-grid">
      <div class="report-card">
        <div class="report-header">
          <h3>User Growth</h3>
          <select v-model="userGrowthPeriod" class="period-select">
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div class="report-chart">
          <!-- Chart component will be added here -->
          <div class="chart-placeholder">
            <i class="fas fa-chart-line"></i>
            <span>User Growth Chart</span>
          </div>
        </div>
        <div class="report-stats">
          <div class="stat-item">
            <span class="stat-label">Total Users</span>
            <span class="stat-value">1,234</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">New Users</span>
            <span class="stat-value">123</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Growth Rate</span>
            <span class="stat-value">+15%</span>
          </div>
        </div>
      </div>

      <div class="report-card">
        <div class="report-header">
          <h3>Quiz Performance</h3>
          <select v-model="quizPerformancePeriod" class="period-select">
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div class="report-chart">
          <!-- Chart component will be added here -->
          <div class="chart-placeholder">
            <i class="fas fa-chart-bar"></i>
            <span>Quiz Performance Chart</span>
          </div>
        </div>
        <div class="report-stats">
          <div class="stat-item">
            <span class="stat-label">Total Quizzes</span>
            <span class="stat-value">45</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Average Score</span>
            <span class="stat-value">75%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Completion Rate</span>
            <span class="stat-value">85%</span>
          </div>
        </div>
      </div>

      <div class="report-card">
        <div class="report-header">
          <h3>System Usage</h3>
          <select v-model="systemUsagePeriod" class="period-select">
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div class="report-chart">
          <!-- Chart component will be added here -->
          <div class="chart-placeholder">
            <i class="fas fa-chart-pie"></i>
            <span>System Usage Chart</span>
          </div>
        </div>
        <div class="report-stats">
          <div class="stat-item">
            <span class="stat-label">Active Users</span>
            <span class="stat-value">789</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Peak Hours</span>
            <span class="stat-value">14:00-16:00</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Server Load</span>
            <span class="stat-value">45%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="recent-activities">
      <h3>Recent Activities</h3>
      <div class="activity-list">
        <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
          <div class="activity-icon" :class="activity.type">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          <div class="activity-content">
            <p class="activity-description">{{ activity.description }}</p>
            <span class="activity-time">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reports',
  data() {
    return {
      userGrowthPeriod: 'month',
      quizPerformancePeriod: 'month',
      systemUsagePeriod: 'month',
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
    generateReport() {
      // Implement report generation logic
    },
    exportData() {
      // Implement data export logic
    },
    getActivityIcon(type) {
      const icons = {
        user: 'fas fa-user',
        quiz: 'fas fa-question-circle',
        report: 'fas fa-chart-bar'
      }
      return icons[type] || 'fas fa-info-circle'
    }
  }
}
</script>

<style scoped>
.reports {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  color: #4a90e2;
  font-size: 1.8rem;
  margin: 0;
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  border-radius: 3px;
}

.report-actions {
  display: flex;
  gap: 15px;
}

.generate-report-btn, .export-data-btn {
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
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

.generate-report-btn:hover, .export-data-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.report-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(74, 144, 226, 0.1);
}

.report-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.report-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.period-select {
  padding: 8px 15px;
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.period-select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.report-chart {
  height: 200px;
  margin-bottom: 20px;
  background: rgba(74, 144, 226, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #666;
}

.chart-placeholder i {
  font-size: 2rem;
  color: #4a90e2;
}

.report-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.recent-activities {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.recent-activities h3 {
  margin: 0 0 20px;
  color: #333;
  font-size: 1.2rem;
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
  background: rgba(74, 144, 226, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  transform: translateX(5px);
  background: rgba(74, 144, 226, 0.1);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.activity-icon.user {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.activity-icon.quiz {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.activity-icon.report {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

.activity-content {
  flex: 1;
}

.activity-description {
  margin: 0;
  color: #333;
  font-size: 0.9rem;
}

.activity-time {
  font-size: 0.8rem;
  color: #666;
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .reports {
    background: rgba(30, 30, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .report-card {
    background: rgba(40, 40, 40, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .report-header h3 {
    color: #fff;
  }

  .period-select {
    background: rgba(40, 40, 40, 0.9);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.1);
  }

  .report-chart {
    background: rgba(123, 97, 255, 0.1);
  }

  .chart-placeholder {
    color: #aaa;
  }

  .stat-label {
    color: #aaa;
  }

  .stat-value {
    color: #fff;
  }

  .recent-activities {
    background: rgba(40, 40, 40, 0.9);
  }

  .recent-activities h3 {
    color: #fff;
  }

  .activity-item {
    background: rgba(123, 97, 255, 0.1);
  }

  .activity-item:hover {
    background: rgba(123, 97, 255, 0.2);
  }

  .activity-description {
    color: #fff;
  }

  .activity-time {
    color: #aaa;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 15px;
  }

  .report-actions {
    width: 100%;
  }

  .generate-report-btn, .export-data-btn {
    flex: 1;
  }

  .reports-grid {
    grid-template-columns: 1fr;
  }

  .report-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 