# Teevo — Golf Club Management

React + TypeScript + Tailwind CSS app with role-based sidebar navigation for **Superadmin**, **Club Admin**, and **Player** workflows.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4

## Development

```bash
npm install --include=dev
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Layout

- **Sidebar** — three role sections with distinct nav items
- **Top bar** — notifications toggle and app settings dropdown
- **Main panel** — role-specific forms and data views

## Assumptions

- Demo mode: all role sections are navigable without authentication (single workspace for prototyping).
- In-memory state only; no backend API at runtime (see `src/services/api.ts` for planned REST paths).

## Release

- **Frontend version:** R1  
- **Release:** 1.0.2  
- **Backend plan:** `../backend/plan/backend-vR1-release1-0-2.md`  
- **E2E specs:** `../tests/teevo/R1/release-1-0-2/`
