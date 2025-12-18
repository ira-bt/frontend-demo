# frontend-demo
# Authentication System (Register / Login / Contact Us)

A complete **frontend authentication system** built using **HTML, CSS, and Vanilla JavaScript**, integrated with **Google Sheets as a backend database** using **Google Apps Script**.

This project demonstrates a real-world **register → login → session → protected home page** flow with proper validation, password hashing, and data storage.

---

## Features

### Registration
- Full Name input
- Business email validation (blocks Gmail, Yahoo, Hotmail)
- Strong password rules:
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 special character
- Confirm password validation
- Terms & Conditions checkbox enforcement
- Password hashing using **SHA-256**
- User data stored securely in **Google Sheets**

---

### Login
- Login allowed **only for registered users**
- Password verified using hashed comparison
- Invalid credentials handling
- Session management using `sessionStorage`
- Redirects to protected home page

---

### Home Page
- Protected route (cannot access without login)
- Navigation bar with:
  - Home
  - Contact Us
  - Logout
- Logout clears session and redirects to login

---

### Contact Us
- Contact form visible via navbar
- Submissions stored in **Google Sheets**
- Client-side validation

---

### Security
- Passwords are **never stored in plain text**
- Uses browser’s **Web Crypto API**
- Session-based access control
- Prevents unauthorized page access

---

### Responsive Design
- Mobile-friendly
- Tablet & desktop compatible
- CSS media queries used

---

## Tech Stack

| Layer | Technology |
|-----|-----------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Google Apps Script |
| Database | Google Sheets |
| Security | SHA-256 Password Hashing |
| Session | sessionStorage |
| Deployment | Google Apps Script Web App |
