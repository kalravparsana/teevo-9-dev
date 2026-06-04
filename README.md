# teevo-9-dev — Developer Integration Repository

Integration workspace for the Teevo golf club management platform.

## Structure

| Path | Description |
|---|---|
| `Frontend/` | Teevo R1 React frontend (aligned with Launchpad patterns) |
| `launchpad-frontend/` | Launchpad reference submodule (YorkIE-Launchpad/teevo-9) |
| `backend/plan/` | Backend integration plans per release |

## Frontend (R1 / 1.0.3)

```bash
cd Frontend
npm install --include=dev
npm run dev          # http://localhost:5173
```

## E2E Tests

Playwright specs live under `Frontend/automation-tests/`. Port is resolved dynamically via `PW_DEV_PORT`, `VITE_PORT`, or defaults to **5173**.

```bash
cd Frontend
# Requires @playwright/test installed in the project
npx playwright test automation-tests/index.ts
```

Set `VITE_FRONTEND_URL=http://localhost:<port>` to override the base URL.

## Backend Plan

See [`backend/plan/backend-vR1-release1-0-3.md`](backend/plan/backend-vR1-release1-0-3.md) for API contracts, auth model, database schema, and integration steps.

## Submodule

```bash
git submodule update --init --recursive
```

If the submodule cannot be cloned, `Frontend/` is synced from the platform main branch and matches `launchpad-frontend/` reference patterns (Vite Launchpad HMR config, Tailwind test exclusions, role-based SPA navigation).
