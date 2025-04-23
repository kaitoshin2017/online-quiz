<template>
  <div class="settings">
    <div class="section-header">
      <h2>System Settings</h2>
      <div class="settings-actions">
        <button class="save-settings-btn" @click="saveSettings">
          <i class="fas fa-save"></i> Save Settings
        </button>
        <button class="reset-settings-btn" @click="resetSettings">
          <i class="fas fa-undo"></i> Reset to Default
        </button>
      </div>
    </div>

    <div class="settings-grid">
      <div class="settings-card">
        <h3>General Settings</h3>
        <div class="settings-form">
          <div class="form-group">
            <label>System Name</label>
            <input type="text" v-model="settings.systemName" class="form-input">
          </div>
          <div class="form-group">
            <label>System Email</label>
            <input type="email" v-model="settings.systemEmail" class="form-input">
          </div>
          <div class="form-group">
            <label>Time Zone</label>
            <select v-model="settings.timezone" class="form-select">
              <option v-for="tz in timezones" :key="tz" :value="tz">
                {{ tz }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="settings-card">
        <h3>Security Settings</h3>
        <div class="settings-form">
          <div class="form-group">
            <label>Password Policy</label>
            <select v-model="settings.passwordPolicy" class="form-select">
              <option value="basic">Basic</option>
              <option value="medium">Medium</option>
              <option value="strong">Strong</option>
            </select>
          </div>
          <div class="form-group">
            <label>Session Timeout (minutes)</label>
            <input type="number" v-model="settings.sessionTimeout" class="form-input">
          </div>
          <div class="form-group">
            <label>Two-Factor Authentication</label>
            <div class="toggle-switch">
              <input type="checkbox" v-model="settings.twoFactorAuth" id="twoFactorAuth">
              <label for="twoFactorAuth"></label>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-card">
        <h3>Notification Settings</h3>
        <div class="settings-form">
          <div class="form-group">
            <label>Email Notifications</label>
            <div class="toggle-switch">
              <input type="checkbox" v-model="settings.emailNotifications" id="emailNotifications">
              <label for="emailNotifications"></label>
            </div>
          </div>
          <div class="form-group">
            <label>System Notifications</label>
            <div class="toggle-switch">
              <input type="checkbox" v-model="settings.systemNotifications" id="systemNotifications">
              <label for="systemNotifications"></label>
            </div>
          </div>
          <div class="form-group">
            <label>Notification Frequency</label>
            <select v-model="settings.notificationFrequency" class="form-select">
              <option value="realtime">Real-time</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      settings: {
        systemName: 'Online Quiz System',
        systemEmail: 'admin@example.com',
        timezone: 'UTC',
        passwordPolicy: 'medium',
        sessionTimeout: 30,
        twoFactorAuth: true,
        emailNotifications: true,
        systemNotifications: true,
        notificationFrequency: 'realtime'
      },
      timezones: ['UTC', 'EST', 'PST', 'GMT']
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
.settings {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  color: #4a90e2;
  font-size: 1.8rem;
  margin: 0;
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  border-radius: 3px;
}

.settings-actions {
  display: flex;
  gap: 15px;
}

.save-settings-btn, .reset-settings-btn {
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
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

.save-settings-btn:hover, .reset-settings-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

.reset-settings-btn {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.settings-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(74, 144, 226, 0.1);
}

.settings-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.settings-card h3 {
  margin: 0 0 20px;
  color: #333;
  font-size: 1.2rem;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #666;
  font-size: 0.9rem;
}

.form-input, .form-select {
  padding: 12px 15px;
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.toggle-switch {
  position: relative;
  width: 60px;
  height: 30px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 30px;
}

.toggle-switch label:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.toggle-switch input:checked + label {
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
}

.toggle-switch input:checked + label:before {
  transform: translateX(30px);
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .settings {
    background: rgba(30, 30, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .settings-card {
    background: rgba(40, 40, 40, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .settings-card h3 {
    color: #fff;
  }

  .form-group label {
    color: #aaa;
  }

  .form-input, .form-select {
    background: rgba(40, 40, 40, 0.9);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.1);
  }

  .form-input:focus, .form-select:focus {
    border-color: #7b61ff;
    box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.1);
  }

  .toggle-switch label {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .toggle-switch input:checked + label {
    background: linear-gradient(135deg, #7b61ff, #4a90e2);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 15px;
  }

  .settings-actions {
    width: 100%;
  }

  .save-settings-btn, .reset-settings-btn {
    flex: 1;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style> 