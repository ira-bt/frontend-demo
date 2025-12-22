document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const contactName = document.getElementById("contactName")
  const contactEmail = document.getElementById("contactEmail")
  const subject = document.getElementById("subject")
  const message = document.getElementById("message")

  const nameError = document.getElementById("nameError")
  const emailError = document.getElementById("emailError")
  const subjectError = document.getElementById("subjectError")
  const messageError = document.getElementById("messageError")

  const successMessage = document.getElementById("successMessage")

  function validateName() {
    const isValid = Validators.validateName(contactName.value)
    nameError.textContent = isValid ? "" : "Name must be at least 2 characters"
    return isValid
  }

  function validateEmail() {
    const emailRegex = Validators.EMAIL_REGEX;
    const isValid = emailRegex.test(contactEmail.value)
    emailError.textContent = isValid ? "" : "Please enter a valid business email"
    return isValid
  }

  function validateSubject() {
    const isValid = subject.value.trim().length >= 3
    subjectError.textContent = isValid ? "" : "Subject must be at least 3 characters"
    return isValid
  }

  function validateMessage() {
    const isValid = Validators.validateMessage(message.value)
    messageError.textContent = isValid ? "" : "Message must be at least 10 characters"
    return isValid
  }

  contactName.addEventListener("input", validateName)
  contactEmail.addEventListener("input", validateEmail)
  subject.addEventListener("input", validateSubject)
  message.addEventListener("input", validateMessage)

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Validate all fields
    const isNameValid = validateName()
    const isEmailValid = validateEmail()
    const isSubjectValid = validateSubject()
    const isMessageValid = validateMessage()

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      contactBtn.disabled = true;
        contactBtn.textContent = "Sending...";

        try {
            const response = await fetch(
                APP_CONFIG.API_BASE_URL,
                {
                    method: "POST",
                    body: JSON.stringify({
                        action:"CONTACT",
                        name: contactName.value,
                        email: contactEmail.value,
                        subject:subject.value,
                        message: message.value
                    })
                }
            );

            const text = await response.text();

            if (text === "CONTACT_SUCCESS") {
                // Show success message
                contactForm.style.display = "none"
                successMessage.classList.add("show")
            } else {
                alert(text);
            }

        } catch (err) {
            console.error(err);
            alert("Failed to send message");
            contactBtn.disabled = false;
            contactBtn.textContent = "Send Message";
        }

      
      
      // // Show success message
      // contactForm.style.display = "none"
      // successMessage.classList.add("show")

      //Reset form after 3 seconds
      setTimeout(() => {
        contactForm.reset()
        contactForm.style.display = "flex"
        successMessage.classList.remove("show")
      }, 3000)
    }
  })
})