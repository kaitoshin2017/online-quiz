<template>
  <div class="container">
    <div class="left-panel">
      <section>
        <img v-if="avatar" :src="URL.createObjectURL(avatar)" class="avatar" alt="User Avatar" />
        <img v-else src="default-avatar.png" class="avatar" alt="Default Avatar" /> <!-- Default avatar -->
        <h2>Let's get you set up</h2>
        <p>It's quick and easy.</p>
        <button class="next-btn" @click="goToNextStep">➡</button>
      </section>
    </div>

    <div class="middle-panel">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>ID:</label> <span>3</span>
        </div>

        <div class="input-row">
          <input v-model="form.firstName" type="text" placeholder="First Name" required />
          <input v-model="form.lastName" type="text" placeholder="Last Name" required />
        </div>

        <div class="form-group">
          <label>Date of Birth:</label>
          <input v-model="form.dob" type="date" required />
        </div>
      </form>
    </div>

    <div class="right-panel">
      <div class="form-group">
        <label>Profile Image:</label>
        <input type="file" @change="handleImageUpload" id="imageUpload" />
        <label for="imageUpload" class="file-btn">Select Image</label>
      </div>

      <div class="input-row">
        <input v-model="form.username" type="text" placeholder="Username" required />
        <input v-model="form.section" type="section" placeholder="Section" required />
        <input v-model="form.password" type="password" id="password" placeholder="Password" required />
        <input v-model="form.confirmPassword" type="password" id="confirmPassword" placeholder="Confirm P.W." />
      </div>

      <div class="show-pass">
        <input type="checkbox" v-model="showPassword" id="showPassword" />
        <label for="showPassword">Show Password</label>
      </div>

      <div class="buttons">
        <button type="button" class="cancel-btn" @click="cancel">Cancel</button>
        <button type="submit" class="register-btn">Register</button>
      </div>

      <p class="login-text">Already have an account? <a href="#">Login</a></p>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    // Define reactive state
    const form = reactive({
      firstName: '',
      lastName: '',
      dob: '',
      username: '',
      section: '',
      password: '',
      confirmPassword: ''
    });
    
    const showPassword = ref(false);
    const avatar = ref(null);

    // Methods
    const goToNextStep = () => {
      console.log("Next step");
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        avatar.value = file;
      }
    };

    const handleSubmit = () => {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Optionally, add more validations for other fields if necessary
      if (!form.firstName || !form.lastName || !form.username) {
        alert("Please fill out all required fields.");
        return;
      }

      console.log("Form submitted:", form);

      // Optionally handle avatar upload logic here (e.g., upload to server)

      // Reset form
      resetForm();
    };

    const cancel = () => {
      console.log("Registration cancelled");
      resetForm();
    };

    const resetForm = () => {
      form.firstName = '';
      form.lastName = '';
      form.dob = '';
      form.username = '';
      form.section = '';
      form.password = '';
      form.confirmPassword = '';
      showPassword.value = false;
      avatar.value = null;

      // Manually reset the file input
      const fileInput = document.getElementById("imageUpload");
      if (fileInput) {
        fileInput.value = '';  // Clear file input
      }
    };

    // Return state and methods for use in template
    return {
      form,
      showPassword,
      avatar,
      goToNextStep,
      handleImageUpload,
      handleSubmit,
      cancel
    };
  }
};
</script>







<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  display: grid; /* Use grid instead of flex */
  grid-template-columns: 1fr 2fr 1fr; /* Defines three columns: left (avatar), middle (form), right (extra inputs) */
  gap: 20px; /* Adds space between columns */
  padding: 32px 48px;
  background-color: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, .2);
}

.left-panel,
.middle-panel,
.right-panel {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.left-panel {
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
}

h2 {
  color: #00698f;
}

button.next-btn {
  background-color: #7494ec;
  border: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
}

.right-panel {
  /* No need to set width here, as it's defined by the grid layout */
}

input[type="text"],
input[type="section"],
input[type="password"],
input[type="date"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background-color: #7494ec;
  padding: 12px;
  width: 100%;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.show-pass {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.cancel-btn {
  background-color: #f44336;
  margin-top: 10px;
}

.login-text {
  text-align: center;
  margin-top: 20px;
}

.login-text a {
  color: #00698f;
  text-decoration: none;
}
</style>
