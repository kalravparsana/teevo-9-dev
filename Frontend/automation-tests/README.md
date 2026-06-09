# Teevo Frontend — Playwright E2E

End-to-end tests for the single-page Teevo app (`src/`). Navigation uses sidebar `data-testid="nav-{id}"`; default view is **Add Club** (`nav-sa-add-club`).

## Prerequisites

- Node.js 18+
- Dev dependencies installed in `development-1/Frontend` (`@playwright/test`, etc.)

## Environment

| Variable | Purpose | Default |
|----------|---------|---------|
| `PW_DEV_PORT` | Vite dev server port for `webServer` | `5173` |
| `VITE_DEV_PORT` | Alias for dev port | same as above |
| `VITE_FRONTEND_URL` | Full app URL (overrides host + port) | `http://127.0.0.1:{port}` |
| `BASE_URL` | Playwright `baseURL` fallback | same as above |

Example:

```bash
export PW_DEV_PORT=5173
export VITE_FRONTEND_URL=http://127.0.0.1:5173
```

## Run (from `development-1/Frontend`)

```bash
# Full suite via single entrypoint
npx playwright test automation-tests/index.ts

# One feature folder
npx playwright test automation-tests/superadmin/add-club

# Headed / UI mode
npx playwright test automation-tests/index.ts --headed
npx playwright test automation-tests/index.ts --ui
```

`playwright.config.ts` starts `npm run dev` on `127.0.0.1` when the server is not already running.

## Layout

- `utils/navigation.ts` — `gotoHome()`, `navigateTo(navId)`, `gotoView()`
- `fixtures/mock-data/*.data.ts` — `valid` / `invalid` / `edge` / `api` sections per feature
- `{feature}/*.smoke|ui|form|api|error|edge|mobile|accessibility.spec.ts` — eight files per area
- `index.ts` — imports every spec once

Describe prefix: **`Teevo R1 > {Feature}`**.
