<template>
  <div class="flex h-screen bg-red-800 text-white">
    <!-- Left Side (Welcome Section) -->
    <div class="w-1/3 flex flex-col items-center justify-center bg-red-700 p-10">
      <div class="bg-white p-2 rounded-full">
        <img src="@/assets/profile-placeholder.png" alt="Profile" class="w-24 h-24 rounded-full">
      </div>
      <h2 class="text-2xl font-bold mt-4">Let's get you set up</h2>
      <p class="text-sm text-gray-300">It's quick and easy.</p>
      <button class="mt-4 bg-white text-red-700 p-2 rounded-full">
        ➜
      </button>
    </div>

    <!-- Right Side (Form Section) -->
    <div class="w-2/3 bg-white text-black p-10 rounded-lg">
      <div class="flex justify-between">
        <span class="text-gray-600">ID: <strong>3</strong></span>
        <div>
          <button class="text-red-600">Go back</button> |
          <button class="text-gray-600">Minimize</button> |
          <button class="text-red-600">Close</button>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="registerUser" class="mt-4">
        <div class="grid grid-cols-2 gap-4">
          <input v-model="firstName" type="text" placeholder="First Name" class="input-field">
          <input v-model="middleName" type="text" placeholder="Middle Name" class="input-field">
          <input v-model="lastName" type="text" placeholder="Last Name" class="input-field">
          <div class="flex items-center gap-2">
            <label>Gender:</label>
            <input type="radio" id="male" value="Male" v-model="gender">
            <label for="male">Male</label>
            <input type="radio" id="female" value="Female" v-model="gender">
            <label for="female">Female</label>
          </div>
        </div>

        <div class="mt-4">
          <label>Date of Birth:</label>
          <input v-model="dob" type="date" class="input-field w-full">
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block">Profile Picture:</label>
            <input type="file" @change="onImageChange" class="input-field">
          </div>
          <div>
            <img v-if="profilePicture" :src="profilePicture" class="w-16 h-16 rounded-full">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <input v-model="username" type="text" placeholder="Username" class="input-field">
          <input v-model="password" type="password" placeholder="Password" class="input-field">
          <input v-model="confirmPassword" type="password" placeholder="Confirm PW" class="input-field">
          <label class="flex items-center">
            <input type="checkbox" v-model="showPassword"> Show Password
          </label>
        </div>

        <div class="flex justify-between mt-6">
          <button type="button" class="btn-cancel">CANCEL</button>
          <button type="submit" class="btn-register">Register</button>
        </div>
      </form>

      <p class="mt-4 text-center text-sm">
        Already have an account? <a href="#" class="text-red-600">Login</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply border rounded-lg p-2 w-full;
}
.btn-register {
  @apply bg-red-700 text-white p-2 rounded-lg w-40;
}
.btn-cancel {
  @apply border border-red-700 text-red-700 p-2 rounded-lg w-40;
}
</style>

<script>
import { ref } from "vue";

export default {
  setup() {
    const firstName = ref("");
    const middleName = ref("");
    const lastName = ref("");
    const gender = ref("");
    const dob = ref("");
    const username = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const showPassword = ref(false);
    const profilePicture = ref(null);

    const onImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        profilePicture.value = URL.createObjectURL(file);
      }
    };

    const registerUser = () => {
      alert(Registered: ${firstName.value} ${lastName.value});
    };

    return {
      firstName, middleName, lastName, gender, dob,
      username, password, confirmPassword, showPassword,
      profilePicture, onImageChange, registerUser
    };
  },
};
</script>

<!-- <style scoped>
* {
  font-family: Arial, sans-serif;
  text-align: center;
} -->

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
<!-- </style> -->
