# 🏛️ Historical Artifacts Tracker

A full-stack web application to explore, add, and track historically significant artifacts such as the Rosetta Stone, Antikythera Mechanism, and more. Users can register, login, add artifacts, like artifacts, and manage their own submissions.

## 🌐 Live Website
👉 [Visit Live Site](https://your-live-site-url.web.app)

---

## 🎯 Project Purpose

The aim of this project is to demonstrate the ability to:
- Create a full-stack CRUD application.
- Implement authentication and authorization.
- Use JWT for secure communication.
- Handle protected/private routes.
- Build user-friendly responsive UI with React, Tailwind, and animations.
- Apply problem-solving and clean code practices.

---

## 🧩 Key Features

### 🖼️ Home Page
- Beautiful animated slider with historical themes.
- Top 6 featured artifacts sorted by like count.
- See All button navigates to full artifact listing.
- Two extra informative sections.
- Framer Motion animation.

### 🔐 Authentication
- Register/Login with email & password.
- Google authentication.
- Password validation with uppercase, lowercase, and min 6 chars.
- SweetAlert/Toast notifications on success/failure.

### 📋 Add Artifact (Private)
- Form to submit new artifact.
- Dropdown selection for type.
- Pre-filled adder name and email.
- Stores in MongoDB with like count = 0 initially.

### 📑 Artifact Details (Private)
- Full artifact info.
- Like/Dislike button with toggle functionality.
- Syncs likes with backend.

### 📚 All Artifacts Page
- List of all artifacts.
- Search functionality based on name.
- View Details for full info.

### ❤️ Liked Artifacts Page (Private)
- See all artifacts liked by the current user.
- Friendly message if no liked items.

### 🧍 My Artifacts Page (Private)
- View all artifacts added by the logged-in user.
- Update & Delete functionality.
- Secure user-specific access.

### ✏️ Update Artifact (Private)
- Pre-filled form for editing artifact.
- Like count and adder info remains unaffected.

### ❌ Delete Artifact
- Confirmation popup before delete.
- Redirects to All Artifacts page after deletion.

### 🛡️ JWT Protected Routes
- JWT stored on login and sent with each request.
- Verifies user with token for protected routes.

### 🔍 Search
- Search by artifact name (server-side filtering).

### 📱 Responsive Design
- Optimized for mobile, tablet, and desktop devices.

### ⚠️ 404 Page
- Friendly 404 not found page for invalid routes.

### 🔄 Dynamic Page Title
- Changes tab title based on current route.

### 🔄 Spinner
- Shown during data loading using custom spinner.

---

## 🧰 Tech Stack

### Client:
- React
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- Firebase Auth
- React Hot Toast
- SweetAlert2
- Shadcn/UI (Optional)

### Server:
- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken, express-jwt)
- CORS, dotenv

---

## 📦 NPM Packages Used

### Client:
- `axios`
- `react-router-dom`
- `firebase`
- `react-hot-toast`
- `sweetalert2`
- `framer-motion`
- `clsx` / `classnames` (optional for conditional styling)

### Server:
- `express`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `mongodb`

---

## 🔐 Environment Variables

### `.env` (Client)
