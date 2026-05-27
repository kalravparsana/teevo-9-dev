# Clearboard

A minimalist task management web application. Create, read, update, and delete tasks with priorities, due dates, search, filters, and sorting.

## Features

- Full CRUD for tasks
- Mark tasks complete or reopen them
- Priority levels and due dates
- Filter by status (all, active, completed)
- Search and sort tasks
- Dashboard with workspace overview
- Responsive layout with sidebar navigation
- Persistent storage in the browser

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router

## Getting started

```bash
npm install --include=dev
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  components/   # UI and feature components
  pages/        # Route pages
  layouts/      # App shell layouts
  hooks/        # Custom React hooks
  context/      # React context providers
  lib/          # Utilities
  data/         # Seed data
  types/        # TypeScript types
```
