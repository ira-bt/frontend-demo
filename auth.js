document.addEventListener("DOMContentLoaded", () => {
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const terms = document.getElementById("terms");
    const registerBtn = document.getElementById("registerBtn");
    const registerForm = document.getElementById("registerForm");

    // Error spans
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");

    //Validation Logic

    function validateName() {
        const isValid = fullName.value.trim().length >= 2;
        nameError.textContent = isValid ? "" : "Enter Full Name (min 2 chars)";
        fullName.classList.toggle("invalid", !isValid);
        fullName.classList.toggle("valid", isValid);
        return isValid;
    }

    function validateEmail() {
        const regex = /^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = regex.test(email.value);
        emailError.textContent = isValid ? "" : "Only Business Email is Allowed!";
        email.classList.toggle("invalid", !isValid);
        email.classList.toggle("valid", isValid);
        return isValid;
    }

    function validatePassword() {
        
        const val = password.value;

        const rules = {
            length: val.length >= 8,
            upper: /[A-Z]/.test(val),
            lower: /[a-z]/.test(val),
            number: /[0-9]/.test(val),
            special: /[@$!%*?&]/.test(val)
        };

        let errors = [];

        if (!rules.length) errors.push("• At least 8 characters");
        if (!rules.upper) errors.push("• 1 uppercase letter");
        if (!rules.lower) errors.push("• 1 lowercase letter");
        if (!rules.number) errors.push("• 1 number");
        if (!rules.special) errors.push("• 1 special character (@$!%*?&)");

        if (errors.length > 0) {
            passwordError.innerHTML = "Password must contain:<br>" + errors.join("<br>");
            password.classList.add("invalid");
            password.classList.remove("valid");
            return false;
        }

        passwordError.textContent = "";
        password.classList.remove("invalid");
        password.classList.add("valid");
        return true;
    }

    function validateConfirm() {
        const isValid = confirmPassword.value === password.value && confirmPassword.value !== "";
        confirmError.textContent = isValid ? "" : "Passwords don't match";
        confirmPassword.classList.toggle("invalid", !isValid);
        confirmPassword.classList.toggle("valid", isValid);
        return isValid;
    }

    // This function runs on every keystroke to enable/disable the button
    function toggleSubmitButton() {
        const isNameOk = fullName.value.trim().length >= 2;
        const isEmailOk = /^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
        const isPassOk = password.value.length >= 8;
        const isMatch = password.value === confirmPassword.value;
        const isTermsChecked = terms.checked;

        registerBtn.disabled = !(isNameOk && isEmailOk && isPassOk && isMatch && isTermsChecked);
    }

    // Event Listeners

    fullName.addEventListener("input", () => { validateName(); toggleSubmitButton(); });
    email.addEventListener("input", () => { validateEmail(); toggleSubmitButton(); });
    password.addEventListener("input", () => { validatePassword(); toggleSubmitButton(); });
    confirmPassword.addEventListener("input", () => { validateConfirm(); toggleSubmitButton(); });
    terms.addEventListener("change", toggleSubmitButton);

    // Password Hashing

    async function hashPassword(pass) {
        const encoder = new TextEncoder();
        const data = encoder.encode(pass);
        const hash = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    // Form Submission

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Final verification
        if (validateName() && validateEmail() && validatePassword() && validateConfirm()) {
            registerBtn.disabled = true;
            registerBtn.textContent = "Processing...";

            try {
                const passwordHash = await hashPassword(password.value);
                const payload = {
                    fullName: fullName.value,
                    email: email.value,
                    passwordHash: passwordHash
                };

                const response = await fetch("https://script.google.com/macros/s/AKfycbxmGT7OffRiZgfEtd0EpmpmkeYQqBMkIX5OnRf7WAj0-_yLlOG-xIvQeZ6Tx3p2pmfb3A/exec", {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });

                const text = await response.text();

                if (text == "SUCCESS") {
                    alert("Registration successful!");
                    window.location.href = "login.html";
                } 
                else if (text === "EMAIL_ALREADY_EXISTS") {
                    alert("Email already registered. Please login.");
                    registerForm.reset();
                    document.getElementById("registerBtn").textContent = "Register";
                }
                else {
                    alert(text);
                }

            } catch (error) {
                console.error("Error:", error);
                alert("Registration failed. Check console for details.");
                registerBtn.disabled = false;
                registerBtn.textContent = "Register";
            }
        }
    });
});