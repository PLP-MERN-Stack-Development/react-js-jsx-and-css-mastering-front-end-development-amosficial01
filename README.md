# React + Tailwind CSS – Week 3 Front-End Master

A responsive single-page application built with **React 18**, **Vite**, **React Router v6**, **Tailwind CSS**, and **Context API**.  
Demonstrates component architecture, state management with hooks, custom hooks, external API integration, and a full light/dark theme toggle.

---

## 🚀 Live Demo
https://react-js-week3-amosficial01.vercel.app

---

## 📸 Screenshots
| Home | Tasks | Posts |
|------|-------|-------|
| ![Home](./screenshots/home.png) | ![Tasks](./screenshots/tasks.png) | ![Posts](./screenshots/posts.png) |

---

## ✨ Features
- **Task Manager** – add, complete, delete, filter (All / Active / Completed); persists to `localStorage`
- **Posts Browser** – searchable, paginated feed from JSONPlaceholder API
- **Dark-mode toggle** – persists across reloads using Tailwind’s `dark:` utilities
- **Fully responsive** – mobile-first layout (sm → md → lg)
- **Reusable UI kit** – Button, Card, SearchBar, Layout, etc.

---

## 🛠️ Tech Stack
- React 18 + functional components + hooks (`useState`, `useEffect`, `useContext`)
- React Router v6 for client-side routing
- Tailwind CSS + `darkMode: 'class'`
- Custom hook: `useLocalStorage`
- REST API: JSONPlaceholder (`/posts`)
- Bundler: Vite

---

## ⚙️ Local Setup
```bash
# 1. clone your GitHub Classroom repo
git clone https://github.com/YOUR_USERNAME/react-js-jsx-and-css-mastering-front-end-development-YOUR_USERNAME.git
cd react-js-jsx-and-css-mastering-front-end-development-YOUR_USERNAME

# 2. install dependencies
npm install

# 3. start dev server
npm run dev