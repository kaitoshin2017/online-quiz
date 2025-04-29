<template>
  <div class="student-management">
    <div class="section-header">
      <div class="header-content">
        <h2>
          <i class="fas fa-user-graduate"></i>
          Student Management
        </h2>
        <p class="subtitle">Manage and monitor student progress</p>
      </div>
      <button class="quick-add-btn" @click="showQuickAddForm = true" :disabled="isLoading">
        <i class="fas fa-user-plus"></i>
        <span>Add New Student</span>
      </button>
    </div>

    <!-- Quick Add Form -->
    <div v-if="showQuickAddForm" class="quick-add-form">
      <form @submit.prevent="createStudent" class="form-grid">
        <div class="form-group">
          <label>First Name</label>
          <input 
            v-model="newStudent.firstName"
            type="text"
            placeholder="Enter first name"
            required
            ref="firstNameInput"
          >
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input 
            v-model="newStudent.lastName"
            type="text"
            placeholder="Enter last name"
            required
          >
        </div>
        <div class="form-group">
          <label>Username</label>
          <input 
            v-model="newStudent.username"
            type="text"
            placeholder="Enter username"
            required
          >
        </div>
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="newStudent.email"
            type="email"
            placeholder="Enter email address"
            required
          >
        </div>
        <div class="form-group">
          <label>Password</label>
          <div class="password-input">
            <input 
              v-model="newStudent.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              required
            >
            <button type="button" @click="showPassword = !showPassword" class="toggle-password">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label>Grade Level</label>
          <select v-model="newStudent.gradeLevel" required>
            <option value="">Select grade level</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select v-model="newStudent.status" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="cancelQuickAdd">
            <i class="fas fa-times"></i>
            Cancel
          </button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <i class="fas fa-save"></i>
            {{ isSubmitting ? 'Creating...' : 'Create Student' }}
          </button>
        </div>
      </form>
    </div>

    <div class="filters-bar">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Search students...">
      </div>
      <div class="filter-group">
        <select v-model="gradeLevelFilter" class="filter-select">
          <option value="all">All Grades</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
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
            <h3>{{ student.firstName }} {{ student.lastName }}</h3>
            <p>{{ student.email }}</p>
            <span class="grade-badge">Grade {{ student.gradeLevel }}</span>
            <span :class="['status-badge', student.status]">{{ student.status }}</span>
          </div>
        </div>

        <div class="student-stats">
          <div class="stat-item">
            <i class="fas fa-clipboard-check"></i>
            <div class="stat-info">
              <span class="stat-value">{{ student.completedQuizzes || 0 }}</span>
              <span class="stat-label">Quizzes</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-trophy"></i>
            <div class="stat-info">
              <span class="stat-value">{{ student.averageScore || '0%' }}</span>
              <span class="stat-label">Avg. Score</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-clock"></i>
            <div class="stat-info">
              <span class="stat-value">{{ student.lastActive || 'Never' }}</span>
              <span class="stat-label">Last Active</span>
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
import { ref, computed, watch, nextTick } from 'vue'
import api from '../services/api'

export default {
  name: 'StudentManagement',
  props: {
    students: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const showQuickAddForm = ref(false)
    const showPassword = ref(false)
    const isSubmitting = ref(false)
    const isLoading = ref(false)
    const firstNameInput = ref(null)
    const searchQuery = ref('')
    const gradeLevelFilter = ref('all')
    const statusFilter = ref('all')

    const newStudent = ref({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      gradeLevel: '',
      status: 'active'
    })

    // Computed property for filtered students
    const filteredStudents = computed(() => {
      return props.students.filter(student => {
        const fullName = `${student.firstName || ''} ${student.lastName || ''}`.trim().toLowerCase()
        const email = (student.email || '').toLowerCase()
        const searchTerm = searchQuery.value.toLowerCase()

        const matchesSearch = !searchTerm || 
                            fullName.includes(searchTerm) || 
                            email.includes(searchTerm)
        const matchesGrade = gradeLevelFilter.value === 'all' || student.gradeLevel === gradeLevelFilter.value
        const matchesStatus = statusFilter.value === 'all' || student.status === statusFilter.value
        
        return matchesSearch && matchesGrade && matchesStatus
      })
    })

    const createStudent = async () => {
      try {
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'username', 'email', 'password', 'gradeLevel']
        const missingFields = requiredFields.filter(field => !newStudent.value[field])
        
        if (missingFields.length > 0) {
          throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`)
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(newStudent.value.email)) {
          throw new Error('Please enter a valid email address')
        }

        // Validate username format
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        if (!usernameRegex.test(newStudent.value.username)) {
          throw new Error('Username can only contain letters, numbers, and underscores')
        }

        isSubmitting.value = true
        
        // Create FormData object
        const formData = new FormData()
        formData.append('firstName', newStudent.value.firstName)
        formData.append('lastName', newStudent.value.lastName)
        formData.append('username', newStudent.value.username)
        formData.append('email', newStudent.value.email.toLowerCase())
        formData.append('password', newStudent.value.password)
        formData.append('gradeLevel', newStudent.value.gradeLevel)
        formData.append('status', newStudent.value.status)
        formData.append('role', 'student')
        
        const response = await api.post('/auth/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        if (response.data) {
          // Add the new student to the list
          emit('update:students', [...props.students, response.data.user])
          
          // Reset form
          newStudent.value = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            gradeLevel: '',
            status: 'active'
          }
          showQuickAddForm.value = false
          
          // Show success message
          alert('Student created successfully!')
        }
      } catch (error) {
        console.error('Error creating student:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create student'
        alert(errorMessage)
      } finally {
        isSubmitting.value = false
      }
    }

    const cancelQuickAdd = () => {
      showQuickAddForm.value = false
      newStudent.value = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        gradeLevel: '',
        status: 'active'
      }
    }

    // Focus first name input when form opens
    watch(showQuickAddForm, (newVal) => {
      if (newVal && firstNameInput.value) {
        nextTick(() => {
          firstNameInput.value.focus()
        })
      }
    })

    const viewStudentDetails = (student) => {
      // Implement view details functionality
      console.log('View student details:', student)
    }

    const editStudent = (student) => {
      // Implement edit functionality
      console.log('Edit student:', student)
    }

    const deleteStudent = async (student) => {
      if (confirm('Are you sure you want to delete this student?')) {
        try {
          await api.delete(`/students/${student.id}`)
          emit('update:students', props.students.filter(s => s.id !== student.id))
          alert('Student deleted successfully!')
        } catch (error) {
          console.error('Error deleting student:', error)
          alert(error.response?.data?.message || 'Failed to delete student')
        }
      }
    }

    return {
      showQuickAddForm,
      showPassword,
      isSubmitting,
      isLoading,
      newStudent,
      createStudent,
      cancelQuickAdd,
      firstNameInput,
      searchQuery,
      gradeLevelFilter,
      statusFilter,
      filteredStudents,
      viewStudentDetails,
      editStudent,
      deleteStudent
    }
  }
}
</script>

<style scoped>
.student-management {
  background: #ffffff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  min-height: calc(100vh - 100px);
  transition: all 0.3s ease;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #f1f5f9;
}

.header-content h2 {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-content h2 i {
  font-size: 1.8rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 8px 0 0 0;
  opacity: 0.9;
}

.quick-add-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.25);
}

.quick-add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
}

.quick-add-btn:active {
  transform: translateY(0);
}

.quick-add-form {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  border: 2px solid #f1f5f9;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fff;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.toggle-password:hover {
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.1);
}

.form-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 16px;
}

.cancel-btn,
.submit-btn {
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f1f5f9;
  color: #64748b;
  border: none;
}

.cancel-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.submit-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.25);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 24px;
  background: #f8fafc;
  padding: 20px;
  border-radius: 16px;
  border: 2px solid #f1f5f9;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-box input {
  width: 100%;
  padding: 14px 48px 14px 20px;
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
  font-size: 1.2rem;
}

.filter-group {
  display: flex;
  gap: 16px;
}

.filter-select {
  padding: 14px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
}

.filter-select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

.student-card {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 2px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.student-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.student-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.student-card:hover::before {
  opacity: 1;
}

.student-header {
  display: flex;
  gap: 24px;
  margin-bottom: 28px;
  align-items: center;
}

.student-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.25);
  padding: 3px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  transition: all 0.3s ease;
}

.student-card:hover .student-avatar {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
}

.student-info h3 {
  margin: 0 0 8px 0;
  color: #1e293b;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.3;
}

.student-info p {
  margin: 0 0 12px 0;
  color: #64748b;
  font-size: 1.05rem;
  font-weight: 500;
}

.grade-badge,
.status-badge {
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 10px;
}

.grade-badge {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.grade-badge::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4f46e5;
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
  gap: 20px;
  margin-bottom: 28px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #f1f5f9;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.stat-item i {
  font-size: 1.3rem;
  color: #4f46e5;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.student-card:hover .stat-item i {
  background: rgba(79, 70, 229, 0.15);
  transform: scale(1.05);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.student-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
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

  .section-header {
    border-bottom-color: #334155;
  }

  .header-content h2 {
    background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
    -webkit-background-clip: text;
  }

  .header-content h2 i {
    background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
    -webkit-background-clip: text;
  }

  .quick-add-form {
    background: #1e293b;
    border-color: #334155;
  }

  .form-group label {
    color: #e2e8f0;
  }

  .form-group input,
  .form-group select,
  .search-box input,
  .filter-select {
    background: #0f172a;
    border-color: #334155;
    color: #e2e8f0;
  }

  .form-group input:focus,
  .form-group select:focus,
  .search-box input:focus,
  .filter-select:focus {
    border-color: #818cf8;
  }

  .filters-bar,
  .student-stats {
    background: #0f172a;
    border-color: #334155;
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

  .stat-value {
    color: #e2e8f0;
  }

  .stat-label {
    color: #94a3b8;
  }

  .cancel-btn {
    background: #334155;
    color: #94a3b8;
  }

  .cancel-btn:hover {
    background: #475569;
    color: #e2e8f0;
  }

  .grade-badge {
    background: rgba(129, 140, 248, 0.1);
    color: #818cf8;
  }

  .grade-badge::before {
    background: #818cf8;
  }

  .status-badge.active {
    background: rgba(34, 197, 94, 0.1);
    color: #4ade80;
  }

  .status-badge.active::before {
    background: #4ade80;
  }

  .status-badge.inactive {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
  }

  .status-badge.inactive::before {
    background: #f87171;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .students-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .student-management {
    padding: 20px;
  }

  .section-header {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
    text-align: center;
  }

  .quick-add-btn {
    width: 100%;
    justify-content: center;
  }

  .filters-bar {
    flex-direction: column;
    padding: 16px;
  }

  .filter-group {
    width: 100%;
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }

  .students-grid {
    grid-template-columns: 1fr;
  }

  .student-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .student-info {
    display: flex;
    flex-direction: column;
    align-items: center;
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