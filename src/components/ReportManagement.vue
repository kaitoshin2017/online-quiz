<template>
  <div class="report-management">
    <div class="section-header">
      <h2>Report Management</h2>
      <button class="generate-report-btn" @click="generateNewReport">
        <i class="fas fa-file-alt"></i> Generate New Report
      </button>
    </div>

    <div class="filters-bar">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Search reports...">
      </div>
      <div class="filter-group">
        <select v-model="typeFilter" class="filter-select">
          <option value="all">All Types</option>
          <option value="performance">Performance</option>
          <option value="attendance">Attendance</option>
          <option value="quiz">Quiz Results</option>
          <option value="analytics">Analytics</option>
        </select>
        <select v-model="dateFilter" class="filter-select">
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
    </div>

    <div class="reports-grid">
      <div v-for="report in filteredReports" :key="report.id" class="report-card">
        <div class="report-header">
          <div class="report-icon">
            <i :class="getReportIcon(report.type)"></i>
          </div>
          <div class="report-info">
            <h3>{{ report.title }}</h3>
            <p>{{ report.description }}</p>
            <div class="report-badges">
              <span :class="['type-badge', report.type]">{{ report.type }}</span>
              <span class="date-badge">
                <i class="fas fa-calendar"></i>
                {{ report.date }}
              </span>
            </div>
          </div>
        </div>

        <div class="report-stats">
          <div class="stat-item">
            <i class="fas fa-users"></i>
            <div class="stat-info">
              <span class="stat-value">{{ report.participants }}</span>
              <span class="stat-label">Participants</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-chart-line"></i>
            <div class="stat-info">
              <span class="stat-value">{{ report.dataPoints }}</span>
              <span class="stat-label">Data Points</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-file-download"></i>
            <div class="stat-info">
              <span class="stat-value">{{ report.downloads }}</span>
              <span class="stat-label">Downloads</span>
            </div>
          </div>
        </div>

        <div class="report-actions">
          <button @click="viewReport(report)" class="action-btn view">
            <i class="fas fa-eye"></i>
            <span>View</span>
          </button>
          <button @click="downloadReport(report)" class="action-btn download">
            <i class="fas fa-download"></i>
            <span>Download</span>
          </button>
          <button @click="deleteReport(report)" class="action-btn delete">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportManagement',
  data() {
    return {
      searchQuery: '',
      typeFilter: 'all',
      dateFilter: 'all',
      reports: [
        {
          id: 1,
          title: 'Student Performance Report',
          description: 'Comprehensive analysis of student performance across all subjects',
          type: 'performance',
          date: '2024-03-20',
          participants: 150,
          dataPoints: 1200,
          downloads: 25
        },
        // Add more sample data as needed
      ]
    }
  },
  computed: {
    filteredReports() {
      return this.reports.filter(report => {
        if (this.typeFilter !== 'all' && report.type !== this.typeFilter) {
          return false;
        }
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          return report.title.toLowerCase().includes(query) ||
                 report.description.toLowerCase().includes(query);
        }
        return true;
      });
    }
  },
  methods: {
    getReportIcon(type) {
      const icons = {
        performance: 'fas fa-chart-bar',
        attendance: 'fas fa-calendar-check',
        quiz: 'fas fa-question-circle',
        analytics: 'fas fa-chart-pie'
      };
      return icons[type] || 'fas fa-file-alt';
    },
    generateNewReport() {
      // Implement report generation logic
    },
    viewReport(report) {
      // Implement view report logic
    },
    downloadReport(report) {
      // Implement download logic
    },
    deleteReport(report) {
      // Implement delete logic
    }
  }
}
</script>

<style scoped>
.report-management {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.section-header h2 {
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(120deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.generate-report-btn {
  background: linear-gradient(120deg, #4f46e5, #7c3aed);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.generate-report-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
}

.filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  gap: 20px;
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-box input {
  width: 100%;
  padding: 12px 44px 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: #fff;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.search-box i {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 1.1rem;
}

.filter-group {
  display: flex;
  gap: 16px;
}

.filter-select {
  padding: 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
}

.filter-select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}

.report-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.report-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.report-header {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.report-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(120deg, #4f46e5, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.report-icon i {
  font-size: 1.5rem;
  color: white;
}

.report-card:hover .report-icon {
  transform: scale(1.05);
}

.report-info {
  flex: 1;
}

.report-info h3 {
  margin: 0 0 6px 0;
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
}

.report-info p {
  margin: 0 0 12px 0;
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
}

.report-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.type-badge {
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.type-badge.performance {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.type-badge.attendance {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.type-badge.quiz {
  background: rgba(234, 179, 8, 0.1);
  color: #ca8a04;
}

.type-badge.analytics {
  background: rgba(14, 165, 233, 0.1);
  color: #0ea5e9;
}

.date-badge {
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  color: #64748b;
}

.date-badge i {
  font-size: 0.9rem;
}

.report-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-item i {
  font-size: 1.2rem;
  color: #4f46e5;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.report-card:hover .stat-item i {
  background: rgba(79, 70, 229, 0.15);
  transform: scale(1.05);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

.report-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.action-btn i {
  font-size: 1.1rem;
}

.action-btn.view {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.action-btn.view:hover {
  background: rgba(79, 70, 229, 0.15);
  transform: translateY(-2px);
}

.action-btn.download {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.action-btn.download:hover {
  background: rgba(34, 197, 94, 0.15);
  transform: translateY(-2px);
}

.action-btn.delete {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.15);
  transform: translateY(-2px);
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .report-management {
    background: #1e293b;
  }

  .section-header h2 {
    background: linear-gradient(120deg, #818cf8, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .filters-bar {
    background: #0f172a;
    border-color: #334155;
  }

  .search-box input,
  .filter-select {
    background: #1e293b;
    border-color: #334155;
    color: #e2e8f0;
  }

  .report-card {
    background: #1e293b;
    border-color: #334155;
  }

  .report-info h3 {
    color: #e2e8f0;
  }

  .report-info p {
    color: #94a3b8;
  }

  .date-badge {
    background: #0f172a;
    color: #94a3b8;
  }

  .report-stats {
    background: #0f172a;
    border-color: #334155;
  }

  .stat-value {
    color: #e2e8f0;
  }

  .stat-label {
    color: #94a3b8;
  }

  .type-badge.performance {
    background: rgba(129, 140, 248, 0.1);
    color: #818cf8;
  }

  .type-badge.attendance {
    background: rgba(74, 222, 128, 0.1);
    color: #4ade80;
  }

  .type-badge.quiz {
    background: rgba(250, 204, 21, 0.1);
    color: #facc15;
  }

  .type-badge.analytics {
    background: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
  }

  .action-btn.view {
    background: rgba(129, 140, 248, 0.1);
    color: #818cf8;
  }

  .action-btn.view:hover {
    background: rgba(129, 140, 248, 0.15);
  }

  .action-btn.download {
    background: rgba(74, 222, 128, 0.1);
    color: #4ade80;
  }

  .action-btn.download:hover {
    background: rgba(74, 222, 128, 0.15);
  }

  .action-btn.delete {
    background: rgba(248, 113, 113, 0.1);
    color: #f87171;
  }

  .action-btn.delete:hover {
    background: rgba(248, 113, 113, 0.15);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .reports-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .generate-report-btn {
    width: 100%;
    justify-content: center;
  }

  .filters-bar {
    flex-direction: column;
    padding: 12px;
  }

  .filter-group {
    width: 100%;
  }

  .filter-select {
    flex: 1;
    min-width: 0;
  }

  .reports-grid {
    grid-template-columns: 1fr;
  }

  .report-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .action-btn span {
    display: none;
  }

  .action-btn i {
    margin: 0;
    font-size: 1.2rem;
  }
}
</style> 