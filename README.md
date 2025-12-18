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

---
## Apps Script File

```javascript
function emailExists(sheet,email)
{
   const emails = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1)
                      .getValues()
                      .flat()
                      .map(e => e.toString().toLowerCase().trim());

  return emails.includes(email);
}
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(
      "1-P2kH6vVNk3Zr9U930JVgxXXqkpirDU8r8mRo_vylYQ"
    );

    
    
    //registration

    if(!data.action)
    {
      const sheet = ss.getSheetByName("Users");
      if (!sheet) {
        throw new Error("Sheet 'Users' not found");
      }
      const email = data.email.toLowerCase().trim();
      if(emailExists(sheet,email))
      {
        return ContentService
          .createTextOutput("EMAIL_ALREADY_EXISTS")
          .setMimeType(ContentService.MimeType.TEXT);
      }
      sheet.appendRow([
        data.fullName,
        email,
        data.passwordHash,
        new Date(),
      ]);

      return ContentService
        .createTextOutput("SUCCESS")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    //login

    if(data.action === "LOGIN")
    {
      const sheet = ss.getSheetByName("Users");
      if (!sheet) {
        throw new Error("Sheet 'Users' not found");
      }
      const rows = sheet.getDataRange().getValues();
      for(let i=1;i<rows.length;i++)
      {
        const storedEmail = rows[i][1];
        const storedHash  = rows[i][2];

        if(storedEmail === data.email && storedHash === data.passwordHash)
        {
          return ContentService.createTextOutput("LOGIN_SUCCESS");
        }
      }

      return ContentService.createTextOutput("INVALID_CREDENTIALS");

    }

    //contact us
    if(data.action === "CONTACT")
    {
      const contactSheet = ss.getSheetByName("ContactUs");
      if(!contactSheet)
      {
        throw new Error("ContactUs Sheet not found");
      }
      contactSheet.appendRow([
        data.name,
        data.email,
        data.message,
        new Date()
      ]);
      return ContentService.createTextOutput("CONTACT_SUCCESS");
    }
    return ContentService.createTextOutput("UNKNOWN_ACTION");

  } catch (err) {
    return ContentService
      .createTextOutput("ERROR: " + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
