document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")

  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    window.location.href = "login.html"
    return
  }

  // Mobile navigation toggle
  const navToggle = document.getElementById("navToggle")
  const navLinks = document.getElementById("navLinks")

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show")
    })
  }

  // Logout functionality
  const logoutLink = document.getElementById("logoutLink")
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault()

      // Clear session
      sessionStorage.removeItem("isLoggedIn")
      sessionStorage.removeItem("userEmail")

      // Redirect to login
      window.location.href = "login.html"
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})
