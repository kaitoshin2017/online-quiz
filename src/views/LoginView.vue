<template>
<body>
    <div class="container">
        <div class="login-box">
            <h2>Online Quiz</h2>
            <!-- <p>Quiz System</p> -->
            <h3>LOG IN</h3>
            <div class="input-group">
                <input type="text" placeholder="Username">
            </div>
            <div class="input-group">
                <input type="password" id="password" placeholder="Password">
                <!-- <label><input type="checkbox" onclick="togglePassword()">Show Password</label> -->
            </div>
            <button class="btn">LOG IN</button>
            <button class="btn btn-outline">ADMIN</button>
            <p>Don't have an account? <a href="#">Sign up now!</a></p>
            <!-- <p>&copy; 2025</p> -->
        </div>
        <!-- <div class="image-box">
            <img src="OIP.jpg" alt="POS System" width="250">
        </div> -->
    </div>
</body>
</template>

<style>

body {
            background-color: #8B0000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .container {
            background: white;
            width: 800px;
            padding: 20px;
            border-radius: 15px;
            display: flex;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .login-box {
            flex: 1;
            padding: 20px;
        }
        .login-box h2 {
            margin-bottom: 10px;
        }
        .input-group {
            margin-bottom: 15px;
        }
        .input-group input {
            width: 97%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 2px;
        }
        .input-group label {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .btn {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background: #8B0000;
            color: white;
            font-size: 16px;
            cursor: pointer;
            margin-bottom: 10px;
        }
        .btn-outline {
            background: none;
            border: 2px solid #8B0000;
            color: #8B0000;
        }
        .btn:hover {
            opacity: 0.8;
        }
        /* .image-box {
            flex: 1;
            background: #F4A9A1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
        } */
         p{
           padding-left: 232px;
         }
</style>


<script>

        // function togglePassword() {
        //     var password = document.getElementById("password");
        //     password.type = password.type === "password" ? "text" : "password";
        // }
   
        function validateForm(event) {
            event.preventDefault();
            
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            
            if (username === "" || password === "") {
                alert("All fields are required!");
                return;
            }
            
            alert("Login successful!");
        }

        function adminLogin() {
            alert("Redirecting to admin login...");
            // You can add logic here to redirect to an admin page
        }
</script>