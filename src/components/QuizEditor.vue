<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../services/api';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'QuizEditor',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const quiz = ref({
      title: '',
      description: '',
      subject: '',
      duration: 30,
      questions: []
    });
    const isLoading = ref(false);
    const error = ref('');
    const isEditing = ref(false);
    const authStore = useAuthStore();
    const subjects = ref([
      'Mathematics',
      'Science',
      'English',
      'History',
      'Geography',
      'Computer Science',
      'Art',
      'Music',
      'Physical Education'
    ]);

    onMounted(async () => {
      if (route.params.id) {
        isEditing.value = true;
        await fetchQuiz();
      } else {
        // Initialize with one empty question for new quizzes
        addQuestion();
      }
    });

    const fetchQuiz = async () => {
      try {
        isLoading.value = true;
        const response = await api.get(`/quizzes/${route.params.id}`);
        quiz.value = response.data;
      } catch (err) {
        error.value = 'Failed to fetch quiz details';
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    const addQuestion = () => {
      quiz.value.questions.push({
        text: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1
      });
    };

    const handleTypeChange = (qIndex) => {
      const question = quiz.value.questions[qIndex];
      if (question.type === 'multiple-choice') {
        question.options = ['', '', '', ''];
        question.correctAnswer = 0;
      } else if (question.type === 'true-false') {
        question.correctAnswer = 'true';
      } else if (question.type === 'short-answer') {
        question.correctAnswer = '';
      }
    };

    const addOption = (questionIndex) => {
      if (quiz.value.questions[questionIndex].options.length < 6) {
        quiz.value.questions[questionIndex].options.push('');
      }
    };

    const removeOption = (questionIndex, optionIndex) => {
      if (quiz.value.questions[questionIndex].options.length > 2) {
        quiz.value.questions[questionIndex].options.splice(optionIndex, 1);
        if (quiz.value.questions[questionIndex].correctAnswer === optionIndex) {
          quiz.value.questions[questionIndex].correctAnswer = 0;
        } else if (quiz.value.questions[questionIndex].correctAnswer > optionIndex) {
          quiz.value.questions[questionIndex].correctAnswer--;
        }
      }
    };

    const removeQuestion = (index) => {
      if (quiz.value.questions.length > 1) {
        quiz.value.questions.splice(index, 1);
      } else {
        error.value = 'A quiz must have at least one question';
      }
    };

    const validateQuiz = () => {
      if (!quiz.value.title?.trim()) {
        error.value = 'Quiz title is required';
        return false;
      }
      if (!quiz.value.description?.trim()) {
        error.value = 'Quiz description is required';
        return false;
      }
      if (!quiz.value.subject) {
        error.value = 'Subject is required';
        return false;
      }
      if (quiz.value.questions.length === 0) {
        error.value = 'At least one question is required';
        return false;
      }

      for (let i = 0; i < quiz.value.questions.length; i++) {
        const question = quiz.value.questions[i];
        if (!question.text?.trim()) {
          error.value = `Question ${i + 1} text is required`;
          return false;
        }
        if (!question.points || question.points < 1) {
          error.value = `Question ${i + 1} must have at least 1 point`;
          return false;
        }

        if (question.type === 'multiple-choice') {
          if (question.options.length < 2) {
            error.value = `Question ${i + 1} must have at least 2 options`;
            return false;
          }
          if (question.options.some(opt => !opt?.trim())) {
            error.value = `Question ${i + 1} has empty options`;
            return false;
          }
        } else if (question.type === 'true-false') {
          if (question.correctAnswer !== 'true' && question.correctAnswer !== 'false') {
            error.value = `Question ${i + 1} must have a correct answer selected`;
            return false;
          }
        } else if (question.type === 'short-answer') {
          if (!question.correctAnswer?.trim()) {
            error.value = `Question ${i + 1} must have a correct answer`;
            return false;
          }
        }
      }

      return true;
    };

    const saveQuiz = async () => {
      if (!validateQuiz()) return;

      try {
        isLoading.value = true;
        error.value = '';

        // Format the quiz data according to API requirements
        const quizData = {
          title: quiz.value.title.trim(),
          description: quiz.value.description.trim(),
          duration: parseInt(quiz.value.duration),
          questions: quiz.value.questions.map(q => {
            // Base question structure
            const formattedQuestion = {
              text: q.text.trim(),
              points: parseInt(q.points),
              options: q.type === 'multiple-choice' ? q.options.map(opt => opt.trim()) : ['True', 'False'],
              correctAnswer: q.type === 'multiple-choice' ? parseInt(q.correctAnswer) : 
                           q.type === 'true-false' ? (q.correctAnswer === 'true' ? 0 : 1) : 0
            };

            return formattedQuestion;
          })
        };

        console.log('Sending quiz data:', quizData); // For debugging

        if (isEditing.value) {
          await api.put(`/quizzes/${route.params.id}`, quizData);
        } else {
          await api.post('/quizzes/create', quizData);
        }

        router.push('/admin-panel?tab=quizzes');
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to save quiz';
        console.error('Quiz save error:', err.response?.data || err);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      quiz,
      isLoading,
      error,
      isEditing,
      subjects,
      addQuestion,
      addOption,
      removeOption,
      removeQuestion,
      handleTypeChange,
      saveQuiz
    };
  }
};
</script>

<template>
  <div class="quiz-editor">
    <div class="header">
      <h1>{{ isEditing ? 'Edit Quiz' : 'Create New Quiz' }}</h1>
      <button class="back-button" @click="$router.push('/admin-panel?tab=quizzes')">
        <i class="fas fa-arrow-left"></i> Back to Quizzes
      </button>
    </div>

    <div class="quiz-form" v-if="!isLoading">
      <div class="form-section">
        <h2>Quiz Details</h2>
        <div class="form-grid">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              v-model="quiz.title"
              placeholder="Enter quiz title"
              required
            />
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <select id="subject" v-model="quiz.subject" required>
              <option value="">Select Subject</option>
              <option v-for="subject in subjects" :key="subject" :value="subject">
                {{ subject }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="duration">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              v-model="quiz.duration"
              min="1"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="quiz.description"
            placeholder="Enter quiz description"
            rows="3"
            required
          ></textarea>
        </div>
      </div>

      <div class="form-section">
        <div class="section-header">
          <h2>Questions</h2>
          <button class="add-button" @click="addQuestion">
            <i class="fas fa-plus"></i> Add Question
          </button>
        </div>

        <div class="questions-list">
          <div v-for="(question, qIndex) in quiz.questions" :key="qIndex" class="question-card">
            <div class="question-header">
              <span class="question-number">Q{{ qIndex + 1 }}</span>
              <button class="delete-button" @click="removeQuestion(qIndex)">
                <i class="fas fa-trash"></i>
              </button>
            </div>

            <div class="form-group">
              <label :for="'question-' + qIndex">Question Text</label>
              <input
                :id="'question-' + qIndex"
                type="text"
                v-model="question.text"
                placeholder="Enter question text"
                required
              />
            </div>

            <div class="form-group">
              <label :for="'type-' + qIndex">Question Type</label>
              <select :id="'type-' + qIndex" v-model="question.type" @change="handleTypeChange(qIndex)">
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
              </select>
            </div>

            <div class="form-group">
              <label :for="'points-' + qIndex">Points</label>
              <input
                :id="'points-' + qIndex"
                type="number"
                v-model="question.points"
                min="1"
                required
              />
            </div>

            <!-- Multiple Choice Options -->
            <div v-if="question.type === 'multiple-choice'" class="options-section">
              <div class="options-header">
                <h3>Options</h3>
                <button 
                  class="add-option-button" 
                  @click="addOption(qIndex)"
                  v-if="question.options.length < 6"
                >
                  <i class="fas fa-plus"></i> Add Option
                </button>
              </div>
              <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-item">
                <input
                  type="radio"
                  :name="'correct-' + qIndex"
                  :value="oIndex"
                  v-model="question.correctAnswer"
                />
                <input
                  type="text"
                  v-model="question.options[oIndex]"
                  placeholder="Enter option text"
                  required
                />
                <button 
                  class="remove-option-button"
                  @click="removeOption(qIndex, oIndex)"
                  v-if="question.options.length > 2"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <!-- True/False Options -->
            <div v-if="question.type === 'true-false'" class="true-false-options">
              <div class="option-item">
                <input
                  type="radio"
                  :name="'correct-' + qIndex"
                  value="true"
                  v-model="question.correctAnswer"
                />
                <span>True</span>
              </div>
              <div class="option-item">
                <input
                  type="radio"
                  :name="'correct-' + qIndex"
                  value="false"
                  v-model="question.correctAnswer"
                />
                <span>False</span>
              </div>
            </div>

            <!-- Short Answer -->
            <div v-if="question.type === 'short-answer'" class="short-answer-section">
              <div class="form-group">
                <label :for="'answer-' + qIndex">Correct Answer</label>
                <input
                  :id="'answer-' + qIndex"
                  type="text"
                  v-model="question.correctAnswer"
                  placeholder="Enter correct answer"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="cancel-button" @click="$router.push('/admin-panel?tab=quizzes')">Cancel</button>
        <button class="save-button" @click="saveQuiz" :disabled="isLoading">
          {{ isEditing ? 'Update Quiz' : 'Create Quiz' }}
        </button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>

    <div v-else class="loading">
      <i class="fas fa-spinner fa-spin"></i> Loading...
    </div>
  </div>
</template>

<style scoped>
.quiz-editor {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.header h1 {
  margin: 0;
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(120deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.back-button {
  background: #f1f5f9;
  color: #64748b;
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
}

.back-button:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.form-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #1e293b;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  color: #1e293b;
  background: #fff;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.question-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.question-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.question-number {
  display: flex;
  align-items: center;
  gap: 12px;
}

.number {
  width: 32px;
  height: 32px;
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.question-number h4 {
  margin: 0;
  color: #1e293b;
  font-size: 1.1rem;
}

.delete-button {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-button:hover {
  background: #fecaca;
}

.options-section,
.true-false-options,
.short-answer-section {
  margin-top: 20px;
}

.options-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.option-item {
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.option-input {
  display: flex;
  align-items: center;
  gap: 12px;
}

.option-input input[type="radio"] {
  width: 20px;
  height: 20px;
}

.option-input input[type="text"] {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
}

.true-false-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.true-false-options .option-item {
  text-align: center;
  padding: 16px;
  cursor: pointer;
}

.true-false-options .option-item.selected {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.add-button,
.add-option-button {
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

.add-button:hover,
.add-option-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
}

.remove-option-button {
  background: none;
  border: none;
  color: #64748b;
  padding: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-option-button:hover:not(:disabled) {
  color: #ef4444;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}

.cancel-button,
.save-button {
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.cancel-button {
  background: #f1f5f9;
  color: #64748b;
  border: none;
}

.cancel-button:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.save-button {
  background: linear-gradient(120deg, #4f46e5, #7c3aed);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.save-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  padding: 16px;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.error-message i {
  font-size: 1.2rem;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #64748b;
}

.loading i {
  margin-right: 12px;
  font-size: 1.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .quiz-editor {
    background: #1e293b;
  }

  .header h1 {
    background: linear-gradient(120deg, #818cf8, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .back-button {
    background: #0f172a;
    color: #94a3b8;
  }

  .back-button:hover {
    background: #1e293b;
    color: #e2e8f0;
  }

  .form-section {
    background: #0f172a;
    border-color: #334155;
  }

  .section-header h2 {
    color: #e2e8f0;
  }

  .form-group label {
    color: #e2e8f0;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    background: #1e293b;
    border-color: #334155;
    color: #e2e8f0;
  }

  .question-card {
    background: #1e293b;
    border-color: #334155;
  }

  .question-number h4 {
    color: #e2e8f0;
  }

  .option-item {
    background: #0f172a;
    border-color: #334155;
  }

  .option-input input[type="text"] {
    background: #1e293b;
    border-color: #334155;
    color: #e2e8f0;
  }

  .true-false-options .option-item.selected {
    background: #818cf8;
    border-color: #818cf8;
  }

  .error-message {
    background: rgba(248, 113, 113, 0.1);
    color: #f87171;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .quiz-editor {
    padding: 20px;
  }

  .header {
    flex-direction: column;
    gap: 16px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .true-false-options {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-button,
  .save-button {
    width: 100%;
    justify-content: center;
  }
}
</style> 