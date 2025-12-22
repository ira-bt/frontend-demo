/**
 * validators.js
 * -----------------------
 * Reusable validation utilities
 * Follows DRY & SRP principles
 */

const Validators = Object.freeze({

  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail|outlook)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  validateName(name) {
    return typeof name === "string" && name.trim().length >= 2;
  },

  validateEmail(email) {
    return this.EMAIL_REGEX.test(email);
  },

  validatePassword(password) {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password)
    };
  },

  isPasswordStrong(password) {
    const rules = this.validatePassword(password);
    return Object.values(rules).every(Boolean);
  },

  validateMessage(message) {
    return typeof message === "string" && message.trim().length >= 5;
  }
});