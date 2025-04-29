<template>
  <div class="quiz-management">
    <div class="section-header">
      <div class="header-content">
        <h2>
          <i class="fas fa-book-reader"></i>
          Quiz Management
        </h2>
        <p class="subtitle">Create and manage your quizzes</p>
      </div>
      <button class="create-quiz-btn primary-btn" @click="createNewQuiz" :disabled="isLoading">
        <i class="fas fa-plus"></i>
        <span>{{ isLoading ? 'Creating...' : 'Create New Quiz' }}</span>
        <div class="btn-background"></div>
      </button>
    </div>

    <div v-if="error" class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      {{ error }}
      <button class="retry-btn" @click="fetchQuizzes" :disabled="isLoading">
        <i class="fas fa-sync-alt"></i> Retry
      </button>
    </div>

    <div v-if="isLoading && !quizzes.length" class="loading-state">
      <div class="loading-animation">
        <div class="spinner"></div>
      </div>
      <p>Loading your quizzes...</p>
    </div>

    <div v-else-if="!quizzes.length && !error" class="empty-state">
      <div class="empty-state-content">
        <i class="fas fa-clipboard-list"></i>
        <h3>No quizzes yet</h3>
        <p>Start by creating your first quiz</p>
        <button class="create-quiz-btn primary-btn" @click="createNewQuiz" :disabled="isLoading">
          <i class="fas fa-plus"></i>
          <span>Create Your First Quiz</span>
          <div class="btn-background"></div>
        </button>
      </div>
    </div>

    <template v-else>
      <div class="filters-bar">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search quizzes..."
            class="search-input"
          >
        </div>
        <div class="filter-group">
          <div class="select-wrapper">
            <i class="fas fa-book"></i>
            <select v-model="subjectFilter" class="filter-select">
              <option value="all">All Subjects</option>
              <option v-for="subject in subjects" :key="subject" :value="subject">
                {{ subject }}
              </option>
            </select>
          </div>
          <div class="select-wrapper">
            <i class="fas fa-filter"></i>
            <select v-model="statusFilter" class="filter-select">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div class="quizzes-grid">
        <div v-for="quiz in filteredQuizzes" 
             :key="quiz.id" 
             class="quiz-card"
             :class="{ 'status-draft': quiz.status === 'draft' }">
          <div class="quiz-header">
            <div class="quiz-title">
              <h3>{{ quiz.title }}</h3>
              <div class="quiz-subject">
                <i :class="getSubjectIcon(quiz.subject)"></i>
                <span>{{ quiz.subject }}</span>
              </div>
            </div>
            <span :class="['status-badge', quiz.status]">
              <i class="fas" :class="getStatusIcon(quiz.status)"></i>
              {{ quiz.status }}
            </span>
          </div>

          <div class="quiz-stats">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ quiz.duration }}</span>
                <span class="stat-label">Minutes</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-question-circle"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ quiz.questions.length }}</span>
                <span class="stat-label">Questions</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
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
              <div class="progress-bar" 
                   :style="{ width: quiz.averageScore + '%' }"
                   :class="getPerformanceClass(quiz.averageScore)">
              </div>
            </div>
          </div>

          <div class="quiz-details">
            <div class="detail-item">
              <i class="fas fa-calendar"></i>
              <span>Created: {{ formatDate(quiz.createdAt) }}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-clock"></i>
              <span>Updated: {{ formatDate(quiz.updatedAt) }}</span>
            </div>
          </div>

          <div class="quiz-actions">
            <button class="action-btn edit" @click="editQuiz(quiz)" title="Edit Quiz">
              <i class="fas fa-edit"></i>
              <span>Edit</span>
            </button>
            <button class="action-btn preview" @click="previewQuiz(quiz)" title="Preview Quiz">
              <i class="fas fa-eye"></i>
              <span>Preview</span>
            </button>
            <button class="action-btn delete" @click="deleteQuiz(quiz)" title="Delete Quiz">
              <i class="fas fa-trash"></i>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'QuizManagement',
  props: {
    quizzes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      subjectFilter: 'all',
      statusFilter: 'all',
      subjects: ['Mathematics', 'Science', 'English', 'History'],
      isLoading: false,
      error: null
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
  async created() {
    console.log('QuizManagement created, initial quizzes:', this.quizzes);
    if (!this.quizzes || this.quizzes.length === 0) {
      await this.fetchQuizzes();
    }
  },
  methods: {
    async fetchQuizzes() {
      try {
        this.isLoading = true;
        this.error = null;
        console.log('Fetching quizzes...');
        const response = await api.get('/quizzes');
        console.log('API response:', response);
        
        if (response && response.data) {
          const formattedQuizzes = response.data.map(quiz => ({
            ...quiz,
            id: quiz._id || quiz.id, // Ensure we have an id
            participants: quiz.participants || 0,
            averageScore: quiz.averageScore || 0,
            status: quiz.status || 'draft',
            questions: quiz.questions || [],
            createdAt: quiz.createdAt || new Date().toISOString(),
            updatedAt: quiz.updatedAt || new Date().toISOString()
          }));
          
          console.log('Formatted quizzes:', formattedQuizzes);
          this.$emit('update:quizzes', formattedQuizzes);
        } else {
          throw new Error('Invalid response format from API');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        this.error = 'Failed to fetch quizzes. Please check your connection and try again.';
      } finally {
        this.isLoading = false;
      }
    },
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
    async createNewQuiz() {
      try {
        this.isLoading = true;
        this.error = null;
        const newQuiz = {
          title: 'New Quiz',
          description: '',
          duration: 30,
          subject: this.subjects[0],
          status: 'draft',
          questions: [{
            text: 'Sample Question',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: 0,
            points: 1
          }]
        };
        
        console.log('Creating new quiz...');
        const response = await api.post('/quizzes/create', newQuiz);
        console.log('Quiz created:', response.data);
        
        const updatedQuiz = {
          ...response.data,
          participants: 0,
          averageScore: 0,
          status: 'draft',
          questions: response.data.questions || newQuiz.questions
        };
        
        console.log('Emitting quiz update...');
        this.$emit('update:quizzes', [...this.quizzes, updatedQuiz]);
        
        // Wait a moment to ensure the parent component updates
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('Navigating to edit page...');
        this.$router.push(`/quiz/edit/${response.data._id}`);
      } catch (error) {
        console.error('Error creating quiz:', error);
        this.error = 'Failed to create quiz. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
    async editQuiz(quiz) {
      this.$router.push({ name: 'quiz-edit', params: { id: quiz._id }});
    },
    async previewQuiz(quiz) {
      this.$router.push(`/quiz/preview/${quiz._id}`);
    },
    async deleteQuiz(quiz) {
      if (confirm('Are you sure you want to delete this quiz?')) {
        try {
          this.isLoading = true;
          this.error = null;
          await api.delete(`/quizzes/${quiz._id}`);
          this.$emit('update:quizzes', this.quizzes.filter(q => q._id !== quiz._id));
        } catch (error) {
          this.error = 'Failed to delete quiz. Please try again.';
          console.error('Error deleting quiz:', error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    getStatusIcon(status) {
      const icons = {
        'active': 'fa-check-circle',
        'draft': 'fa-pencil-alt',
        'archived': 'fa-archive'
      };
      return icons[status] || 'fa-circle';
    },
    getPerformanceClass(score) {
      if (score >= 80) return 'performance-excellent';
      if (score >= 60) return 'performance-good';
      if (score >= 40) return 'performance-average';
      return 'performance-needs-improvement';
    }
  }
}
</script>

<style scoped>
/* Enhanced Base Styles */
.quiz-management {
  background: #ffffff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

/* Enhanced Header Styles */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #f1f5f9;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-header h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1e293b;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.section-header h2 i {
  color: #4f46e5;
  font-size: 1.8rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

/* Enhanced Button Styles */
.primary-btn {
  position: relative;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.primary-btn .btn-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
}

.primary-btn:hover .btn-background {
  opacity: 1;
}

.primary-btn i, .primary-btn span {
  position: relative;
  z-index: 1;
}

/* Enhanced Search and Filter Styles */
.filters-bar {
  background: #f8fafc;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 32px;
  display: flex;
  gap: 24px;
  align-items: center;
  border: 2px solid #e2e8f0;
}

.search-box {
  flex: 1;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 14px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: #ffffff;
  transition: all 0.3s ease;
}

.search-box i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 1.2rem;
}

.select-wrapper {
  position: relative;
  min-width: 200px;
}

.select-wrapper i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  z-index: 1;
}

.filter-select {
  width: 100%;
  padding: 14px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  background: #ffffff;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease;
}

/* Enhanced Quiz Card Styles */
.quiz-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.quiz-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  border-color: #4f46e5;
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.active {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.draft {
  background: #fef9c3;
  color: #ca8a04;
}

.status-badge.archived {
  background: #e2e8f0;
  color: #64748b;
}

/* Enhanced Stats Styles */
.quiz-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 16px;
  margin: 24px 0;
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-icon i {
  font-size: 1.4rem;
  color: #4f46e5;
}

.quiz-card:hover .stat-icon {
  transform: scale(1.1);
  background: rgba(79, 70, 229, 0.15);
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

/* Enhanced Performance Bar Styles */
.performance-bar {
  height: 10px;
  background: #e2e8f0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 12px;
}

.progress-bar {
  height: 100%;
  border-radius: 5px;
  transition: width 1s ease-in-out;
}

.performance-excellent {
  background: linear-gradient(135deg, #22c55e, #16a34a);
}

.performance-good {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.performance-average {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.performance-needs-improvement {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

/* Enhanced Action Buttons */
.quiz-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.action-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
}

.action-btn.edit {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.action-btn.edit:hover {
  background: rgba(79, 70, 229, 0.15);
}

.action-btn.preview {
  background: rgba(234, 179, 8, 0.1);
  color: #ca8a04;
}

.action-btn.preview:hover {
  background: rgba(234, 179, 8, 0.15);
}

.action-btn.delete {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.15);
}

/* Enhanced Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  text-align: center;
}

.loading-animation {
  margin-bottom: 24px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Enhanced Empty State */
.empty-state {
  text-align: center;
  padding: 48px;
  background: #f8fafc;
  border-radius: 20px;
  border: 2px dashed #e2e8f0;
}

.empty-state-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-state i {
  font-size: 3.5rem;
  color: #4f46e5;
  margin-bottom: 24px;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 12px;
}

.empty-state p {
  color: #64748b;
  margin-bottom: 24px;
}

/* Dark Mode Enhancements */
@media (prefers-color-scheme: dark) {
  .quiz-management {
    background: #1e293b;
  }

  .section-header {
    border-bottom-color: #334155;
  }

  .section-header h2 {
    color: #f1f5f9;
  }

  .subtitle {
    color: #94a3b8;
  }

  .filters-bar {
    background: #0f172a;
    border-color: #334155;
  }

  .search-input,
  .filter-select {
    background: #1e293b;
    border-color: #334155;
    color: #e2e8f0;
  }

  .quiz-card {
    background: #1e293b;
    border-color: #334155;
  }

  .quiz-stats {
    background: #0f172a;
  }

  .stat-icon {
    background: rgba(129, 140, 248, 0.1);
  }

  .stat-icon i {
    color: #818cf8;
  }

  .empty-state {
    background: #0f172a;
    border-color: #334155;
  }

  .empty-state h3 {
    color: #f1f5f9;
  }

  .empty-state p {
    color: #94a3b8;
  }

  .performance-bar {
    background: #334155;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .filters-bar {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .quiz-management {
    padding: 20px;
  }

  .section-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .filter-group {
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 