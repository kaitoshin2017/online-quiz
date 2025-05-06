<template>
  <div class="teacher-panel">
    <div class="sidebar" :class="{ active: isSidebarOpen }">
      <div class="logo">
        <Logo />
      </div>
      <nav>
        <ul>
          <li @click="activeTab = 'dashboard'" :class="{ active: activeTab === 'dashboard' }">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </li>
          <li @click="activeTab = 'quizzes'" :class="{ active: activeTab === 'quizzes' }">
            <i class="fas fa-question-circle"></i>
            <span>Quizzes</span>
          </li>
          <li @click="activeTab = 'students'" :class="{ active: activeTab === 'students' }">
            <i class="fas fa-users"></i>
            <span>Students</span>
          </li>
          <li @click="activeTab = 'results'" :class="{ active: activeTab === 'results' }">
            <i class="fas fa-chart-bar"></i>
            <span>Results</span>
          </li>
          <li @click="activeTab = 'settings'" :class="{ active: activeTab === 'settings' }">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </div>

    <button class="mobile-menu-btn" @click="toggleSidebar" aria-label="Toggle Menu">
      <i class="fas fa-bars"></i>
    </button>

    <div class="main-content">
      <div class="header">
        <div class="header-left">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search..." v-model="searchQuery">
          </div>
          <div class="notifications">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">3</span>
          </div>
        </div>
        <div class="user-profile">
          <div class="user-info">
            <span class="welcome-text">Welcome back,</span>
            <span class="user-name">{{ teacherName }}</span>
          </div>
          <div class="avatar-container">
            <img :src="teacherAvatar" alt="Teacher Avatar" class="avatar">
            <div class="status-indicator"></div>
          </div>
        </div>
      </div>

      <div class="content">
        <!-- Dashboard Tab -->
        <div v-if="activeTab === 'dashboard'" class="dashboard">
          <div class="page-header">
            <h2>Dashboard Overview</h2>
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
                <i class="fas fa-question-circle"></i>
              </div>
              <div class="stat-info">
                <h3>Total Quizzes</h3>
                <p>{{ totalQuizzes }}</p>
                <span class="trend positive">+12% from last month</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-info">
                <h3>Active Students</h3>
                <p>{{ activeStudents }}</p>
                <span class="trend positive">+5% from last month</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="stat-info">
                <h3>Average Score</h3>
                <p>{{ averageScore }}%</p>
                <span class="trend positive">+3% from last month</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="stat-info">
                <h3>Pending Reviews</h3>
                <p>{{ pendingReviews }}</p>
                <span class="trend negative">-2% from last month</span>
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
                <button class="action-btn" @click="createNewQuiz">
                  <i class="fas fa-plus"></i>
                  <span>Create Quiz</span>
                </button>
                <button class="action-btn">
                  <i class="fas fa-user-plus"></i>
                  <span>Add Student</span>
                </button>
                <button class="action-btn">
                  <i class="fas fa-file-export"></i>
                  <span>Export Results</span>
                </button>
                <button class="action-btn">
                  <i class="fas fa-cog"></i>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quizzes Tab -->
        <div v-if="activeTab === 'quizzes'" class="quizzes">
          <div class="quizzes-header">
            <h2>Manage Quizzes</h2>
            <button class="create-quiz-btn" @click="createNewQuiz">
              <i class="fas fa-plus"></i> Create New Quiz
            </button>
          </div>
          <div class="quizzes-grid">
            <div v-for="quiz in quizzes" :key="quiz.id" class="quiz-card">
              <h3>{{ quiz.title }}</h3>
              <p>{{ quiz.description }}</p>
              <div class="quiz-stats">
                <span><i class="fas fa-users"></i> {{ quiz.participants }}</span>
                <span><i class="fas fa-clock"></i> {{ quiz.duration }}min</span>
              </div>
              <div class="quiz-actions">
                <button @click="editQuiz(quiz)">Edit</button>
                <button @click="deleteQuiz(quiz)">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Students Tab -->
        <div v-if="activeTab === 'students'" class="students">
          <h2>Student Management</h2>
          <div class="students-list">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Quizzes Taken</th>
                  <th>Average Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student.id">
                  <td>{{ student.name }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.quizzesTaken }}</td>
                  <td>{{ student.averageScore }}%</td>
                  <td>
                    <span :class="['status', student.status]">{{ student.status }}</span>
                  </td>
                  <td>
                    <button @click="viewStudentDetails(student)">View</button>
                    <button @click="editStudent(student)">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Results Tab -->
        <div v-if="activeTab === 'results'" class="results">
          <h2>Quiz Results</h2>
          <div class="results-filters">
            <select v-model="selectedQuiz">
              <option value="">Select Quiz</option>
              <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
                {{ quiz.title }}
              </option>
            </select>
            <select v-model="timeRange">
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
          <div class="results-chart">
            <!-- Chart component will be added here -->
          </div>
          <div class="results-table">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Score</th>
                  <th>Time Taken</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="result in quizResults" :key="result.id">
                  <td>{{ result.studentName }}</td>
                  <td>{{ result.score }}%</td>
                  <td>{{ result.timeTaken }}min</td>
                  <td>{{ result.date }}</td>
                  <td>
                    <span :class="['status', result.status]">{{ result.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'" class="settings">
          <div class="section-header">
            <h2>Settings</h2>
            <button class="save-settings-btn" @click="saveSettings">
              <i class="fas fa-save"></i> Save Changes
            </button>
          </div>

          <div class="settings-grid">
            <!-- Profile Settings -->
            <div class="settings-card">
              <div class="settings-card-header">
                <i class="fas fa-user-circle"></i>
                <h3>Profile Settings</h3>
              </div>
              <div class="settings-card-content">
                <div class="form-group">
                  <label>Profile Picture</label>
                  <div class="avatar-upload">
                    <img :src="teacherAvatar" alt="Profile Picture" class="preview-avatar">
                    <button class="upload-btn">
                      <i class="fas fa-camera"></i>
                      Change Photo
                    </button>
                  </div>
                </div>
                <div class="form-group">
                  <label>Full Name</label>
                  <input type="text" v-model="teacherName" placeholder="Enter your full name">
                </div>
                <div class="form-group">
                  <label>Email Address</label>
                  <input type="email" v-model="teacherEmail" placeholder="Enter your email">
                </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <input type="tel" v-model="teacherPhone" placeholder="Enter your phone number">
                </div>
              </div>
            </div>

            <!-- Notification Settings -->
            <div class="settings-card">
              <div class="settings-card-header">
                <i class="fas fa-bell"></i>
                <h3>Notification Settings</h3>
              </div>
              <div class="settings-card-content">
                <div class="toggle-group">
                  <div class="toggle-item">
                    <div class="toggle-info">
                      <h4>Email Notifications</h4>
                      <p>Receive email updates about quiz submissions</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" v-model="notifications.email">
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                  <div class="toggle-item">
                    <div class="toggle-info">
                      <h4>Quiz Results</h4>
                      <p>Get notified when students complete quizzes</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" v-model="notifications.quizResults">
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                  <div class="toggle-item">
                    <div class="toggle-info">
                      <h4>Student Activity</h4>
                      <p>Receive updates about student progress</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" v-model="notifications.studentActivity">
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quiz Preferences -->
            <div class="settings-card">
              <div class="settings-card-header">
                <i class="fas fa-sliders-h"></i>
                <h3>Quiz Preferences</h3>
              </div>
              <div class="settings-card-content">
                <div class="form-group">
                  <label>Default Quiz Duration (minutes)</label>
                  <input type="number" v-model="quizPreferences.defaultDuration" min="5" max="180">
                </div>
                <div class="form-group">
                  <label>Questions Per Page</label>
                  <select v-model="quizPreferences.questionsPerPage">
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                    <option value="15">15 Questions</option>
                    <option value="all">All Questions</option>
                  </select>
                </div>
                <div class="toggle-group">
                  <div class="toggle-item">
                    <div class="toggle-info">
                      <h4>Show Timer</h4>
                      <p>Display countdown timer during quizzes</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" v-model="quizPreferences.showTimer">
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                  <div class="toggle-item">
                    <div class="toggle-info">
                      <h4>Randomize Questions</h4>
                      <p>Shuffle questions for each student</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" v-model="quizPreferences.randomizeQuestions">
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Theme Settings -->
            <div class="settings-card">
              <div class="settings-card-header">
                <i class="fas fa-paint-brush"></i>
                <h3>Theme Settings</h3>
              </div>
              <div class="settings-card-content">
                <div class="form-group">
                  <label>Color Theme</label>
                  <div class="theme-options">
                    <button 
                      v-for="theme in themes" 
                      :key="theme.name"
                      :class="['theme-btn', { active: currentTheme === theme.name }]"
                      :style="{ background: theme.color }"
                      @click="setTheme(theme.name)">
                    </button>
                  </div>
                </div>
                <div class="toggle-group">
                  <div class="toggle-item">
                    <div class="toggle-info">
                      <h4>Dark Mode</h4>
                      <p>Switch between light and dark themes</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" v-model="themePreferences.darkMode">
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quiz Modal -->
    <div v-if="showQuizModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Create New Quiz</h3>
          <button @click="showQuizModal = false" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>Quiz Title</label>
            <input type="text" v-model="newQuiz.title" placeholder="Enter quiz title">
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="newQuiz.description" placeholder="Enter quiz description"></textarea>
          </div>
          
          <div class="form-group">
            <label>Duration (minutes)</label>
            <input type="number" v-model="newQuiz.duration" min="1">
          </div>
          
          <div class="questions-section">
            <h4>Questions</h4>
            
            <div class="current-question">
              <div class="form-group">
                <label>Question Text</label>
                <input type="text" v-model="currentQuestion.text" placeholder="Enter question">
              </div>
              
              <div class="form-group">
                <label>Options</label>
                <div v-for="(option, index) in currentQuestion.options" :key="index" class="option-input">
                  <input type="radio" v-model="currentQuestion.correctAnswer" :value="index">
                  <input type="text" v-model="currentQuestion.options[index]" :placeholder="'Option ' + (index + 1)">
                </div>
              </div>
              
              <div class="form-group">
                <label>Points</label>
                <input type="number" v-model="currentQuestion.points" min="1">
              </div>
              
              <button @click="addQuestion" class="add-question-btn">
                <i class="fas fa-plus"></i> Add Question
              </button>
            </div>
            
            <div class="added-questions">
              <div v-for="(question, index) in newQuiz.questions" :key="index" class="question-item">
                <div class="question-header">
                  <span>{{ question.text }}</span>
                  <button @click="removeQuestion(index)" class="remove-btn">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="question-options">
                  <div v-for="(option, optIndex) in question.options" :key="optIndex" 
                       :class="['option', { 'correct': optIndex === question.correctAnswer }]">
                    {{ option }}
                  </div>
                </div>
                <div class="question-points">
                  Points: {{ question.points }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="showQuizModal = false" class="cancel-btn">Cancel</button>
          <button @click="saveQuiz" class="save-btn" :disabled="newQuiz.questions.length === 0">
            Save Quiz
          </button>
        </div>
      </div>
    </div>

    <!-- Student Modal -->
    <div v-if="showStudentModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Student</h3>
          <button @click="showStudentModal = false" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" v-model="newStudent.firstName" placeholder="Enter first name">
          </div>
          
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" v-model="newStudent.lastName" placeholder="Enter last name">
          </div>
          
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" v-model="newStudent.email" placeholder="Enter email address">
          </div>
          
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" v-model="newStudent.phone" placeholder="Enter phone number">
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="newStudent.password" placeholder="Enter password">
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="showStudentModal = false" class="cancel-btn">Cancel</button>
          <button @click="addStudent" class="save-btn">Add Student</button>
        </div>
      </div>
    </div>

    <button class="logout-btn" @click="logout">
      <i class="fas fa-sign-out-alt"></i> Logout
    </button>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import teacherService from '@/services/teacherService';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'TeacherPanel',
  components: {
    Logo
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const activeTab = ref('dashboard');
    const searchQuery = ref('');
    const teacherName = ref('');
    const teacherEmail = ref('');
    const teacherPhone = ref('');
    const teacherAvatar = ref('/default-avatar.png');
    const isSidebarOpen = ref(false);
    const showQuizModal = ref(false);
    const showStudentModal = ref(false);
    const currentPath = computed(() => router.currentRoute.value.path);
    const isLoading = ref(false);
    const error = ref('');
    const profileForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: ''
    });
    const settings = ref({
      notifications: {
        email: false,
        quizResults: false,
        studentActivity: false
      },
      quizPreferences: {
        defaultDuration: 30,
        questionsPerPage: '10',
        showTimer: true,
        randomizeQuestions: false
      },
      themePreferences: {
        darkMode: false,
        theme: 'default'
      }
    });

    // Add missing properties with default values
    const totalQuizzes = ref(0);
    const activeStudents = ref(0);
    const averageScore = ref(0);
    const pendingReviews = ref(0);
    const recentActivities = ref([]);

    // Quiz data
    const quizzes = ref([]);
    const newQuiz = ref({
      title: '',
      description: '',
      duration: 30,
      questions: [],
      totalPoints: 0
    });

    const currentQuestion = ref({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1
    });

    // Student data
    const students = ref([]);
    const newStudent = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    });

    // Results data
    const quizResults = ref([]);
    const selectedQuiz = ref('');
    const timeRange = ref('all');

    // Initialize component
    onMounted(async () => {
      try {
        isLoading.value = true;
        // Initialize token from localStorage
        teacherService.initializeToken();
        
        // Fetch teacher profile
        const profileResponse = await teacherService.getProfile();
        if (profileResponse.success) {
          const { firstName, lastName, email, phone, bio } = profileResponse.teacher;
          teacherName.value = `${firstName} ${lastName}`;
          teacherEmail.value = email;
          teacherPhone.value = phone || '';
          teacherAvatar.value = '/default-avatar.png';
          profileForm.value = { firstName, lastName, email, phone: phone || '', bio: bio || '' };
        }

        // Fetch settings
        const settingsResponse = await teacherService.getSettings();
        if (settingsResponse.success) {
          // Ensure settings object has all required properties
          settings.value = {
            notifications: {
              email: settingsResponse.settings?.notifications?.email ?? false,
              quizResults: settingsResponse.settings?.notifications?.quizResults ?? false,
              studentActivity: settingsResponse.settings?.notifications?.studentActivity ?? false
            },
            quizPreferences: {
              defaultDuration: settingsResponse.settings?.quizPreferences?.defaultDuration ?? 30,
              questionsPerPage: settingsResponse.settings?.quizPreferences?.questionsPerPage ?? '10',
              showTimer: settingsResponse.settings?.quizPreferences?.showTimer ?? true,
              randomizeQuestions: settingsResponse.settings?.quizPreferences?.randomizeQuestions ?? false
            },
            themePreferences: {
              darkMode: settingsResponse.settings?.themePreferences?.darkMode ?? false,
              theme: settingsResponse.settings?.themePreferences?.theme ?? 'default'
            }
          };
          
          // Apply theme
          if (settings.value.themePreferences.darkMode) {
            document.documentElement.classList.add('dark');
          }
        }

        // Fetch quizzes
        const quizzesResponse = await teacherService.getQuizzes();
        if (quizzesResponse.success) {
          quizzes.value = quizzesResponse.quizzes;
          totalQuizzes.value = quizzesResponse.quizzes.length;
        }

        // Fetch students
        const studentsResponse = await teacherService.getStudents();
        if (studentsResponse.success) {
          students.value = studentsResponse.students;
          activeStudents.value = studentsResponse.students.length;
        }

        // Fetch results
        const resultsResponse = await teacherService.getResults(selectedQuiz.value, timeRange.value);
        if (resultsResponse.success) {
          quizResults.value = resultsResponse.results;
        }
      } catch (err) {
        error.value = err.message;
        console.error('Error initializing teacher panel:', err);
      } finally {
        isLoading.value = false;
      }
    });

    // Save profile changes
    const saveProfile = async () => {
      try {
        isLoading.value = true;
        error.value = '';
        const response = await teacherService.updateProfile(profileForm.value);
        if (response.success) {
          teacherName.value = `${profileForm.value.firstName} ${profileForm.value.lastName}`;
          teacherEmail.value = profileForm.value.email;
          teacherPhone.value = profileForm.value.phone;
          teacherAvatar.value = '/default-avatar.png';
        }
      } catch (err) {
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    };

    // Save settings
    const saveSettings = async () => {
      try {
        isLoading.value = true;
        error.value = '';
        const response = await teacherService.updateSettings(settings.value);
        if (response.success) {
          // Apply theme changes immediately
          if (settings.value.themePreferences.darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      } catch (err) {
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    };

    // Handle logout
    const logout = async () => {
      await authStore.logout();
      router.push('/login');
    };

    // Quiz methods
    const createNewQuiz = () => {
      showQuizModal.value = true;
      newQuiz.value = {
        title: '',
        description: '',
        duration: 30,
        questions: [],
        totalPoints: 0
      };
      currentQuestion.value = {
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1
      };
    };

    const fetchQuizzes = async () => {
      try {
        const response = await teacherService.getQuizzes();
        if (response.success) {
          quizzes.value = response.quizzes;
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    const addQuestion = () => {
      if (currentQuestion.value.text && currentQuestion.value.options.every(opt => opt)) {
        newQuiz.value.questions.push({...currentQuestion.value});
        newQuiz.value.totalPoints += currentQuestion.value.points;
        currentQuestion.value = {
          text: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          points: 1
        };
      }
    };

    const removeQuestion = (index) => {
      newQuiz.value.totalPoints -= newQuiz.value.questions[index].points;
      newQuiz.value.questions.splice(index, 1);
    };

    const saveQuiz = async () => {
      try {
        if (newQuiz.value.questions.length === 0) {
          alert('Please add at least one question');
          return;
        }

        const response = await teacherService.createQuiz(newQuiz.value);
        if (response.success) {
          showQuizModal.value = false;
          newQuiz.value = {
            title: '',
            description: '',
            duration: 30,
            questions: [],
            totalPoints: 0
          };
          await fetchQuizzes();
        }
      } catch (error) {
        console.error('Error creating quiz:', error);
        alert('Failed to create quiz');
      }
    };

    const editQuiz = async (quiz) => {
      try {
        const response = await teacherService.updateQuiz(quiz._id, quiz);
        if (response.success) {
          await fetchQuizzes();
        }
      } catch (error) {
        console.error('Error updating quiz:', error);
      }
    };

    const deleteQuiz = async (quiz) => {
      if (confirm('Are you sure you want to delete this quiz?')) {
        try {
          const response = await teacherService.deleteQuiz(quiz._id);
          if (response.success) {
            await fetchQuizzes();
          }
        } catch (error) {
          console.error('Error deleting quiz:', error);
        }
      }
    };

    // Student methods
    const fetchStudents = async () => {
      try {
        const response = await teacherService.getStudents();
        if (response.success) {
          students.value = response.students;
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const addStudent = async () => {
      try {
        const response = await teacherService.addStudent(newStudent.value);
        if (response.success) {
          showStudentModal.value = false;
          newStudent.value = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: ''
          };
          await fetchStudents();
        }
      } catch (error) {
        console.error('Error adding student:', error);
        alert('Failed to add student');
      }
    };

    const updateStudent = async (student) => {
      try {
        const response = await teacherService.updateStudent(student._id, student);
        if (response.success) {
          await fetchStudents();
        }
      } catch (error) {
        console.error('Error updating student:', error);
      }
    };

    const deleteStudent = async (student) => {
      if (confirm('Are you sure you want to delete this student?')) {
        try {
          const response = await teacherService.deleteStudent(student._id);
          if (response.success) {
            await fetchStudents();
          }
        } catch (error) {
          console.error('Error deleting student:', error);
        }
      }
    };

    // Results methods
    const fetchResults = async () => {
      try {
        const response = await teacherService.getResults(selectedQuiz.value, timeRange.value);
        if (response.success) {
          quizResults.value = response.results;
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    // Settings methods
    const setTheme = (themeName) => {
      settings.value.themePreferences.theme = themeName;
      document.documentElement.style.setProperty('--primary-color', themes.value.find(t => t.name === themeName)?.color || '#4f46e5');
    };

    const themes = ref([
        { name: 'default', color: '#4f46e5' },
        { name: 'ocean', color: '#0ea5e9' },
        { name: 'forest', color: '#22c55e' },
        { name: 'sunset', color: '#f97316' },
        { name: 'berry', color: '#d946ef' }
    ]);

    return {
      activeTab,
      searchQuery,
      teacherName,
      teacherEmail,
      teacherPhone,
      teacherAvatar,
      isSidebarOpen,
      showQuizModal,
      showStudentModal,
      currentPath,
      isLoading,
      error,
      profileForm,
      settings,
      totalQuizzes,
      activeStudents,
      averageScore,
      pendingReviews,
      recentActivities,
      quizzes,
      newQuiz,
      currentQuestion,
      students,
      newStudent,
      quizResults,
      selectedQuiz,
      timeRange,
      notifications: settings.value.notifications,
      quizPreferences: settings.value.quizPreferences,
      themePreferences: settings.value.themePreferences,
      currentTheme: settings.value.themePreferences.theme,
      themes,
      saveProfile,
      saveSettings,
      logout,
      addQuestion,
      removeQuestion,
      saveQuiz,
      editQuiz,
      deleteQuiz,
      addStudent,
      updateStudent,
      deleteStudent,
      fetchResults,
      setTheme,
      toggleSidebar: () => isSidebarOpen.value = !isSidebarOpen.value
    };
  }
};
</script>

<style scoped>
.teacher-panel {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: fixed;
  height: 100vh;
  transition: all 0.3s ease;
}

.logo {
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

nav li {
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #64748b;
  transition: all 0.3s ease;
}

nav li:hover {
  background: linear-gradient(145deg, #e2e8ec, #ffffff);
  color: #0f172a;
  transform: translateX(5px);
}

nav li.active {
  background: linear-gradient(145deg, #3b82f6, #2563eb);
  color: white;
}

nav li i {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
}

.header {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
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
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  width: 300px;
}

.search-bar input {
  border: none;
  background: transparent;
  margin-left: 0.5rem;
  font-size: 0.95rem;
  width: 100%;
  color: #64748b;
}

.search-bar input:focus {
  outline: none;
}

.notifications {
  position: relative;
  cursor: pointer;
}

.notifications i {
  font-size: 1.2rem;
  color: #4a90e2;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.welcome-text {
  font-size: 0.9rem;
  color: #666;
}

.user-name {
  font-weight: 600;
  color: #333;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #22c55e;
  border: 2px solid white;
  border-radius: 50%;
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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: #e0f2fe;
  color: #0284c7;
}

.stat-info h3 {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.stat-info p {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0.25rem 0;
}

.trend {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.trend.positive {
  color: #22c55e;
}

.trend.negative {
  color: #ef4444;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
}

.recent-activity, .quick-actions {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.activity-item:hover {
  transform: translateX(5px);
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

.activity-icon.quiz {
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  color: white;
}

.activity-icon.student {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
}

.activity-icon.result {
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

/* Responsive Styles */
@media (min-width: 1536px) {
  .sidebar {
    width: 300px;
  }

  .main-content {
    margin-left: 300px;
  }
}

@media (max-width: 1280px) {
  .sidebar {
    width: 260px;
  }

  .main-content {
    margin-left: 260px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
    padding: 1.5rem 0.75rem;
  }

  .sidebar .logo {
    padding: 0.5rem;
  }

  .sidebar nav li span {
    display: none;
  }

  .sidebar nav li {
    padding: 0.75rem;
    justify-content: center;
  }

  .sidebar nav li i {
    margin: 0;
    font-size: 1.25rem;
  }

  .main-content {
    margin-left: 80px;
  }

  .header {
    padding: 1rem;
  }

  .search-bar {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .teacher-panel {
    position: relative;
  }

  .sidebar {
    position: fixed;
    left: -280px;
    width: 280px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    transition: left 0.3s ease;
  }

  .sidebar.active {
    left: 0;
  }

  .sidebar nav li span {
    display: inline-block;
  }

  .sidebar nav li {
    padding: 1rem;
    justify-content: flex-start;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
  }

  .header-left {
    width: 100%;
    justify-content: space-between;
  }

  .search-bar {
    width: 100%;
    max-width: 300px;
  }

  .user-profile {
    width: 100%;
    justify-content: flex-end;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  /* Add mobile menu button */
  .mobile-menu-btn {
    display: block;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(145deg, #3b82f6, #2563eb);
    color: white;
    border: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: all 0.3s ease;
  }

  .mobile-menu-btn:hover {
    transform: scale(1.1);
  }

  .mobile-menu-btn:active {
    transform: scale(0.95);
  }
}

@media (max-width: 480px) {
  .header {
    padding: 1rem;
  }

  .user-profile {
    flex-direction: row-reverse;
    gap: 0.5rem;
  }

  .user-info {
    align-items: flex-start;
  }

  .welcome-text {
    font-size: 0.8rem;
  }

  .user-name {
    font-size: 0.9rem;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .dashboard-grid {
    gap: 1rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  .stat-info p {
    font-size: 1.25rem;
  }
}

/* Dark mode adjustments for responsive design */
@media (prefers-color-scheme: dark) {
  @media (max-width: 768px) {
    .sidebar {
      background: rgba(30, 41, 59, 0.95);
    }

    .mobile-menu-btn {
      background: linear-gradient(145deg, #3b82f6, #2563eb);
    }
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

/* Dashboard Section Styles */
.dashboard {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dashboard h2 {
  color: #4a90e2;
  font-size: 2rem;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
}

.dashboard h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  border-radius: 3px;
}

/* Quizzes Section Styles */
.quizzes {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.quizzes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.quizzes-header h2 {
  color: #7b61ff;
  font-size: 2rem;
  position: relative;
  display: inline-block;
}

.quizzes-header h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #7b61ff, #4a90e2);
  border-radius: 3px;
}

.create-quiz-btn {
  background: linear-gradient(to right, #7b61ff, #4a90e2);
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

.create-quiz-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(123, 97, 255, 0.4);
}

.quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.quiz-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.quiz-card h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.quiz-card p {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.quiz-stats {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  color: #666;
  font-size: 0.9rem;
}

.quiz-actions {
  display: flex;
  gap: 10px;
}

.quiz-actions button {
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.quiz-actions button:first-child {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.quiz-actions button:last-child {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.quiz-actions button:hover {
  transform: translateY(-2px);
}

/* Students Section Styles */
.students {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.students h2 {
  color: #2ecc71;
  font-size: 2rem;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
}

.students h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #2ecc71, #27ae60);
  border-radius: 3px;
}

.students-list table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.students-list th {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  padding: 15px;
  text-align: left;
  font-weight: 500;
}

.students-list td {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.students-list tr:last-child td {
  border-bottom: none;
}

.status {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status.active {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.status.inactive {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

/* Results Section Styles */
.results {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.results h2 {
  color: #e74c3c;
  font-size: 2rem;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
}

.results h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #e74c3c, #c0392b);
  border-radius: 3px;
}

.results-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.results-filters select {
  padding: 12px 20px;
  border: 2px solid rgba(231, 76, 60, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.results-filters select:focus {
  outline: none;
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.results-table {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.results-table th {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  padding: 15px;
  text-align: left;
  font-weight: 500;
}

.results-table td {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.results-table tr:last-child td {
  border-bottom: none;
}

/* Settings Section Styles */
.settings {
  padding: 24px;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.settings-card {
  background: var(--card-bg, #ffffff);
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.settings-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}

.settings-card-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  display: flex;
  align-items: center;
  gap: 12px;
}

.settings-card-header i {
  font-size: 1.25rem;
  color: var(--primary-color, #4f46e5);
}

.settings-card-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary, #111827);
}

.settings-card-content {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary, #4b5563);
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color, #4f46e5);
  box-shadow: 0 0 0 2px rgb(79 70 229 / 0.1);
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 16px;
}

.preview-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.upload-btn {
  padding: 8px 16px;
  background: var(--primary-color, #4f46e5);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-btn:hover {
  background: var(--primary-dark, #4338ca);
}

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.toggle-info h4 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary, #111827);
}

.toggle-info p {
  margin: 4px 0 0;
  font-size: 0.75rem;
  color: var(--text-secondary, #4b5563);
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--primary-color, #4f46e5);
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.theme-options {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.theme-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn.active {
  border-color: var(--primary-color, #4f46e5);
  transform: scale(1.1);
}

.save-settings-btn {
  padding: 10px 20px;
  background: var(--primary-color, #4f46e5);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-settings-btn:hover {
  background: var(--primary-dark, #4338ca);
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .settings-card {
    --card-bg: #1f2937;
    --border-color: #374151;
    --text-primary: #f9fafb;
    --text-secondary: #9ca3af;
  }

  .form-group input,
  .form-group select {
    background: #374151;
    color: #f9fafb;
  }

  .toggle-slider {
    background-color: #4b5563;
  }
}

/* Add these styles to your existing styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.questions-section {
  margin-top: 30px;
}

.current-question {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.option-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.option-input input[type="radio"] {
  margin-right: 10px;
}

.add-question-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.added-questions {
  margin-top: 20px;
}

.question-item {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
}

.question-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

.option {
  padding: 8px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.option.correct {
  background: #e8f5e9;
  border-color: #4CAF50;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  padding: 10px 20px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.logout-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-left: 1rem;
}
.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
</style>
