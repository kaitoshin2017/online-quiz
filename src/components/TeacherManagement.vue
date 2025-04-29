<template>
  <div class="teacher-management">
    <div class="section-header">
      <div class="header-content">
        <h2>
          <i class="fas fa-chalkboard-teacher"></i>
          Teacher Management
        </h2>
        <p class="subtitle">Manage and monitor teaching staff</p>
      </div>
      <button class="quick-add-btn" @click="showQuickAddForm = true" :disabled="isLoading">
        <i class="fas fa-user-plus"></i>
        <span>Add New Teacher</span>
      </button>
    </div>

    <!-- Quick Add Form -->
    <div v-if="showQuickAddForm" class="quick-add-form">
      <form @submit.prevent="createTeacher" class="form-grid">
        <div class="form-group">
          <label>First Name</label>
          <input 
            v-model="newTeacher.firstName"
            type="text"
            placeholder="Enter first name"
            required
            ref="firstNameInput"
          >
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input 
            v-model="newTeacher.lastName"
            type="text"
            placeholder="Enter last name"
            required
          >
        </div>
        <div class="form-group">
          <label>Username</label>
          <input 
            v-model="newTeacher.username"
            type="text"
            placeholder="Enter username"
            required
          >
        </div>
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="newTeacher.email"
            type="email"
            placeholder="Enter email address"
            required
          >
        </div>
        <div class="form-group">
          <label>Password</label>
          <div class="password-input">
            <input 
              v-model="newTeacher.password"
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
          <label>Subject Expertise</label>
          <select v-model="newTeacher.expertise" required>
            <option value="">Select subject expertise</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select v-model="newTeacher.status" required>
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
            {{ isSubmitting ? 'Creating...' : 'Create Teacher' }}
          </button>
        </div>
      </form>
    </div>

    <div class="filters-bar">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Search teachers...">
      </div>
      <div class="filter-group">
        <select v-model="expertiseFilter" class="filter-select">
          <option value="all">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="History">History</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
        </select>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>

    <div class="teachers-grid">
      <div v-for="teacher in filteredTeachers" :key="teacher.id" class="teacher-card">
        <div class="teacher-header">
          <img :src="teacher.avatar || '/default-avatar.png'" :alt="teacher.name" class="teacher-avatar">
          <div class="teacher-info">
            <h3>{{ teacher.firstName }} {{ teacher.lastName }}</h3>
            <p>{{ teacher.email }}</p>
            <div class="badge-container">
              <span class="expertise-badge">{{ teacher.expertise }}</span>
              <span :class="['status-badge', teacher.status]">{{ teacher.status }}</span>
            </div>
          </div>
        </div>

        <div class="teacher-stats">
          <div class="stat-item">
            <i class="fas fa-book"></i>
            <div class="stat-info">
              <span class="stat-value">{{ teacher.totalCourses || 0 }}</span>
              <span class="stat-label">Courses</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-users"></i>
            <div class="stat-info">
              <span class="stat-value">{{ teacher.totalStudents || 0 }}</span>
              <span class="stat-label">Students</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-star"></i>
            <div class="stat-info">
              <span class="stat-value">{{ teacher.rating || '0.0' }}</span>
              <span class="stat-label">Rating</span>
            </div>
          </div>
        </div>

        <div class="teacher-actions">
          <button @click="viewTeacherDetails(teacher)" class="action-btn view">
            <i class="fas fa-eye"></i>
            <span>View</span>
          </button>
          <button @click="editTeacher(teacher)" class="action-btn edit">
            <i class="fas fa-edit"></i>
            <span>Edit</span>
          </button>
          <button @click="deleteTeacher(teacher)" class="action-btn delete">
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
  name: 'TeacherManagement',
  props: {
    teachers: {
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
    const expertiseFilter = ref('all')
    const statusFilter = ref('all')

    const newTeacher = ref({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      expertise: '',
      status: 'active'
    })

    // Computed property for filtered teachers
    const filteredTeachers = computed(() => {
      return props.teachers.filter(teacher => {
        const fullName = `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim().toLowerCase()
        const email = (teacher.email || '').toLowerCase()
        const expertise = (teacher.expertise || '').toLowerCase()
        const searchTerm = searchQuery.value.toLowerCase()

        const matchesSearch = !searchTerm || 
                            fullName.includes(searchTerm) || 
                            email.includes(searchTerm)
        const matchesExpertise = expertiseFilter.value === 'all' || expertise === expertiseFilter.value.toLowerCase()
        const matchesStatus = statusFilter.value === 'all' || teacher.status === statusFilter.value
        
        return matchesSearch && matchesExpertise && matchesStatus
      })
    })

    const createTeacher = async () => {
      try {
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'username', 'email', 'password', 'expertise']
        const missingFields = requiredFields.filter(field => !newTeacher.value[field])
        
        if (missingFields.length > 0) {
          throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`)
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(newTeacher.value.email)) {
          throw new Error('Please enter a valid email address')
        }

        // Validate username format
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        if (!usernameRegex.test(newTeacher.value.username)) {
          throw new Error('Username can only contain letters, numbers, and underscores')
        }

        isSubmitting.value = true
        
        // Create FormData object
        const formData = new FormData()
        formData.append('firstName', newTeacher.value.firstName)
        formData.append('lastName', newTeacher.value.lastName)
        formData.append('username', newTeacher.value.username)
        formData.append('email', newTeacher.value.email.toLowerCase())
        formData.append('password', newTeacher.value.password)
        formData.append('expertise', newTeacher.value.expertise)
        formData.append('status', newTeacher.value.status)
        formData.append('role', 'teacher')
        
        const response = await api.post('/auth/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        if (response.data) {
          // Add the new teacher to the list
          emit('update:teachers', [...props.teachers, response.data.user])
          
          // Reset form
          newTeacher.value = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            expertise: '',
            status: 'active'
          }
          showQuickAddForm.value = false
          
          // Show success message
          alert('Teacher created successfully!')
        }
      } catch (error) {
        console.error('Error creating teacher:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create teacher'
        alert(errorMessage)
      } finally {
        isSubmitting.value = false
      }
    }

    const cancelQuickAdd = () => {
      showQuickAddForm.value = false
      newTeacher.value = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        expertise: '',
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

    const viewTeacherDetails = (teacher) => {
      // Implement view details functionality
      console.log('View teacher details:', teacher)
    }

    const editTeacher = (teacher) => {
      // Implement edit functionality
      console.log('Edit teacher:', teacher)
    }

    const deleteTeacher = async (teacher) => {
      if (confirm('Are you sure you want to delete this teacher?')) {
        try {
          await api.delete(`/teachers/${teacher.id}`)
          emit('update:teachers', props.teachers.filter(t => t.id !== teacher.id))
          alert('Teacher deleted successfully!')
        } catch (error) {
          console.error('Error deleting teacher:', error)
          alert(error.response?.data?.message || 'Failed to delete teacher')
        }
      }
    }

    return {
      showQuickAddForm,
      showPassword,
      isSubmitting,
      isLoading,
      newTeacher,
      createTeacher,
      cancelQuickAdd,
      firstNameInput,
      searchQuery,
      expertiseFilter,
      statusFilter,
      filteredTeachers,
      viewTeacherDetails,
      editTeacher,
      deleteTeacher
    }
  }
}
</script>

<style scoped>
.teacher-management {
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

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

.teacher-card {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 2px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.teacher-card::before {
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

.teacher-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.teacher-card:hover::before {
  opacity: 1;
}

.teacher-header {
  display: flex;
  gap: 24px;
  margin-bottom: 28px;
  align-items: center;
}

.teacher-avatar {
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

.teacher-card:hover .teacher-avatar {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
}

.teacher-info h3 {
  margin: 0 0 8px 0;
  color: #1e293b;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.3;
}

.teacher-info p {
  margin: 0 0 12px 0;
  color: #64748b;
  font-size: 1.05rem;
  font-weight: 500;
}

.badge-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.expertise-badge,
.status-badge {
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.expertise-badge {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.expertise-badge::before {
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
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #16a34a;
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.status-badge.inactive::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dc2626;
}

.teacher-stats {
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

.teacher-card:hover .stat-item i {
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

.teacher-actions {
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
  .teacher-management {
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
  .teacher-stats {
    background: #0f172a;
    border-color: #334155;
  }

  .teacher-card {
    background: #1e293b;
    border-color: #334155;
  }

  .teacher-info h3 {
    color: #e2e8f0;
  }

  .teacher-info p {
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

  .expertise-badge {
    background: rgba(129, 140, 248, 0.1);
    color: #818cf8;
  }

  .expertise-badge::before {
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
  .teachers-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .teacher-management {
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

  .teachers-grid {
    grid-template-columns: 1fr;
  }

  .teacher-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .teacher-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .badge-container {
    justify-content: center;
  }

  .teacher-stats {
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