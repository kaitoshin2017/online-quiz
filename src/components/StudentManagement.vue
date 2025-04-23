<template>
  <div class="student-management">
    <div class="section-header">
      <h2>Student Management</h2>
      <button class="add-student-btn" @click="addNewStudent">
        <i class="fas fa-user-plus"></i> Add New Student
      </button>
    </div>

    <div class="filters-bar">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Search students...">
      </div>
      <div class="filter-group">
        <select v-model="gradeFilter" class="filter-select">
          <option value="all">All Grades</option>
          <option v-for="grade in grades" :key="grade" :value="grade">
            Grade {{ grade }}
          </option>
        </select>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>

    <div class="students-grid">
      <div v-for="student in filteredStudents" :key="student.id" class="student-card">
        <div class="student-header">
          <img :src="student.avatar" :alt="student.name" class="student-avatar">
          <div class="student-info">
            <h3>{{ student.name }}</h3>
            <p>Grade {{ student.grade }}</p>
            <span :class="['status-badge', student.status]">{{ student.status }}</span>
          </div>
        </div>

        <div class="student-stats">
          <div class="stat-item">
            <i class="fas fa-book"></i>
            <div class="stat-info">
              <span class="stat-value">{{ student.courses }}</span>
              <span class="stat-label">Courses</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-chart-line"></i>
            <div class="stat-info">
              <span class="stat-value">{{ student.avgScore }}%</span>
              <span class="stat-label">Avg. Score</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-clock"></i>
            <div class="stat-info">
              <span class="stat-value">{{ student.attendance }}%</span>
              <span class="stat-label">Attendance</span>
            </div>
          </div>
        </div>

        <div class="student-actions">
          <button @click="viewStudentDetails(student)" class="action-btn view">
            <i class="fas fa-eye"></i>
            <span>View</span>
          </button>
          <button @click="editStudent(student)" class="action-btn edit">
            <i class="fas fa-edit"></i>
            <span>Edit</span>
          </button>
          <button @click="deleteStudent(student)" class="action-btn delete">
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
  name: 'StudentManagement',
  data() {
    return {
      searchQuery: '',
      gradeFilter: 'all',
      statusFilter: 'all',
      grades: [9, 10, 11, 12],
      students: [
        {
          id: 1,
          name: 'Alice Johnson',
          grade: 10,
          avatar: 'https://via.placeholder.com/150',
          status: 'active',
          courses: 6,
          avgScore: 92,
          attendance: 95
        },
        // Add more sample data as needed
      ]
    }
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student => {
        if (this.gradeFilter !== 'all' && student.grade !== parseInt(this.gradeFilter)) {
          return false;
        }
        if (this.statusFilter !== 'all' && student.status !== this.statusFilter) {
          return false;
        }
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          return student.name.toLowerCase().includes(query);
        }
        return true;
      });
    }
  },
  methods: {
    addNewStudent() {
      // Implement add student logic
    },
    viewStudentDetails(student) {
      // Implement view details logic
    },
    editStudent(student) {
      // Implement edit logic
    },
    deleteStudent(student) {
      // Implement delete logic
    }
  }
}
</script>

<style scoped>
.student-management {
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

.add-student-btn {
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

.add-student-btn:hover {
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

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}

.student-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.student-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.student-header {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  align-items: center;
}

.student-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4f46e5;
  padding: 3px;
  background: linear-gradient(120deg, #4f46e5, #7c3aed);
  transition: all 0.3s ease;
}

.student-card:hover .student-avatar {
  transform: scale(1.05);
}

.student-info {
  flex: 1;
}

.student-info h3 {
  margin: 0 0 6px 0;
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
}

.student-info p {
  margin: 0 0 10px 0;
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
}

.status-badge {
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.status-badge::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.status-badge.active::before {
  background: #16a34a;
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.status-badge.inactive::before {
  background: #dc2626;
}

.student-stats {
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

.student-card:hover .stat-item i {
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

.student-actions {
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

.action-btn.edit {
  background: rgba(234, 179, 8, 0.1);
  color: #ca8a04;
}

.action-btn.edit:hover {
  background: rgba(234, 179, 8, 0.15);
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
  .student-management {
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

  .student-card {
    background: #1e293b;
    border-color: #334155;
  }

  .student-info h3 {
    color: #e2e8f0;
  }

  .student-info p {
    color: #94a3b8;
  }

  .student-stats {
    background: #0f172a;
    border-color: #334155;
  }

  .stat-value {
    color: #e2e8f0;
  }

  .stat-label {
    color: #94a3b8;
  }

  .action-btn.view {
    background: rgba(129, 140, 248, 0.1);
    color: #818cf8;
  }

  .action-btn.view:hover {
    background: rgba(129, 140, 248, 0.15);
  }

  .action-btn.edit {
    background: rgba(250, 204, 21, 0.1);
    color: #facc15;
  }

  .action-btn.edit:hover {
    background: rgba(250, 204, 21, 0.15);
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
  .students-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .add-student-btn {
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

  .students-grid {
    grid-template-columns: 1fr;
  }

  .student-stats {
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