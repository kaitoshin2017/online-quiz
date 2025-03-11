<template>
  <link rel="stylesheet" href="boxicons.min.css">
  <body>
    <div class="container">
    
        <div class="left-panel">
            <img src="avatar.png" class="avatar" alt="User Avatar">
            <h2>Let's get you set up</h2>
            <p>It's quick and easy.</p>
            <button class="next-btn">➡</button>
        </div>

       
        <div class="right-panel">
            <form>
                <div class="form-group">
                    <label>ID:</label> <span>3</span>
                </div>

                <div class="input-row">
                    <input type="text" placeholder="First Name" required>
                    <input type="text" placeholder="Middle Name">
                    <input type="text" placeholder="Last Name" required>
                </div>

                <div class="gender-group">
                    <label>Gender:</label>
                    <input type="radio" id="male" name="gender" value="Male">
                    <label for="male">♂ Male</label>
                    <input type="radio" id="female" name="gender" value="Female">
                    <label for="female">♀ Female</label>
                </div>

                <div class="form-group">
                    <label>Date of Birth:</label>
                    <input type="date">
                </div>

                <div class="form-group">
                    <label>Profile Image:</label>
                    <input type="file" id="imageUpload">
                    <label for="imageUpload" class="file-btn">Select Image</label>
                </div>

                <div class="input-row">
                    <input type="text" placeholder="Username" required>
                    <input type="password" id="password" placeholder="Password" required>
                    <input type="password" id="confirmPassword" placeholder="Confirm P.W.">
                </div>

                <div class="show-pass">
                    <input type="checkbox" id="showPassword">
                    <label for="showPassword">Show Password</label>
                </div>

                <div class="buttons">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="register-btn">Register</button>
                </div>

                <p class="login-text">Already have an account? <a href="#">Login</a></p>
            </form>
        </div>
    </div>

  </body>
</template>




<script>
// export default {
//   data() {
//     return {
//       firstName: '',
//       lastName: '',
//       section: '',
//       username: '',
//       password: '',
//       confirmPassword: '',
//       passwordVisible: false,
//       confirmPasswordVisible: false,
//     };
//   },
//   methods: {
//     togglePasswordVisibility(field) {
//       if (field === 'password') {
//         this.passwordVisible = !this.passwordVisible;
//       } else if (field === 'confirmPassword') {
//         this.confirmPasswordVisible = !this.confirmPasswordVisible;
//       }
//     },
//     submitForm() {
//       if (this.password !== this.confirmPassword) {
//         return; 
//       }
    
//       console.log('Form submitted:', {
//         firstName: this.firstName,
//         lastName: this.lastName,
//         section: this.section,
//         username: this.username,
//         password: this.password, 
//       }); 
//       this.firstName = '';
//       this.lastName = '';
//       this.section = '';
//       this.username = '';
//       this.password = '';
//       this.confirmPassword = '';
//     },
//   },
// };
</script>

<style scoped>
* {
  font-family: Arial, sans-serif;
  text-align: center;
}

body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    margin: 0;
}

/* Container */
.container {
    display: flex;
    width: 800px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

/* Left Panel */
.left-panel {
    background: linear-gradient(to bottom, #b30000, #8b0000);
    color: white;
    text-align: center;
    padding: 40px;
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: white;
    padding: 10px;
}

.left-panel h2 {
    margin: 20px 0 10px;
}

.next-btn {
    background: white;
    border: none;
    color: #b30000;
    padding: 10px;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
    margin-top: 15px;
}


.right-panel {
    padding: 30px;
    width: 65%;
}

/* Form Inputs */
.input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

input[type="text"], input[type="password"], input[type="date"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* Gender Section */
.gender-group {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.gender-group input {
    accent-color: #b30000;
}

/* File Upload */
.file-btn {
    display: inline-block;
    padding: 10px;
    border: 1px solid #b30000;
    border-radius: 5px;
    cursor: pointer;
    color: #b30000;
}

input[type="file"] {
    display: none;
}

/* Show Password */
.show-pass {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 10px 0;
}

/* Buttons */
.buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.cancel-btn, .register-btn {
    padding: 12px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
}

.cancel-btn {
    background: white;
    border: 1px solid #b30000;
    color: #b30000;
}

.register-btn {
    background: linear-gradient(to right, #b30000, #8b0000);
    color: white;
}

.login-text {
    text-align: center;
    margin-top: 15px;
}
</style>
