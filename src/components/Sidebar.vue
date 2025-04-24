<template>
  <div class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <div class="sidebar-header">
      <div class="logo">
        <Logo />
      </div>
      <button class="close-btn" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <ul>
        <li>
          <router-link to="/" @click="$emit('close')">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" @click="$emit('close')">
            <i class="fas fa-info-circle"></i>
            <span>About</span>
          </router-link>
        </li>
        <li>
          <router-link to="/faq" @click="$emit('close')">
            <i class="fas fa-question-circle"></i>
            <span>FAQ</span>
          </router-link>
        </li>
        <li>
          <router-link to="/login" @click="$emit('close')">
            <i class="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </router-link>
        </li>
        <li>
          <router-link to="/signup" @click="$emit('close')">
            <i class="fas fa-user-plus"></i>
            <span>Sign Up</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Logo from './Logo.vue'

export default {
  name: 'Sidebar',
  components: {
    Logo
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow-y: auto;
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.9);
  position: sticky;
  top: 0;
  z-index: 1;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  transform: rotate(90deg);
}

.sidebar-nav ul {
  list-style: none;
  padding: 1rem 0;
  margin: 0;
}

.sidebar-nav li {
  margin: 0;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.sidebar-nav a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: linear-gradient(to bottom, #4a90e2, #7b61ff);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.sidebar-nav a:hover::before {
  transform: scaleY(1);
}

.sidebar-nav a:hover {
  background: rgba(74, 144, 226, 0.05);
  color: #4a90e2;
  padding-left: 2rem;
}

.sidebar-nav i {
  margin-right: 1rem;
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.sidebar-nav a:hover i {
  transform: scale(1.2);
}

.sidebar-nav span {
  font-weight: 500;
  transition: all 0.3s ease;
}

.sidebar-nav a:hover span {
  color: #4a90e2;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    left: -100%;
  }
  
  .sidebar-open {
    left: 0;
  }
}

/* Scrollbar Styling */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(74, 144, 226, 0.3);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(74, 144, 226, 0.5);
}
</style> 