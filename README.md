# teevo-9-dev

Developer integration repository for Teevo (Frontend R1 / release 1.0.1).

## Layout

| Path | Purpose |
|---|---|
| `launchpad-frontend/` | Launchpad reference UI (git submodule → `YorkIE-Launchpad/teevo-9`) |
| `Frontend/` | Integration frontend — align with `launchpad-frontend/` |
| `backend/plan/` | Backend integration plans |
| `tests/` | Playwright spec sources (generation only) |
| `pages/`, `fixtures/`, `utils/` | Shared test helpers |

## Frontend

```bash
cd Frontend
npm install
npm run dev   # http://localhost:5173 (strictPort)
```

## Submodule

```bash
git submodule update --init launchpad-frontend
```

## Tests

Specs live under `tests/teevo-r1/release-1-0-1/r1-1-0-1/`. Set port when needed:

```bash
export PW_DEV_PORT=5173
export BASE_URL=http://localhost:5173
```

See `backend/plan/backend-vR1-release1-0-1.md` for API integration.
