# teevo-9-dev

Developer integration repository for Teevo R1 (release 1.0.0).

| Path | Description |
|------|-------------|
| `Frontend/` | Application UI (aligned with Launchpad patterns) |
| `launchpad-frontend/` | Launchpad submodule reference (`teevo-9`) |
| `backend/plan/` | Backend integration plans |

## Quick start

```bash
cd Frontend
npm install --include=dev
npm run dev
```

## Submodule

```bash
git submodule update --init launchpad-frontend
```

Compare `launchpad-frontend/` with `Frontend/` after submodule updates to pick up Launchpad changes.
