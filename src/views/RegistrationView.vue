<template>
  <div class="container">
    <!-- Left Side Panel -->
    <div class="left-panel">
      <img src="avatar.png" class="avatar" alt="User Avatar">
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
      this.avatar = event.target.files[0];
      console.log('Selected image: ', this.avatar);
      // Implement image handling logic if needed
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
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>

<style scoped>
* {
  font-family: Arial, sans-serif;
  text-align: center;
}

/* body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0A0F1F;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  height: 50dvh;
  justify-content: center;
  align-items: center;
  padding: 32px 48px;
  background: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, .2);
}

h3 {
  padding-right: 100px;
  font-family: sans-serif;
  font-weight: 20px;
  font-size: 30px;
}

h1 {
  color: #00698f;
  padding-left: 69%;
}

h2 {
  color: #00698f;
  padding-right: 90%;
}

section {
  margin-left: 3%;
}

.sec2 {
  margin-right: 3%;
}

.right-column {
  background-color: #ccc;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 90%;
  border-radius: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

input[type="text"],
input[type="password"] {
  width: 90%;
  height: 10px;
  margin-bottom: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: 20px;
  border: 1px solid black;
  color: #888;
}

button {
  width: 100%;
  height: 48px;
  background: #7494ec;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
}

.password-input {
  position: relative;
}

.password-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  color: #333;
} */
</style>
