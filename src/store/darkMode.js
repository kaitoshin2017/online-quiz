import { reactive } from 'vue'

const state = reactive({
  isDarkMode: false
})

export const darkModeStore = {
  state,
  toggleDarkMode() {
    state.isDarkMode = !state.isDarkMode
    document.documentElement.classList.toggle('dark-mode')
    localStorage.setItem('darkMode', state.isDarkMode)
  },
  init() {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode === 'true') {
      state.isDarkMode = true
      document.documentElement.classList.add('dark-mode')
    }
  }
} 