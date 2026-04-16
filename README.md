# User Management App

An Angular web application for registering, editing, searching, and deleting users. Data is persisted in the browser's `localStorage` — no backend required.

---

## Features

- User registration with real-time field validation
- Duplicate detection by ID number
- User editing via a modal dialog
- User deletion from the list
- Search and filtering by ID number
- Data persistence using `localStorage`
- Notifications powered by **SweetAlert2**

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Angular | Main framework |
| TypeScript | Development language |
| Reactive Forms (`FormControl`) | Form handling and validation |
| localStorage | In-browser data persistence |
| SweetAlert2 | Alerts and notifications |

---

## User Data Structure

Each user record contains the following fields:

| Field | Type | Validation |
|---|---|---|
| `nombre` | Text | Required, letters and spaces only |
| `identificacion` | Number | Required, digits only, no duplicates |
| `celular` | Number | Required, digits only |
| `fecha` | Date | Required |

---

## Core Functions

### `guardarUsuario()`
Validates all form fields, checks that the ID number is not already registered, and saves the new user to `localStorage`. On success, clears all form fields.

### `cargarUsuarios()`
Reads users from `localStorage` and updates the table. Uses a `reviver` function to restore date strings as `Date` objects.

### `eliminarUsuario(user)`
Removes a user from the list by reference and updates `localStorage`.

### `editarUsuario(user)`
Opens the edit modal and pre-populates the form fields with the selected user's data.

### `editarUsuarioSeleccionado()`
Saves the changes made in the edit modal, updates the array and `localStorage`, and closes the modal.

### `buscarUsuario()`
Filters the user list by matching the search input against the start of each user's ID number. If the field is empty, the full list is restored.

### `limpiarCampos()`
Resets the registration `FormControl` fields, clearing their values and restoring `pristine` and `untouched` states.

---

## Getting Started

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

## Notes

- All data is stored exclusively in the browser via `localStorage`. Clearing browser data will permanently delete all registered users.
- The `fecha` field is serialized as an ISO string when saved and deserialized back to a `Date` object on load using the `reviver` function in `JSON.parse`.
- Duplicate ID validation is performed on the client side before saving.
