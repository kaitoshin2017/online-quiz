<template>
  <div class="container">
    <!-- Left Side Panel -->
    <div class="left-panel">
      <img v-if="avatar" :src="URL.createObjectURL(avatar)" class="avatar" alt="User Avatar">
      <h2>Let's get you set up</h2>
      <p>It's quick and easy.</p>
      <button class="next-btn" @click="goToNextStep">➡</button>
    </div>

    <!-- Right Side Form -->
    <div class="right-panel">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>ID:</label> <span>3</span>
        </div>

        <div class="input-row">
          <input v-model="form.firstName" type="text" placeholder="First Name" required>
          <input v-model="form.middleName" type="text" placeholder="Middle Name">
          <input v-model="form.lastName" type="text" placeholder="Last Name" required>
        </div>

        <div class="gender-group">
          <label>Gender:</label>
          <input type="radio" id="male" value="Male" v-model="form.gender">
          <label for="male">♂ Male</label>
          <input type="radio" id="female" value="Female" v-model="form.gender">
          <label for="female">♀ Female</label>
        </div>

        <div class="form-group">
          <label>Date of Birth:</label>
          <input v-model="form.dob" type="date">
        </div>

        <div class="form-group">
          <label>Profile Image:</label>
          <input type="file" @change="handleImageUpload" id="imageUpload">
          <label for="imageUpload" class="file-btn">Select Image</label>
        </div>

        <div class="input-row">
          <input v-model="form.username" type="text" placeholder="Username" required>
          <input v-model="form.password" type="password" id="password" placeholder="Password" required>
          <input v-model="form.confirmPassword" type="password" id="confirmPassword" placeholder="Confirm P.W.">
        </div>

        <div class="show-pass">
          <input type="checkbox" v-model="showPassword" id="showPassword">
          <label for="showPassword">Show Password</label>
        </div>

        <div class="buttons">
          <button type="button" class="cancel-btn" @click="cancel">Cancel</button>
          <button type="submit" class="register-btn">Register</button>
        </div>

        <p class="login-text">Already have an account? <a href="#">Login</a></p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dob: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      showPassword: false,
      avatar: null
    };
  },
  methods: {
    goToNextStep() {
      console.log("Next step");
      // Implement next step logic (e.g., showing another form or saving data)
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatar = file;
      }
    },
    handleSubmit() {
      if (this.form.password !== this.form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Process the registration form
      console.log("Form submitted:", this.form);
      // Reset form after submission (if needed)
      this.resetForm();
    },
    cancel() {
      console.log("Registration cancelled");
      this.resetForm();
    },
    resetForm() {
      this.form = {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dob: '',
        username: '',
        password: '',
        confirmPassword: ''
      };
      this.showPassword = false;
      this.avatar = null; // Clear avatar
    }
  }
};
</script>

<style scoped>
/* General styles for layout */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

/* Container for the form */
.container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;
  background-color: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, .2);
}

/* Left panel with image */
.left-panel {
  width: 35%;
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
  width: 60%;
  padding: 16px;
}

/* Form Inputs */
input[type="text"],
input[type="password"],
input[type="date"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* Buttons */
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

/* Password show checkbox */
.show-pass {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

/* Cancel button */
.cancel-btn {
  background-color: #f44336;
  margin-top: 10px;
}

/* Login link */
.login-text {
  text-align: center;
  margin-top: 20px;
}

.login-text a {
  color: #00698f;
  text-decoration: none;
}
</style>
