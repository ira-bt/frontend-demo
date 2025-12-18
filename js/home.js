document.addEventListener("DOMContentLoaded", () => {

    // SESSION CHECK
    const user = sessionStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "login.html";
    }

    // NAV LINKS
    const homeLink = document.getElementById("homeLink");
    const contactLink = document.getElementById("contactLink");
    const logoutLink = document.getElementById("logoutLink");

    const homeSection = document.getElementById("homeSection");
    const contactSection = document.getElementById("contactSection");

    const contactBtn = document.getElementById("contactBtn");

    homeLink.addEventListener("click", () => {
        homeSection.classList.remove("hidden");
        contactSection.classList.add("hidden");
    });

    contactLink.addEventListener("click", () => {
        contactSection.classList.remove("hidden");
        homeSection.classList.add("hidden");
    });

    logoutLink.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "login.html";
    });

    // CONTACT FORM
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    function validateContactForm() {
        let valid = true;

        if (nameInput.value.trim().length < 2) {
            nameError.textContent = "Enter valid name";
            valid = false;
        } else nameError.textContent = "";

        if (!emailInput.value.includes("@")) {
            emailError.textContent = "Enter valid email";
            valid = false;
        } else emailError.textContent = "";

        if (messageInput.value.trim().length < 5) {
            messageError.textContent = "Message too short";
            valid = false;
        } else messageError.textContent = "";

        return valid;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validateContactForm()) return;

        contactBtn.disabled = true;
        contactBtn.textContent = "Sending...";

        try {
            const response = await fetch(
                APP_CONFIG.API_BASE_URL,
                {
                    method: "POST",
                    body: JSON.stringify({
                        action:"CONTACT",
                        name: nameInput.value,
                        email: emailInput.value,
                        message: messageInput.value
                    })
                }
            );

            const text = await response.text();

            if (text === "CONTACT_SUCCESS") {
                alert("Message sent successfully!");
                form.reset();
            } else {
                alert(text);
            }

        } catch (err) {
            console.error(err);
            alert("Failed to send message");
            contactBtn.disabled = false;
            contactBtn.textContent = "Send";
        }
    });

});
