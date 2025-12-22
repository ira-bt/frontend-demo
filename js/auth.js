document.addEventListener("DOMContentLoaded", () => {
  const fullName = document.getElementById("fullName")
  const email = document.getElementById("email")
  const password = document.getElementById("password")
  const confirmPassword = document.getElementById("confirmPassword")
  const terms = document.getElementById("terms")
  const registerBtn = document.getElementById("registerBtn")
  const registerForm = document.getElementById("registerForm")
  const loginBtn = document.getElementById("loginBtn")
  const loginForm = document.getElementById("loginForm")

  // Error spans
  const nameError = document.getElementById("nameError")
  const emailError = document.getElementById("emailError")
  const passwordError = document.getElementById("passwordError")
  const confirmError = document.getElementById("confirmError")

//   // Declare Validators and APP_CONFIG variables
//   const Validators = {
//     validateName: (name) => name.trim().length >= 2,
//     validateEmail: (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
//     validatePassword: (pass) => {
//       const hasUpperCase = /[A-Z]/.test(pass)
//       const hasLowerCase = /[a-z]/.test(pass)
//       const hasNumber = /[0-9]/.test(pass)
//       const hasSpecial = /[@$!%*?&]/.test(pass)
//       return {
//         length: pass.length >= 8,
//         upper: hasUpperCase,
//         lower: hasLowerCase,
//         number: hasNumber,
//         special: hasSpecial,
//       }
//     },
//   }

//   const APP_CONFIG = {
//     API_BASE_URL: "https://example.com/api",
//   }

  //Validation Logic

  function validateName() {
    const isValid = Validators.validateName(fullName.value)
    nameError.textContent = isValid ? "" : "Enter Full Name (min 2 chars)"
    fullName.classList.toggle("invalid", !isValid)
    fullName.classList.toggle("valid", isValid)
    return isValid
  }

  function validateEmail() {
    const isValid = Validators.validateEmail(email.value)
    emailError.textContent = isValid ? "" : "Only Business Email is Allowed!"
    email.classList.toggle("invalid", !isValid)
    email.classList.toggle("valid", isValid)
    return isValid
  }

  function validatePassword() {
    const rules = Validators.validatePassword(password.value)

    const errors = []

    if (!rules.length) errors.push("• At least 8 characters")
    if (!rules.upper) errors.push("• 1 uppercase letter")
    if (!rules.lower) errors.push("• 1 lowercase letter")
    if (!rules.number) errors.push("• 1 number")
    if (!rules.special) errors.push("• 1 special character (@$!%*?&)")

    if (errors.length > 0) {
      passwordError.innerHTML = "Password must contain:<br>" + errors.join("<br>")
      password.classList.add("invalid")
      password.classList.remove("valid")
      return false
    }

    passwordError.textContent = ""
    password.classList.remove("invalid")
    password.classList.add("valid")
    return true
  }

  function validateConfirm() {
    const isValid = confirmPassword.value === password.value && confirmPassword.value !== ""
    confirmError.textContent = isValid ? "" : "Passwords don't match"
    confirmPassword.classList.toggle("invalid", !isValid)
    confirmPassword.classList.toggle("valid", isValid)
    return isValid
  }

  // Simple validation for login
  function validateLoginEmail() {
    const isValid = email && email.value.trim().length > 0 && email.value.includes("@")
    if (emailError) {
      emailError.textContent = isValid ? "" : "Please enter a valid email"
    }
    return isValid
  }

  function validateLoginPassword() {
    const isValid = password && password.value.length >= 6
    if (passwordError) {
      passwordError.textContent = isValid ? "" : "Password must be at least 6 characters"
    }
    return isValid
  }

  // This function runs on every keystroke to enable/disable the button
  function toggleSubmitButton() {
    if (registerBtn && fullName && confirmPassword && terms) {
      const isNameOk = fullName.value.trim().length >= 2
      const isEmailOk = /^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)
      const isPassOk = password.value.length >= 8
      const isMatch = password.value === confirmPassword.value
      const isTermsChecked = terms.checked

      registerBtn.disabled = !(isNameOk && isEmailOk && isPassOk && isMatch && isTermsChecked)
    }

    if (loginBtn && email && password) {
      loginBtn.disabled = !(validateLoginEmail() && validateLoginPassword())
    }
  }

  // Event Listeners
  if (fullName) {
    fullName.addEventListener("input", () => {
      validateName()
      toggleSubmitButton()
    })
  }

  if (email) {
    email.addEventListener("input", () => {
      if (registerForm) validateEmail()
      if (loginForm) validateLoginEmail()
      toggleSubmitButton()
    })
  }

  if (password) {
    password.addEventListener("input", () => {
      if (registerForm) validatePassword()
      if (loginForm) validateLoginPassword()
      toggleSubmitButton()
    })
  }

  if (confirmPassword) {
    confirmPassword.addEventListener("input", () => {
      validateConfirm()
      toggleSubmitButton()
    })
  }

  if (terms) {
    terms.addEventListener("change", toggleSubmitButton)
  }

  // Password Hashing

  async function hashPassword(pass) {
    const encoder = new TextEncoder()
    const data = encoder.encode(pass)
    const hash = await crypto.subtle.digest("SHA-256", data)
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  }

  // Form Submission

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Final verification
      if (validateName() && validateEmail() && validatePassword() && validateConfirm()) {
        registerBtn.disabled = true
        registerBtn.textContent = "Processing..."

        try {
          const passwordHash = await hashPassword(password.value)
          const payload = {
            fullName: fullName.value,
            email: email.value,
            passwordHash: passwordHash,
          }

          const response = await fetch(APP_CONFIG.API_BASE_URL, {
            method: "POST",
            body: JSON.stringify(payload),
          })

          const text = await response.text()

          if (text == "SUCCESS") {
            alert("Registration successful!")
            window.location.href = "login.html"
          } else if (text === "EMAIL_ALREADY_EXISTS") {
            alert("Email already registered. Please login.")
            registerForm.reset()
            registerBtn.textContent = "Register"
          } else {
            alert(text)
            registerForm.reset()
            registerBtn.textContent = "Register"
          }
        } catch (error) {
          console.error("Error:", error)
          alert("Registration failed. Check console for details.")
          registerBtn.disabled = false
          registerBtn.textContent = "Register"
        }
      }
    })
  }

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      if (validateLoginEmail() && validateLoginPassword()) {
        loginBtn.disabled = true
        loginBtn.textContent = "Signing In..."

        // Simulate login - in production, this would be an API call
        setTimeout(() => {
          // Store user session
          sessionStorage.setItem("isLoggedIn", "true")
          sessionStorage.setItem("loggedInUser", email.value)
          sessionStorage.setItem("userEmail", email.value)

          // Redirect to home
          window.location.href = "home.html"
        }, 800)
      }
    })
  }
})
