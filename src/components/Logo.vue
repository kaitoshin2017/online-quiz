<template>
  <div class="logo-container">
    <div class="logo-icon">
      <div class="icon-circle">
        <i class="fas fa-brain"></i>
      </div>
    </div>
    <div class="logo-text">
      <span class="evo">Evo</span>
      <span class="quiz">Quiz</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo-container:hover {
  transform: scale(1.05);
}

.logo-icon {
  position: relative;
}

.icon-circle {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  position: relative;
  overflow: hidden;
}

.icon-circle::before {
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

.icon-circle i {
  font-size: 1.5rem;
  color: white;
  position: relative;
  z-index: 1;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.evo {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.quiz {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  letter-spacing: -0.5px;
}

/* Dark Mode Styles */
:global(.dark-mode) .quiz {
  color: #fff;
}

:global(.dark-mode) .icon-circle {
  box-shadow: 0 4px 15px rgba(123, 97, 255, 0.3);
}

/* Animation */
@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .logo-container {
    gap: 8px;
  }

  .icon-circle {
    width: 35px;
    height: 35px;
  }

  .icon-circle i {
    font-size: 1.3rem;
  }

  .evo, .quiz {
    font-size: 1.5rem;
  }
}
</style> 