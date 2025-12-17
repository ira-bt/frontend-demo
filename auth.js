// document.addEventListener("DOMContentLoaded",()=>{
//     //Registration validation
//     const fullName = document.getElementById("fullName");
//     const email = document.getElementById("email");
//     const password = document.getElementById("password");
//     const confirmPassword = document.getElementById("confirmPassword");
//     const terms = document.getElementById("terms");
//     const registerBtn = document.getElementById("registerBtn");

//     const nameError = document.getElementById("nameError");
//     const emailError = document.getElementById("emailError");
//     const passwordError = document.getElementById("passwordError");
//     const confirmError = document.getElementById("confirmError");
//     const registerForm = document.getElementById("registerForm");
//     //Business Email validation
//     function validateEmail()
//     {
//         const regex = /^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         if(!regex.test(email.value))
//         {
//             emailError.textContent = "Only Business Email is Allowed!";
//             email.classList.add("invalid");
//             return false;
//         }
//         emailError.textContent="";
//         email.classList.remove("invalid");
//         email.classList.add("valid");
//         return true;
//     }

//     //password validation
//     function validatePassword()
//     {
//         const value = password.value;
//         const rules = {
//             length:value.length>=8,
//             uppercase:/[A-Z]/.test(value),
//             lowercase:/[a-z]/.test(value),
//             number:/[0-9]/.test(value),
//             special:/[@$!%*?&]/.test(value)
//         };
//         if(!rules.length)
//         {
//             passwordError.textContent = "Password must be at least 8 characters";
//         }
//         else if(!rules.uppercase)
//         {
//             passwordError.textContent = "Password must contain at least 1 uppercase letter";
//         }
//         else if(!rules.lowercase)
//         {
//             passwordError.textContent = "Password must contain at least 1 lowercase letter";
//         }
//         else if (!rules.number) 
//         {
//             passwordError.textContent = "Password must contain at least 1 number";
//         } 
//         else if (!rules.special) 
//         {
//             passwordError.textContent = "Password must contain at least 1 special character (@$!%*?&)";
//         } 
//         else
//         {
//             passwordError.textContent = "";
//             password.classList.remove("invalid");
//             password.classList.add("valid");
//             return true;
//         }
//         password.classList.add("invalid");
//         password.classList.remove("valid");
//         return false;
//     }

//     //confirm password validation
//     function validateConfirm()
//     {
//         if(password.value!==confirmPassword.value)
//         {
//             confirmError.textContent = "Passwords don't match";
//             confirmPassword.classList.add("invalid");
//             return false;
//         }
//         confirmError.textContent="";
//         confirmPassword.classList.remove("invalid");
//         confirmPassword.classList.add("valid");
//         return true;
//     }

//     //Name Validation
//     function validateName()
//     {
//         if(fullName.value.trim().length<2)
//         {
//             nameError.textContent = "Enter Full Name";
//             fullName.classList.add("invalid");
//             return false;
//         }
//         nameError.textContent = "";
//         fullName.classList.remove("invalid");
//         fullName.classList.add("valid");
//         return true;
//     }
//     function isFormValid()
//     {
//         const regexEmail = /^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         const pass = password.value;
        
//         return (
//             fullName.value.trim().length >= 2 &&
//             regexEmail.test(email.value) &&
//             pass.length >= 8 &&
//             /[A-Z]/.test(pass) &&
//             /[a-z]/.test(pass) &&
//             /[0-9]/.test(pass) &&
//             /[@$!%*?&]/.test(pass) &&
//             pass === confirmPassword.value &&
//             terms.checked
//         );
//     }
//     function toggleSubmitButton()
//     {
//         registerBtn.disabled = !isFormValid;
//     }

//     //For live validation
//     fullName?.addEventListener("input",toggleSubmitButton);
//     email?.addEventListener("input",toggleSubmitButton);
//     password?.addEventListener("input",toggleSubmitButton);
//     confirmPassword?.addEventListener("input",toggleSubmitButton);
//     terms?.addEventListener("change", toggleSubmitButton);

//     //submitting the registered form

//     async function hashpassword(password) {
//         const encoder = new TextEncoder();
//         const data = encoder.encode(password);
//         const hash = await crypto.subtle.digest("SHA-256",data);
//         return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,"0")).join("");
        
//     }
//     registerForm.addEventListener("submit",async (e)=>
//     {
//         e.preventDefault();
//         const isNameValid = validateName();
//         const isEmailValid = validateEmail();
//         const isPasswordValid = validatePassword();
//         const isConfirmValid = validateConfirm();

//         console.log({
//         isNameValid,
//         isEmailValid,
//         isPasswordValid,
//         isConfirmValid
//         });

//         if(isNameValid && isEmailValid && isPasswordValid && isConfirmValid)
//         {
//             const passwordHash = await hashpassword(password.value);
//             const response = await fetch("https://script.google.com/macros/s/AKfycbzian_lA3Ywqsf2kmuhjL92301BUgWv81JAgR7-6XPFRrPMgKLile7uG3LCwVi4FD0CpA/exec",{
//                 method: 'POST',
//                 headers: {"content-type":"application/json"},
//                 body: JSON.stringify({
//                     fullName: fullName.value,
//                     email: email.value,
//                     passwordHash
//                 })
//             });

//             const result = await response.json();
//             if(result.success)
//             {
//                 alert("Registration successful!");
//                 window.location.href="login.html";
//             }
//             else
//             {
//                 alert("Registration failed!! Try again.");
//             }
//         }
//         else
//         {
//             alert("Please fix the errors highlighted in the form");
//         }
//     });
// })

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

    // --- Validation Logic ---

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
        // const val = password.value;
        // const hasUpper = /[A-Z]/.test(val);
        // const hasLower = /[a-z]/.test(val);
        // const hasNum = /[0-9]/.test(val);
        // const hasSpecial = /[@$!%*?&]/.test(val);
        // const hasLength = val.length >= 8;

        // let msg = "";
        // if (!hasLength) msg = "Min 8 characters";
        // else if (!hasUpper) msg = "Need 1 uppercase";
        // else if (!hasLower) msg = "Need 1 lowercase";
        // else if (!hasNum) msg = "Need 1 number";
        // else if (!hasSpecial) msg = "Need 1 special char";

        // passwordError.textContent = msg;
        // const isValid = hasUpper && hasLower && hasNum && hasSpecial && hasLength;
        // password.classList.toggle("invalid", !isValid);
        // password.classList.toggle("valid", isValid);
        // return isValid;
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

    // --- Password Hashing ---

    async function hashPassword(pass) {
        const encoder = new TextEncoder();
        const data = encoder.encode(pass);
        const hash = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    // --- Form Submission ---

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

                const response = await fetch("https://script.google.com/macros/s/AKfycbzNyIpi1rexxA-K6IHg1uKMknAZlVRtssjqW1Vin2pPpgpBCd2KOl3YIby38I8Y3glIFw/exec    ", {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });

                const text = await response.text();

                if (text == "SUCCESS") {
                    alert("Registration successful!");
                    window.location.href = "login.html";
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