<template>
  <div class="quiz-management">
    <div class="section-header">
      <h2>Quiz Management</h2>
      <button class="create-quiz-btn" @click="createNewQuiz">
        <i class="fas fa-plus"></i> Create New Quiz
      </button>
    </div>

    <div class="filters-bar">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Search quizzes...">
      </div>
      <div class="filter-group">
        <select v-model="subjectFilter" class="filter-select">
          <option value="all">All Subjects</option>
          <option v-for="subject in subjects" :key="subject" :value="subject">
            {{ subject }}
          </option>
        </select>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>

    <div class="quizzes-grid">
      <div v-for="quiz in filteredQuizzes" :key="quiz.id" class="quiz-card">
        <div class="quiz-header">
          <div class="quiz-title">
            <h3>{{ quiz.title }}</h3>
            <div class="quiz-subject">
              <i :class="getSubjectIcon(quiz.subject)"></i>
              <span>{{ quiz.subject }}</span>
            </div>
          </div>
          <span :class="['status-badge', quiz.status]">{{ quiz.status }}</span>
        </div>

        <div class="quiz-stats">
          <div class="stat-item">
            <i class="fas fa-clock"></i>
            <div class="stat-info">
              <span class="stat-value">{{ quiz.duration }}</span>
              <span class="stat-label">Minutes</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-question-circle"></i>
            <div class="stat-info">
              <span class="stat-value">{{ quiz.questions }}</span>
              <span class="stat-label">Questions</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-users"></i>
            <div class="stat-info">
              <span class="stat-value">{{ quiz.participants }}</span>
              <span class="stat-label">Students</span>
            </div>
          </div>
        </div>

        <div class="quiz-performance">
          <div class="performance-header">
            <h4>Average Performance</h4>
            <span class="average-score">{{ quiz.averageScore }}%</span>
          </div>
          <div class="performance-bar">
            <div class="progress-bar" :style="{ width: quiz.averageScore + '%' }"></div>
          </div>
        </div>

        <div class="quiz-details">
          <div class="detail-item">
            <i class="fas fa-calendar"></i>
            <span>Created: {{ formatDate(quiz.createdAt) }}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>Last updated: {{ formatDate(quiz.updatedAt) }}</span>
          </div>
        </div>

        <div class="quiz-actions">
          <button class="action-btn edit" @click="editQuiz(quiz)">
            <i class="fas fa-edit"></i>
            <span>Edit</span>
          </button>
          <button class="action-btn preview" @click="previewQuiz(quiz)">
            <i class="fas fa-eye"></i>
            <span>Preview</span>
          </button>
          <button class="action-btn delete" @click="deleteQuiz(quiz)">
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
  name: 'QuizManagement',
  data() {
    return {
      searchQuery: '',
      subjectFilter: 'all',
      statusFilter: 'all',
      subjects: ['Mathematics', 'Science', 'English', 'History'],
      quizzes: [
        {
          id: 1,
          title: 'Algebra Fundamentals',
          subject: 'Mathematics',
          status: 'active',
          duration: 45,
          questions: 25,
          participants: 120,
          averageScore: 78,
          createdAt: '2024-03-01',
          updatedAt: '2024-03-15'
        },
        {
          id: 2,
          title: 'Chemical Reactions',
          subject: 'Science',
          status: 'active',
          duration: 60,
          questions: 30,
          participants: 85,
          averageScore: 82,
          createdAt: '2024-03-10',
          updatedAt: '2024-03-14'
        },
        {
          id: 3,
          title: 'World War II',
          subject: 'History',
          status: 'draft',
          duration: 40,
          questions: 20,
          participants: 0,
          averageScore: 0,
          createdAt: '2024-03-16',
          updatedAt: '2024-03-16'
        },
        {
          id: 4,
          title: 'Literature Analysis',
          subject: 'English',
          status: 'archived',
          duration: 50,
          questions: 15,
          participants: 95,
          averageScore: 75,
          createdAt: '2024-02-28',
          updatedAt: '2024-03-10'
        }
      ]
    }
  },
  computed: {
    filteredQuizzes() {
      return this.quizzes.filter(quiz => {
        if (this.subjectFilter !== 'all' && quiz.subject !== this.subjectFilter) {
          return false;
        }
        if (this.statusFilter !== 'all' && quiz.status !== this.statusFilter) {
          return false;
        }
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          return quiz.title.toLowerCase().includes(query) || 
                 quiz.subject.toLowerCase().includes(query);
        }
        return true;
      });
    }
  },
  methods: {
    getSubjectIcon(subject) {
      const icons = {
        'Mathematics': 'fas fa-square-root-alt',
        'Science': 'fas fa-flask',
        'English': 'fas fa-book',
        'History': 'fas fa-landmark'
      }
      return icons[subject] || 'fas fa-book'
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
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
    }
  }
}
</script>

<style scoped>
.quiz-management {
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

.create-quiz-btn {
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

.create-quiz-btn:hover {
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

.quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}

.quiz-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.quiz-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.quiz-title {
  flex: 1;
}

.quiz-title h3 {
  margin: 0 0 8px 0;
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
}

.quiz-subject {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.95rem;
}

.quiz-subject i {
  color: #4f46e5;
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

.status-badge.draft {
  background: rgba(234, 179, 8, 0.1);
  color: #ca8a04;
}

.status-badge.draft::before {
  background: #ca8a04;
}

.status-badge.archived {
  background: rgba(100, 116, 139, 0.1);
  color: #64748b;
}

.status-badge.archived::before {
  background: #64748b;
}

.quiz-stats {
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

.quiz-card:hover .stat-item i {
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

.quiz-performance {
  margin-bottom: 20px;
}

.performance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.performance-header h4 {
  margin: 0;
  font-size: 1rem;
  color: #1e293b;
  font-weight: 600;
}

.average-score {
  font-size: 1.1rem;
  font-weight: 700;
  color: #4f46e5;
}

.performance-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(120deg, #4f46e5, #7c3aed);
  border-radius: 4px;
  transition: width 0.6s ease;
}

.quiz-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.9rem;
}

.detail-item i {
  color: #4f46e5;
  font-size: 1rem;
}

.quiz-actions {
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

.action-btn.edit {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.action-btn.edit:hover {
  background: rgba(79, 70, 229, 0.15);
  transform: translateY(-2px);
}

.action-btn.preview {
  background: rgba(234, 179, 8, 0.1);
  color: #ca8a04;
}

.action-btn.preview:hover {
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
  .quiz-management {
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

  .quiz-card {
    background: #1e293b;
    border-color: #334155;
  }

  .quiz-title h3 {
    color: #e2e8f0;
  }

  .quiz-subject {
    color: #94a3b8;
  }

  .quiz-stats,
  .quiz-details {
    background: #0f172a;
    border-color: #334155;
  }

  .stat-value {
    color: #e2e8f0;
  }

  .stat-label,
  .detail-item {
    color: #94a3b8;
  }

  .performance-header h4 {
    color: #e2e8f0;
  }

  .performance-bar {
    background: #334155;
  }

  .action-btn.edit {
    background: rgba(129, 140, 248, 0.1);
    color: #818cf8;
  }

  .action-btn.edit:hover {
    background: rgba(129, 140, 248, 0.15);
  }

  .action-btn.preview {
    background: rgba(250, 204, 21, 0.1);
    color: #facc15;
  }

  .action-btn.preview:hover {
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
  .quizzes-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .create-quiz-btn {
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

  .quizzes-grid {
    grid-template-columns: 1fr;
  }

  .quiz-stats {
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