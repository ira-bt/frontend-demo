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

    const heroSection = document.getElementById("heroSection");
    const contactSection = document.getElementById("contactSection");

    const contactBtn = document.getElementById("contactBtn");
    const userEmail = document.getElementById("userEmail");

    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    userEmail.textContent = user;
    // homeLink.addEventListener("click", () => {
    //     heroSection.classList.remove("hidden");
    //     contactSection.classList.add("hidden");
    // });

    // contactLink.addEventListener("click", () => {
    //     contactSection.classList.remove("hidden");
    //     heroSection.classList.add("hidden");
    // });
    
    //SCROLL HELPERS
    function scrollToSection(section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    //NAV CLICK HANDLERS

    function closeMobileMenu() {
        navLinks.classList.remove("show");
    }


    homeLink.addEventListener('click', e => {
        e.preventDefault();
        scrollToSection(heroSection);
        closeMobileMenu();
    });

    contactLink.addEventListener('click', e => {
        e.preventDefault();
        scrollToSection(contactSection);
        closeMobileMenu();
    });


    logoutLink.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "login.html";
    });

    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // ACTIVE LINK ON SCROLL
    const sections = [
        { section: heroSection, link: homeLink },
        { section: contactSection, link: contactLink }
    ];

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                sections.forEach(item => item.link.classList.remove("active"));
                const activeItem = sections.find(item => item.section === entry.target);
                activeItem?.link.classList.add("active");
            }
            });
        },
        { threshold: 0.6 }
    );

    sections.forEach(item => observer.observe(item.section));


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

        if (!Validators.validateName(nameInput.value)) {
            nameError.textContent = "Enter valid name";
            valid = false;
        } else nameError.textContent = "";

        if (!Validators.validateEmail(emailInput.value)) {
            emailError.textContent = "Enter valid email";
            valid = false;
        } else emailError.textContent = "";

        if (Validators.validateMessage(messageInput.value)) {
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
