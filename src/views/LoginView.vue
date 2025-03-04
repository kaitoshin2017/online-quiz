<template>
    <body>
  <div class="container">
        <!-- Login Form -->
        <div class="form-section">
            <h2>Login</h2>
            <form onsubmit="validateForm(event)">
                <div>
                    <label>Username</label>
                    <input type="text" id="username">
                </div>
                <div>
                    <label>ID</label>
                    <input type="text" id="userId">
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" id="password">
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        
        <!-- Quote Section -->
        <div class="quote-section">
            <p>“Anything worth having takes time.”</p>
        </div>
    </div>
</body>
</template>

<style>
body{

display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #ffe4e6;
    font-family: Arial, sans-serif;
    margin: 0;
}

/* Container */
.container {
    display: flex;
    background: white;
    border-radius: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    overflow: hidden;
}

/* Login Form Section */
.form-section {
    width: 50%;
    padding: 30px;
}

h2 {
    color: #db2777;
    font-size: 24px;
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #444;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 10px;
    outline: none;
    transition: 0.3s;
}

input:focus {
    border-color: #db2777;
    box-shadow: 0 0 5px rgba(219, 39, 119, 0.5);
}

button {
    width: 100%;
    background: #ec4899;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #db2777;
}

/* Quote Section */
.quote-section {
    width: 50%;
    background: #fbcfe8;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;
    font-style: italic;
    color: #831843;
    font-size: 18px;
}
</style>
<script>
        function validateForm(event) {
            event.preventDefault();
            
            const username = document.getElementById("username").value.trim();
            const userId = document.getElementById("userId").value.trim();
            const password = document.getElementById("password").value.trim();
            
            if (username === "" || userId === "" || password === "") {
                alert("All fields are required!");
                return;
            }
            
            alert("Login successful!");
        };
</script>