# Backend Integration Plan — Frontend R1 / Release 1.0.3

| Field | Value |
|-------|-------|
| Frontend version | R1 |
| Release | 1.0.3 |
| Frontend path | `development-1/Frontend/` |
| Reference UI | `launchpad-frontend/` submodule (`YorkIE-Launchpad/teevo-9`) |
| Target API style | REST JSON over HTTPS |
| Auth model (recommended) | JWT access + refresh tokens, role claims |

## 1. Purpose

The R1 Teevo frontend is a single-page application with role-based views (Superadmin, Club Admin, Player). Today it runs entirely on in-memory mock data (`src/data/mockData.ts`). This plan defines the backend services, contracts, and integration steps required for release **1.0.3** without changing the visual shell.

## 2. Frontend capability map (what the backend must support)

| UI view | Role | Current behavior | Backend capability |
|---------|------|------------------|-------------------|
| Add Club | superadmin | POST-like create club | `POST /api/v1/clubs` |
| Manage Users | superadmin | List/create/delete users | `GET/POST/DELETE /api/v1/users` |
| Club Details | superadmin | Select club, update fields | `GET/PATCH /api/v1/clubs/:id` |
| Tee Time Slots | clubadmin | Generate slots, toggle availability | `GET/PUT /api/v1/clubs/:clubId/tee-slots` |
| Operating Hours | clubadmin | Per-day open/close/closed | `GET/PUT /api/v1/clubs/:clubId/hours` |
| Tournaments (admin) | clubadmin | Create/cancel tournaments | `GET/POST/DELETE /api/v1/clubs/:clubId/tournaments` |
| Game Bookings | clubadmin | Confirm/decline/cancel bookings | `GET/PATCH /api/v1/clubs/:clubId/bookings` |
| Scorecards | clubadmin | Read-only list | `GET /api/v1/clubs/:clubId/scorecards` |
| Browse Clubs | player | Search + join club | `GET /api/v1/clubs`, `POST /api/v1/players/me/clubs/:clubId/join` |
| Tournaments (player) | player | Book spot | `GET /api/v1/tournaments`, `POST /api/v1/tournaments/:id/register` |
| Leaderboard | player | Ranked results | `GET /api/v1/leaderboard` |

## 3. Recommended service topology

```
┌─────────────┐     HTTPS      ┌──────────────────┐
│  Frontend   │ ─────────────► │  API Gateway /   │
│  (Vite SPA) │                │  BFF (optional)  │
└─────────────┘                └────────┬─────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    ▼                     ▼                     ▼
            ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
            │ Auth Service │      │ Club Service │      │ Booking Svc  │
            └──────────────┘      └──────────────┘      └──────────────┘
                    │                     │                     │
                    └─────────────────────┴─────────────────────┘
                                          ▼
                                   ┌─────────────┐
                                   │ PostgreSQL  │
                                   └─────────────┘
```

For R1, a **modular monolith** (NestJS, FastAPI, or Express + Prisma) is sufficient; split services only when load or team boundaries require it.

## 4. Data contracts (TypeScript-aligned)

Types mirror `Frontend/src/data/mockData.ts`. All IDs are UUID strings in production; dates are ISO-8601 (`YYYY-MM-DD`).

### 4.1 Club

```json
{
  "id": "uuid",
  "name": "Pine Valley Golf Club",
  "location": "New Jersey, USA",
  "holes": 18,
  "memberCount": 420
}
```

| Method | Path | Body | Response |
|--------|------|------|----------|
| GET | `/api/v1/clubs` | — | `Club[]` |
| POST | `/api/v1/clubs` | `{ name, location, holes }` | `Club` 201 |
| GET | `/api/v1/clubs/:id` | — | `Club` |
| PATCH | `/api/v1/clubs/:id` | partial Club | `Club` |

Validation: `name` and `location` required (matches frontend); `holes` ∈ {9, 18, 27}.

### 4.2 User

```json
{
  "id": "uuid",
  "name": "Sam Rivera",
  "email": "sam@example.com",
  "role": "player",
  "clubId": "uuid-or-null",
  "phone": "+1 555-0103",
  "handicapCount": 14
}
```

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/v1/users` | Superadmin only |
| POST | `/api/v1/users` | Role + optional clubId |
| DELETE | `/api/v1/users/:id` | Soft-delete preferred |

### 4.3 Tournament

```json
{
  "id": "uuid",
  "name": "Spring Classic",
  "clubName": "Pine Valley Golf Club",
  "clubId": "uuid",
  "date": "2026-04-12",
  "format": "Stroke Play",
  "spotsLeft": 8,
  "maxPlayers": 32
}
```

| Method | Path |
|--------|------|
| GET | `/api/v1/tournaments?clubId=` |
| POST | `/api/v1/clubs/:clubId/tournaments` |
| DELETE | `/api/v1/tournaments/:id` |
| POST | `/api/v1/tournaments/:id/register` | Player books; decrements `spotsLeft` transactionally |

### 4.4 Tee time slot

```json
{
  "id": "uuid",
  "time": "07:00",
  "intervalMinutes": 10,
  "available": true
}
```

`PUT /api/v1/clubs/:clubId/tee-slots` accepts `{ startTime, intervalMinutes, slotCount }` to replace generated day slots (matches “Generate Slots” UI).

### 4.5 Operating hours

```json
{
  "monday": { "open": "06:30", "close": "20:00", "closed": false }
}
```

`PUT /api/v1/clubs/:clubId/hours` — seven keys, same shape as frontend `DayHours`.

### 4.6 Game booking

```json
{
  "id": "uuid",
  "playerName": "Sam Rivera",
  "playerId": "uuid",
  "date": "2026-06-05",
  "teeTime": "09:20",
  "players": 4,
  "status": "pending"
}
```

`PATCH /api/v1/bookings/:id` body `{ "status": "confirmed" | "cancelled" }`.

### 4.7 Leaderboard entry

```json
{
  "rank": 1,
  "playerName": "Chris Park",
  "tournamentName": "Spring Classic",
  "score": 68,
  "par": 72
}
```

`GET /api/v1/leaderboard?tournamentId=` — computed from scorecards.

### 4.8 Scorecard

```json
{
  "id": "uuid",
  "playerName": "Sam Rivera",
  "course": "Pine Valley",
  "date": "2026-05-28",
  "gross": 82,
  "net": 74
}
```

Read-only in R1 UI.

## 5. Authentication and authorization

### 5.1 Login flow (recommended for 1.0.3)

1. `POST /api/v1/auth/login` — `{ email, password }` → `{ accessToken, refreshToken, user }`
2. Frontend stores `accessToken` in memory (or httpOnly cookie if same-site BFF).
3. Attach `Authorization: Bearer <token>` on all API calls.

### 5.2 Role claims (JWT)

```json
{
  "sub": "user-uuid",
  "role": "superadmin | clubadmin | player",
  "clubId": "uuid-or-null"
}
```

| Role | Scope |
|------|-------|
| superadmin | All clubs and users |
| clubadmin | Single `clubId` from token |
| player | Self profile, join clubs, register for tournaments |

### 5.3 Frontend integration points

- Replace `useState` seed data in `App.tsx` with API hooks (React Query / SWR).
- Filter sidebar sections by `user.role` from auth context (today all sections visible).
- On `401`, redirect to `/login` (add auth route group per Launchpad patterns).

## 6. Error contract

All non-2xx responses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Club name and location are required.",
    "fields": { "name": "required" }
  }
}
```

| HTTP | Use case |
|------|----------|
| 400 | Validation |
| 401 | Missing/invalid token |
| 403 | Role mismatch |
| 404 | Entity not found |
| 409 | Duplicate email / tournament full |
| 500 | Unexpected server error |

Frontend should map `message` to inline form errors (already done locally in Add Club).

## 7. Environment variables

| Variable | Consumer | Example |
|----------|----------|---------|
| `VITE_API_BASE_URL` | Frontend build | `https://api.teevo.example/api/v1` |
| `VITE_FRONTEND_URL` | Playwright / preview | `http://127.0.0.1:5173` |
| `DATABASE_URL` | Backend | PostgreSQL connection string |
| `JWT_SECRET` | Backend auth | strong random secret |
| `CORS_ORIGIN` | Backend | frontend origin |

## 8. Deployment considerations

| Layer | Recommendation |
|-------|----------------|
| Frontend | Static assets on CDN or object storage; Vite `build` → `dist/` |
| API | Container on ECS/K8s or PaaS; health `GET /health` |
| DB | PostgreSQL 15+; migrations via Flyway/Prisma |
| CI | Lint + unit tests + Playwright against preview URL |
| Secrets | No secrets in frontend bundle; use IAM/env injection |

CORS: allow frontend origin only; enable credentials if using cookies.

## 9. Concrete integration steps (ordered)

### Phase A — API skeleton (week 1)

1. Create `backend/` service with OpenAPI 3.1 spec generated from section 4.
2. Implement `GET /health`, auth login, and JWT middleware.
3. Stand up PostgreSQL schema: `clubs`, `users`, `tournaments`, `tee_slots`, `operating_hours`, `bookings`, `scorecards`.

### Phase B — Read paths (week 2)

4. Implement list endpoints used by panels (clubs, users, tournaments, bookings, leaderboard, scorecards).
5. Add `src/api/client.ts` in Frontend with typed fetch wrapper and error parsing.
6. Wire read-only panels first: Leaderboard, Scorecards, Game Bookings list.

### Phase C — Write paths (week 3)

7. Clubs CRUD + Club Details PATCH.
8. Users POST/DELETE.
9. Tee slots PUT, operating hours PUT.
10. Tournaments create/delete/register; bookings PATCH status.

### Phase D — Auth and hardening (week 4)

11. Login page + auth context; hide nav by role.
12. Rate limiting on auth and write endpoints.
13. Integration tests (API) + existing Playwright suite against staging.

### Phase E — Release 1.0.3 cutover

14. Feature flag `VITE_USE_MOCK_DATA=false` default in production.
15. Smoke test checklist (section 10).
16. Rollback: revert env to mock mode without redeploying UI.

## 10. Frontend file touch list (when connecting APIs)

| File | Change |
|------|--------|
| `src/App.tsx` | Fetch initial state; pass loading/error |
| `src/data/mockData.ts` | Keep as dev fallback behind flag |
| `src/features/**` | Replace handlers with API calls + optimistic UI |
| `src/api/` (new) | `client.ts`, per-resource modules |
| `src/context/AuthContext.tsx` (new) | Token + user role |
| `vite.config.ts` | Proxy `/api` → backend in dev |

Example dev proxy:

```typescript
server: {
  proxy: {
    '/api': { target: 'http://localhost:4000', changeOrigin: true },
  },
},
```

## 11. Testing alignment

Playwright specs under `Frontend/automation-tests/` already mock `**/api/v1/**`. When backend is live:

- Point `VITE_FRONTEND_URL` / `PW_DEV_PORT` at preview server.
- Run API integration tests against real staging with test fixtures.
- Keep `page.route()` mocks for isolated UI CI jobs.

## 12. Open decisions

| # | Question | Default for 1.0.3 |
|---|----------|-------------------|
| 1 | Separate auth IdP (Auth0/Cognito)? | Local JWT unless enterprise SSO required |
| 2 | Real-time booking conflicts? | Optimistic locking on tee slot `version` column |
| 3 | Multi-tenant vs single deploy per club? | Single app, `clubId` scoping |
| 4 | Payment for tournament fees? | Out of scope R1 |

## 13. Success criteria for release 1.0.3

- [ ] All eleven UI views load data from API with mock flag off
- [ ] Role-based nav matches JWT role
- [ ] Add Club / Manage Users / Club Details validation matches API errors
- [ ] Tournament registration is atomic (`spotsLeft` never negative)
- [ ] Playwright full suite passes against staging
- [ ] OpenAPI spec published and versioned `v1`

---

*Generated for Frontend R1 — aligns with `development-1/Frontend` as of release 1.0.3.*
