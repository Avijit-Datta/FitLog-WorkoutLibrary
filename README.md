<div align="center">

# 🏋️ FitLog — Workout Library

**Browse workouts, build your daily plan, and track progress — fast.**

A sleek **React + TypeScript** workout library that pulls exercises from a **live REST API**,
lets you **plan today’s workouts**, **save favorites**, and keeps everything persisted via **localStorage**.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![React Toastify](https://img.shields.io/badge/React--Toastify-Toasts-FFCC00)](https://fkhadra.github.io/react-toastify/)

🔗 [**Live Demo**](https://fitlog-workout-library-mu.vercel.app/) &nbsp;•&nbsp; 📦 [**Repository**](https://github.com/Avijit-Datta/FitLog-WorkoutLibrary)

</div>

---

## 📖 About the Project

**FitLog** is a workout library app that lets users **browse gym exercises**, **filter/search/sort**
the list, and add workouts into **Today’s Plan** with a live counter in the navbar.

Users can also **save workouts for later**, open a **full workout detail page** (instructions + key stats),
and track progress by **marking workouts as done**. All selections persist using **localStorage**
(so they survive refresh).

Data is loaded from a **live REST API**:

- All workouts: `https://api.api-store.workers.dev/api/fitlog`
- Single workout: `https://api.api-store.workers.dev/api/fitlog/:id`

---

## 🖼️ Screenshots

<div align="center">

<table>
  <tr>
    <td align="center" width="33%">
      <strong>Workout Library (Home)</strong><br/>
      <img src="./screenshots/home.png" alt="Workout Library Home" />
    </td>
    <td align="center" width="33%">
      <strong>Workout Details</strong><br/>
      <img src="./screenshots/details.png" alt="Workout Details Page" />
    </td>
    <td align="center" width="33%">
      <strong>Today’s Plan</strong><br/>
      <img src="./screenshots/my-plan.png" alt="Today's Plan Page" />
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <strong>Saved Workouts</strong><br/>
      <img src="./screenshots/saved.png" alt="Saved Workouts Page" />
    </td>
    <td align="center" width="33%">
      <strong>Search • Filter • Sort</strong><br/>
      <img src="./screenshots/filters.png" alt="Search Filter Sort UI" />
    </td>
    <td align="center" width="33%">
      <strong>Toastify notification</strong><br/>
      <img src="./screenshots/toastify-notification.png" alt="404 Not Found Page" />
    </td>
  </tr>
</table>

</div>

---

## 🛠️ Technology Used

- ⚛️ **React 19** + **TypeScript** — UI + type safety
- ⚡ **Vite** — build tool + dev server
- 🎨 **Tailwind CSS v4** — styling
- 🧭 **React Router DOM v6** — routing
- 🔔 **React Toastify** — toast notifications
- 💾 **localStorage** — persistent client-side state

---

## ✨ Features

1. **🌐 Live REST API workouts**
   Browse workouts fetched from a real API endpoint (not hardcoded data).

2. **🔎 Powerful discovery tools**
   **Filter** by difficulty (Beginner / Intermediate / Advanced), **search** by name / muscle group / equipment,
   and **sort** by duration, calories, or rating.

3. **🗓️ Today’s Plan + progress tracking**
   Add workouts to **Today’s Plan**, see a live navbar counter, and **mark workouts as done**.

4. **⭐ Save for later**
   Keep a separate **Saved** list for workouts you want to revisit.

5. **📊 Live totals by tab**
   On **My Plan**, minutes + calories totals update dynamically depending on the active tab.

6. **📄 Full workout detail pages + 404**
   Dedicated workout pages with instructions + stats, plus a friendly **404** route for unknown paths.

7. **💾 Persistent state**
   Your plan + saved list survive refresh using **localStorage**.

---

## 🔗 Links

- **GitHub Repository:** https://github.com/Avijit-Datta/FitLog-WorkoutLibrary  
- **Live Site:** https://fitlog-workout-library-mu.vercel.app/ 

---