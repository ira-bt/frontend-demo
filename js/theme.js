// Dark Mode Theme Toggle
;(() => {
  const themeToggle = document.getElementById("themeToggle")
  const htmlElement = document.documentElement

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light"

  // Apply saved theme on page load
  if (currentTheme === "dark") {
    htmlElement.setAttribute("data-theme", "dark")
  }

  // Toggle theme when button is clicked
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      htmlElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)

      // Add smooth transition animation
      htmlElement.style.transition = "none"
      setTimeout(() => {
        htmlElement.style.transition = ""
      }, 50)
    })
  }
})()
