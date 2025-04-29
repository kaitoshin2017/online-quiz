<template>
  <div class="user-management">
    <div class="section-header">
      <div class="header-content">
        <h2>
          <i class="fas fa-users"></i>
          User Management
        </h2>
        <p class="subtitle">Manage system users and their roles</p>
      </div>
      <button class="quick-add-btn" @click="showQuickAddForm = true" :disabled="isLoading">
        <i class="fas fa-user-plus"></i>
        <span>Quick Add User</span>
      </button>
    </div>

    <!-- Quick Add Form -->
    <div v-if="showQuickAddForm" class="quick-add-form">
      <form @submit.prevent="createUser" class="form-grid">
        <div class="form-group">
          <label>First Name</label>
          <input 
            v-model="newUser.firstName"
            type="text"
            placeholder="Enter first name"
            required
            ref="firstNameInput"
          >
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input 
            v-model="newUser.lastName"
            type="text"
            placeholder="Enter last name"
            required
          >
        </div>
        <div class="form-group">
          <label>Username</label>
          <input 
            v-model="newUser.username"
            type="text"
            placeholder="Enter username"
            required
          >
        </div>
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="newUser.email"
            type="email"
            placeholder="Enter email address"
            required
          >
        </div>
        <div class="form-group">
          <label>Role</label>
          <select v-model="newUser.role" required>
            <option value="">Select role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label>Password</label>
          <div class="password-input">
            <input 
              v-model="newUser.password"
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
          <label>Status</label>
          <select v-model="newUser.status" required>
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
            {{ isSubmitting ? 'Creating...' : 'Create User' }}
          </button>
        </div>
      </form>
    </div>

    <div class="filters-bar">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Search users...">
      </div>
      <div class="filter-group">
        <select v-model="roleFilter" class="filter-select">
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>

    <div class="users-grid">
      <div v-for="user in filteredUsers" :key="user.id" class="user-card">
        <div class="user-header">
          <img :src="user.avatar" :alt="user.name" class="user-avatar">
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
            <span :class="['role-badge', user.role.toLowerCase()]">{{ user.role }}</span>
            <span :class="['status-badge', user.status]">{{ user.status }}</span>
          </div>
        </div>

        <div class="user-stats">
          <div class="stat-item">
            <i class="fas fa-calendar"></i>
            <div class="stat-info">
              <span class="stat-value">{{ user.joinDate }}</span>
              <span class="stat-label">Joined</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-clock"></i>
            <div class="stat-info">
              <span class="stat-value">{{ user.lastLogin }}</span>
              <span class="stat-label">Last Login</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-shield-alt"></i>
            <div class="stat-info">
              <span class="stat-value">{{ user.twoFactorEnabled ? 'Enabled' : 'Disabled' }}</span>
              <span class="stat-label">2FA Status</span>
            </div>
          </div>
        </div>

        <div class="user-actions">
          <button @click="viewUserDetails(user)" class="action-btn view">
            <i class="fas fa-eye"></i>
            <span>View</span>
          </button>
          <button @click="editUser(user)" class="action-btn edit">
            <i class="fas fa-edit"></i>
            <span>Edit</span>
          </button>
          <button @click="deleteUser(user)" class="action-btn delete">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import api from '../services/api'

export default {
  name: 'UserManagement',
  props: {
    users: {
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
    const roleFilter = ref('all')
    const statusFilter = ref('all')

    const newUser = ref({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      role: '',
      status: 'active'
    })

    // Computed property for filtered users
    const filteredUsers = computed(() => {
      return props.users.filter(user => {
        // Safely construct the full name from firstName and lastName
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim().toLowerCase()
        const email = (user.email || '').toLowerCase()
        const searchTerm = searchQuery.value.toLowerCase()
        const role = (user.role || '').toLowerCase()
        const status = (user.status || '').toLowerCase()

        const matchesSearch = !searchTerm || 
                            fullName.includes(searchTerm) || 
                            email.includes(searchTerm)
        const matchesRole = roleFilter.value === 'all' || role === roleFilter.value.toLowerCase()
        const matchesStatus = statusFilter.value === 'all' || status === statusFilter.value.toLowerCase()
        
        return matchesSearch && matchesRole && matchesStatus
      })
    })

    const createUser = async () => {
      try {
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'username', 'email', 'password', 'role']
        const missingFields = requiredFields.filter(field => !newUser.value[field])
        
        if (missingFields.length > 0) {
          throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`)
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(newUser.value.email)) {
          throw new Error('Please enter a valid email address')
        }

        // Validate username format (alphanumeric and underscores only)
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        if (!usernameRegex.test(newUser.value.username)) {
          throw new Error('Username can only contain letters, numbers, and underscores')
        }

        isSubmitting.value = true
        
        // Create FormData object
        const formData = new FormData()
        formData.append('firstName', newUser.value.firstName)
        formData.append('lastName', newUser.value.lastName)
        formData.append('username', newUser.value.username)
        formData.append('email', newUser.value.email.toLowerCase())
        formData.append('password', newUser.value.password)
        formData.append('role', newUser.value.role)
        formData.append('status', newUser.value.status)
        
        const response = await api.post('/auth/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        if (response.data) {
          // Add the new user to the list
          emit('update:users', [...props.users, response.data.user])
          
          // Reset form
          newUser.value = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            role: '',
            status: 'active'
          }
          showQuickAddForm.value = false
          
          // Show success message
          alert('User created successfully!')
        }
      } catch (error) {
        console.error('Error creating user:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create user'
        alert(errorMessage)
      } finally {
        isSubmitting.value = false
      }
    }

    const cancelQuickAdd = () => {
      showQuickAddForm.value = false
      newUser.value = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: '',
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

    return {
      showQuickAddForm,
      showPassword,
      isSubmitting,
      isLoading,
      newUser,
      createUser,
      cancelQuickAdd,
      firstNameInput,
      searchQuery,
      roleFilter,
      statusFilter,
      filteredUsers
    }
  }
}
</script>

<style scoped>
.user-management {
  background: #ffffff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

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
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

.quick-add-btn {
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
  transition: all 0.3s ease;
}

.quick-add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
}

.quick-add-form {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  border: 2px solid #e2e8f0;
  animation: slideDown 0.3s ease-out;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.password-input {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input input {
  padding-right: 48px;
}

.toggle-password {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #4f46e5;
}

.form-actions {
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
}

.cancel-btn,
.submit-btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f1f5f9;
  color: #64748b;
  border: none;
}

.cancel-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

.submit-btn {
  background: #4f46e5;
  color: white;
  border: none;
}

.submit-btn:hover:not(:disabled) {
  background: #4338ca;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .user-management {
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

  .quick-add-form {
    background: #0f172a;
    border-color: #334155;
  }

  .form-group label {
    color: #e2e8f0;
  }

  .form-group input,
  .form-group select {
    background: #1e293b;
    border-color: #334155;
    color: #e2e8f0;
  }

  .form-group input:focus,
  .form-group select:focus {
    border-color: #818cf8;
  }

  .cancel-btn {
    background: #334155;
    color: #94a3b8;
  }

  .cancel-btn:hover {
    background: #475569;
    color: #e2e8f0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    grid-column: 1;
  }
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

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}

.user-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.user-header {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  align-items: center;
}

.user-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4f46e5;
  padding: 3px;
  background: linear-gradient(120deg, #4f46e5, #7c3aed);
  transition: all 0.3s ease;
}

.user-card:hover .user-avatar {
  transform: scale(1.05);
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin: 0 0 6px 0;
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
}

.user-info p {
  margin: 0 0 10px 0;
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
}

.role-badge {
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-right: 8px;
}

.role-badge::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.role-badge.admin {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.role-badge.admin::before {
  background: #4f46e5;
}

.role-badge.teacher {
  background: rgba(234, 179, 8, 0.1);
  color: #ca8a04;
}

.role-badge.teacher::before {
  background: #ca8a04;
}

.role-badge.student {
  background: rgba(14, 165, 233, 0.1);
  color: #0ea5e9;
}

.role-badge.student::before {
  background: #0ea5e9;
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

.user-stats {
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

.user-card:hover .stat-item i {
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

.user-actions {
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
  .user-management {
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

  .user-card {
    background: #1e293b;
    border-color: #334155;
  }

  .user-info h3 {
    color: #e2e8f0;
  }

  .user-info p {
    color: #94a3b8;
  }

  .user-stats {
    background: #0f172a;
    border-color: #334155;
  }

  .stat-value {
    color: #e2e8f0;
  }

  .stat-label {
    color: #94a3b8;
  }

  .role-badge.admin {
    background: rgba(129, 140, 248, 0.1);
    color: #818cf8;
  }

  .role-badge.teacher {
    background: rgba(250, 204, 21, 0.1);
    color: #facc15;
  }

  .role-badge.student {
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
  .users-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .add-user-btn {
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

  .users-grid {
    grid-template-columns: 1fr;
  }

  .user-stats {
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

