document.addEventListener("DOMContentLoaded", () => {

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loginForm = document.getElementById("loginForm");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const loginBtn = document.getElementById("loginBtn");
    
    // VALIDATION

    function validateEmail() {
        const regex = /^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = regex.test(email.value);

        emailError.textContent = isValid ? "" : "Enter registered business email";
        email.classList.toggle("invalid", !isValid);
        email.classList.toggle("valid", isValid);

        return isValid;
    }

    function validatePassword() {
        const isValid = password.value.length > 0;
        passwordError.textContent = isValid ? "" : "Password is required";
        return isValid;
    }

    function toggleLoginButton()
    {
        const isEmailOk = /^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
        const isPassOk = password.value.length >= 8;
        loginBtn.disabled = !(isEmailOk&&isPassOk);
    }
   
    //event listeners

    email.addEventListener("input",()=>{validateEmail(), toggleLoginButton()});
    password.addEventListener("input",()=>{validatePassword(), toggleLoginButton()});


    // PASSWORD HASHING
    
    async function hashPassword(pass) {
        const encoder = new TextEncoder();
        const data = encoder.encode(pass);
        const hash = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

   
    // FORM SUBMIT

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validateEmail() || !validatePassword()) return;

        try {
            const passwordHash = await hashPassword(password.value);

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbwJYhi9OePlDMM7V8snq-1dUukoxr1F6_kVCeeOr4tYy1uMJi4Pb1I2r30u591cpR6q8Q/exec",
                {
                    method: "POST",
                    body: JSON.stringify({
                        action: "LOGIN",
                        email: email.value,
                        passwordHash: passwordHash
                    })
                }
            );

            const text = await response.text();

            if (text === "LOGIN_SUCCESS") { 
                alert("Login successful!");

                // session (basic)
                sessionStorage.setItem("loggedInUser", email.value);

                window.location.href = "home.html";
            } else {
                alert("Invalid email or password");
            }

        } catch (err) {
            console.error(err);
            alert("Login failed. Try again.");
        }
    });

});
