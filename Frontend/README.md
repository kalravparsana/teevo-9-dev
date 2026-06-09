# Teevo Frontend (R1 — 1.0.0)

Integration copy of the Launchpad-generated golf club management UI, aligned with `launchpad-frontend/` patterns.

## Stack

- React 19, TypeScript, Vite 8, Tailwind CSS 4
- In-memory demo state (backend wiring via `src/api/`)

## Development

```bash
npm install --include=dev
npm run dev
```

Default dev server: `http://127.0.0.1:5173` (override with `--port` or `VITE_DEV_PORT`).

## Environment

| Variable | Default | Purpose |
|----------|---------|---------|
| `VITE_API_URL` | `http://localhost:5000/api` | Backend base URL |
| `VITE_APP_VERSION` | `1.0.0` | Display / telemetry |

## E2E tests

See `automation-tests/README.md`. Config: `playwright.config.ts` (dynamic port via `PW_DEV_PORT` / `VITE_DEV_PORT`).

```bash
npm run test:e2e
```

## Backend integration

See `../backend/plan/backend-vR1-release1-0-0.md`.
