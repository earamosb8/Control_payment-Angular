# 📅 Payment Date Tracker

An Angular web application for registering users and their payment dates. The system automatically highlights overdue payments in red when a month or more has passed since the last recorded payment date — no backend required, all data is stored in the browser's `localStorage`.

🚀 **Live Demo** You can check out the project here:  
[https://earamosb8.github.io/Control_payment-Angular/](https://earamosb8.github.io/Control_payment-Angular/)

---

## ✨ Features

- 📝 **User registration** with real-time field validation.
- 🚫 **Duplicate detection** by ID number.
- 🚨 **Automatic visual alerts** when a payment is overdue (30+ days).
- 🪟 **User editing** via a modal dialog.
- 🗑️ **User deletion** from the list.
- 🔍 **Search and filtering** by ID number.
- 💾 **Data persistence** using `localStorage`.
- 🔔 **Notifications** powered by **SweetAlert2**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Angular** | Main framework |
| **TypeScript** | Development language |
| **Reactive Forms** | Form handling and validation |
| **localStorage** | In-browser data persistence |
| **SweetAlert2** | Alerts and notifications |

---

## 📋 User Data Structure

Each user record contains the following fields:

| Field | Type | Validation |
| :--- | :--- | :--- |
| `nombre` | Text | Required, letters and spaces only |
| `identificacion` | Number | Required, digits only, no duplicates |
| `celular` | Number | Required, digits only |
| `fecha` | Date | Required — tracks payment due status |

---

## ⚙️ Overdue Payment Logic

When rendering the user table, each row's payment date is compared against the current date. If **30 or more days** have passed since the recorded `fecha`, the date cell is highlighted in red, signaling that the user's payment is overdue.

---

## 🧠 Core Functions

- **`guardarUsuario()`**: Validates form fields, checks for duplicate IDs, and saves to `localStorage`.
- **`cargarUsuarios()`**: Reads data from `localStorage` and restores date strings as `Date` objects.
- **`eliminarUsuario(user)`**: Removes a user and updates the storage.
- **`editarUsuario(user)`**: Opens the edit modal and pre-populates the form.
- **`editarUsuarioSeleccionado()`**: Saves changes from the modal and updates `localStorage`.
- **`buscarUsuario()`**: Filters the list in real-time by ID number.
- **`limpiarCampos()`**: Resets the form states (`pristine` and `untouched`).

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run in development mode
ng serve 
 ```
Open your browser at `http://localhost:4200`.
 
---
 ##📌 Notes
 
-💻 **Storage**: All data is stored exclusively in the browser via `localStorage`. Clearing browser data will permanently delete all registered users.
-📅 **Date Handling**: The `fecha` field is serialized as an ISO string when saved and deserialized back to a `Date` object on load using the `reviver` function in `JSON.parse`.
-⚡ **Performance**: The overdue check runs on the client side every time the table renders — no scheduled jobs or server-side logic required.
-🛡️ **Validation**: Duplicate ID validation is performed on the client side before saving to ensure data integrity.

