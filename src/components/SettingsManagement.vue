<template>
  <div class="settings-management">
    <div class="section-header">
      <h2>Settings Management</h2>
      <div class="header-actions">
        <button class="save-settings-btn" @click="saveSettings">
          <i class="fas fa-save"></i> Save Changes
        </button>
        <button class="reset-settings-btn" @click="resetSettings">
          <i class="fas fa-undo"></i> Reset to Default
        </button>
      </div>
    </div>

    <div class="settings-grid">
      <div class="settings-card">
        <div class="card-header">
          <h3><i class="fas fa-cog"></i> General Settings</h3>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label>System Name</label>
            <input type="text" v-model="settings.systemName" placeholder="Enter system name">
          </div>
          <div class="form-group">
            <label>System Email</label>
            <input type="email" v-model="settings.systemEmail" placeholder="Enter system email">
          </div>
          <div class="form-group">
            <label>Time Zone</label>
            <select v-model="settings.timezone">
              <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Language</label>
            <select v-model="settings.language">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      <div class="settings-card">
        <div class="card-header">
          <h3><i class="fas fa-shield-alt"></i> Security Settings</h3>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label>Password Policy</label>
            <select v-model="settings.passwordPolicy">
              <option value="basic">Basic (8+ characters)</option>
              <option value="medium">Medium (8+ chars, 1 number)</option>
              <option value="strong">Strong (8+ chars, number, symbol)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Session Timeout (minutes)</label>
            <input type="number" v-model="settings.sessionTimeout" min="5" max="120">
          </div>
          <div class="form-group switch-group">
            <label>Two-Factor Authentication</label>
            <label class="switch">
              <input type="checkbox" v-model="settings.twoFactorAuth">
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group switch-group">
            <label>Force Password Change</label>
            <label class="switch">
              <input type="checkbox" v-model="settings.forcePasswordChange">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="settings-card">
        <div class="card-header">
          <h3><i class="fas fa-bell"></i> Notification Settings</h3>
        </div>
        <div class="settings-form">
          <div class="form-group switch-group">
            <label>Email Notifications</label>
            <label class="switch">
              <input type="checkbox" v-model="settings.emailNotifications">
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group switch-group">
            <label>System Notifications</label>
            <label class="switch">
              <input type="checkbox" v-model="settings.systemNotifications">
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group">
            <label>Notification Frequency</label>
            <select v-model="settings.notificationFrequency">
              <option value="realtime">Real-time</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
            </select>
          </div>
          <div class="form-group switch-group">
            <label>Sound Notifications</label>
            <label class="switch">
              <input type="checkbox" v-model="settings.soundNotifications">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="settings-card">
        <div class="card-header">
          <h3><i class="fas fa-palette"></i> Appearance Settings</h3>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label>Theme</label>
            <select v-model="settings.theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
          <div class="form-group">
            <label>Font Size</label>
            <select v-model="settings.fontSize">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div class="form-group switch-group">
            <label>Animations</label>
            <label class="switch">
              <input type="checkbox" v-model="settings.animations">
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group">
            <label>Accent Color</label>
            <select v-model="settings.accentColor">
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="green">Green</option>
              <option value="orange">Orange</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsManagement',
  data() {
    return {
      timezones: ['UTC', 'EST', 'PST', 'GMT', 'CET'],
      settings: {
        systemName: 'Online Quiz System',
        systemEmail: 'admin@example.com',
        timezone: 'UTC',
        language: 'en',
        passwordPolicy: 'medium',
        sessionTimeout: 30,
        twoFactorAuth: true,
        forcePasswordChange: false,
        emailNotifications: true,
        systemNotifications: true,
        notificationFrequency: 'realtime',
        soundNotifications: true,
        theme: 'system',
        fontSize: 'medium',
        animations: true,
        accentColor: 'blue'
      }
    }
  },
  methods: {
    saveSettings() {
      // Implement settings save logic
    },
    resetSettings() {
      // Implement settings reset logic
    }
  }
}
</script>

<style scoped>
.settings-management {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h2 {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.save-settings-btn,
.reset-settings-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.save-settings-btn {
  background: #4f46e5;
  color: white;
}

.reset-settings-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.save-settings-btn:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

.reset-settings-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-1px);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.settings-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.card-header {
  margin-bottom: 20px;
}

.card-header h3 {
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-header h3 i {
  color: #4f46e5;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1e293b;
  background: #f8fafc;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.switch-group {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e2e8f0;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4f46e5;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .settings-management {
    background: #1e293b;
  }

  .section-header h2 {
    color: #e2e8f0;
  }

  .settings-card {
    background: #1e293b;
    border-color: #334155;
  }

  .card-header h3 {
    color: #e2e8f0;
  }

  .form-group label {
    color: #94a3b8;
  }

  .form-group input,
  .form-group select {
    background: #0f172a;
    border-color: #334155;
    color: #e2e8f0;
  }

  .slider {
    background-color: #334155;
  }

  .slider:before {
    background-color: #94a3b8;
  }

  input:checked + .slider {
    background-color: #4f46e5;
  }

  input:checked + .slider:before {
    background-color: white;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-actions {
    flex-direction: column;
    width: 100%;
  }

  .save-settings-btn,
  .reset-settings-btn {
    width: 100%;
    justify-content: center;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .switch-group {
    flex-direction: row;
  }
}
</style> 