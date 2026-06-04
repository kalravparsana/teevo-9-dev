# teevo-9-dev

Developer integration repository for **Teevo** (Frontend R1, release 1.0.2).

## Layout

| Path | Purpose |
|------|---------|
| `Frontend/` | Integration frontend (aligned with Launchpad patterns; includes API stubs and test IDs) |
| `launchpad-frontend/` | Git submodule reference (`YorkIE-Launchpad/teevo-9`) — initialize with `git submodule update --init` when credentials are available |
| `backend/plan/` | Backend integration plans per release |
| `tests/teevo/R1/release-1-0-2/` | Playwright E2E specs (generation-only in CI; run locally with app up) |
| `pages/`, `fixtures/`, `utils/` | Shared Playwright helpers |

## Submodule note

If `launchpad-frontend/` is empty, clone failed (private repo). `Frontend/` was seeded from the Launchpad preview workspace and enhanced with:

- `src/services/api.ts` — REST path contracts  
- `data-testid` / ARIA hooks for automation  
- `playwright.config.ts` — dynamic port via `PW_DEV_PORT`, `PORT`, `BASE_URL`, or `VITE_FRONTEND_URL`

Compare changes:

```bash
diff -rq launchpad-frontend/src Frontend/src
```

## Frontend development

```bash
cd Frontend
npm install --include=dev
npm run dev
```

Default dev URL: `http://localhost:5173`

## Playwright (local)

```bash
cd Frontend
export BASE_URL=http://localhost:5173   # or PW_DEV_PORT=5173
npx playwright test --config=playwright.config.ts
```

Specs live under `../tests/teevo/R1/release-1-0-2/`.

## Backend

See [`backend/plan/backend-vR1-release1-0-2.md`](backend/plan/backend-vR1-release1-0-2.md) for API contracts, auth, deployment, and integration steps.
