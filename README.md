# Frontend Demo Project – Authentication & Theme Toggle

A clean, modern frontend project built using **pure HTML, CSS, and Vanilla JavaScript**, demonstrating **authentication flow**, **persistent theme toggling**, and **scalable CSS architecture** without using any frameworks.

This project is designed to be **beginner-friendly yet industry-aligned**, focusing on how things work **behind the scenes**.

---

## Features

- Register & Login flow using **Local Storage**
- Light / Dark theme toggle with persistence
- Theme preference saved across pages
- Modular CSS structure (base + page-specific)
- Form validation (including terms & conditions)
- Responsive and clean UI
- Easy to extend for backend integration

---

## Theme Toggle Implementation

- All theme colors are defined using CSS variables in `base.css`
- Default (light) theme is defined inside `:root`
- Dark theme overrides are applied using the `data-theme="dark"` attribute
- JavaScript toggles the theme by updating the attribute on the `<html>` element
- Selected theme is stored in `localStorage` and applied on page load

---

## Authentication Flow

### Register

- User fills in the registration form
- Business email validation is applied
- Terms & conditions checkbox must be checked
- User details are saved in google sheets

### Login

- User enters email and password
- Credentials are validated against stored data
- Successful login redirects to the Home page and login status gets stored in session storage
- Invalid credentials show an error message

---

## JavaScript Overview

### auth.js

- Handles user registration
- Validates login credentials
- Manages redirects after authentication

### theme.js

- Reads theme preference from `localStorage`
- Applies theme on initial page load
- Toggles between light and dark themes
- Ensures theme consistency across all pages

---

## CSS Architecture

- `base.css` contains global styles and theme variables
- Page-specific CSS files handle individual page styling
- CSS variables ensure easy theme switching and scalability

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)

## Apps script code:
```javascript
const USER_HEADERS = [
  "Full Name",
  "Email",
  "Password Hash",
  "Created At"
];

const CONTACT_HEADERS = [
  "Name",
  "Email",
  "Subject",
  "Message",
  "Created At"
];

function emailExists(sheet,email)
{
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false;
  }
   const emails = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1)
                      .getValues()
                      .flat()
                      .map(e => e.toString().toLowerCase().trim());

  return emails.includes(email);
}

function getOrCreateSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);

  // 1️⃣ Sheet does not exist → create it
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    return sheet;
  }

  // 2️⃣ Sheet exists → validate headers
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];

  const headersMissing = headers.some((header, index) => {
    return firstRow[index] !== header;
  });

  if (headersMissing) {
    // Insert headers safely without deleting data
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  return sheet;
}


function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(
      "13gYiWckcCLD2H7_Kdl_ymyJBsiHI6Ov83e0R0NSWmZY"
    );

    
    
    //registration

    if(!data.action)
    {
      const userSheet = getOrCreateSheet(ss, "Users", USER_HEADERS);
      
      const email = data.email.toLowerCase().trim();

      if(emailExists(userSheet,email))
      {
        return ContentService
          .createTextOutput("EMAIL_ALREADY_EXISTS")
          .setMimeType(ContentService.MimeType.TEXT);
      }

      userSheet.appendRow([
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
      const contactSheet = getOrCreateSheet(ss, "ContactUs", CONTACT_HEADERS);
     
      contactSheet.appendRow([
        data.name,
        data.email,
        data.subject,
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
  finally{
      lock.releaseLock();
  }
}
