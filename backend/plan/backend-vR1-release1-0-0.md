# Backend Integration Plan — Teevo R1 (Release 1.0.0)

| Field | Value |
|-------|-------|
| Frontend version | R1 |
| Release name | 1.0.0 |
| Release scope | Base Release for Project From Scratch |
| Frontend path | `development-1/Frontend/` |
| API contract module | `Frontend/src/api/contracts.ts` |
| Default API base (dev) | `http://localhost:5000/api` (`VITE_API_URL`) |

## 1. Purpose

The R1 frontend is a **golf club management workspace** with three role surfaces (Superadmin, Club Admin, Player), in-memory demo state today, and a prepared HTTP client (`src/api/client.ts`). This plan defines the backend services, data contracts, auth model, and step-by-step integration so the UI can switch from mock state to live APIs without structural rewrites.

## 2. Frontend capability map (what the backend must support)

| UI surface | Nav id | Primary operations |
|------------|--------|-------------------|
| Add Club | `sa-add-club` | `POST /clubs` |
| Manage Users | `sa-users` | `GET/POST/DELETE /users` |
| Club Details | `sa-club-details` | `GET /clubs`, `PATCH /clubs/:id` |
| Tee Time Slots | `ca-tee-times` | `GET/PUT /clubs/:clubId/tee-slots`, generate batch |
| Operating Hours | `ca-hours` | `GET/PUT /clubs/:clubId/hours` |
| Tournaments (admin) | `ca-tournaments` | `GET/POST/DELETE /tournaments` |
| Game Bookings | `ca-bookings` | `GET /bookings`, `PATCH /bookings/:id/status` |
| Scorecards | `ca-scorecards` | `GET /scorecards` (read-only R1) |
| Browse Clubs | `pl-clubs` | `GET /clubs?search=`, `POST /clubs/:id/join` |
| Tournaments (player) | `pl-tournaments` | `GET /tournaments`, `POST /tournaments/:id/register` |
| Leaderboard | `pl-leaderboard` | `GET /leaderboard` |

Shared shell: notifications preference (user settings), profile display name — `PATCH /users/me`.

## 3. Recommended service architecture

```
┌─────────────┐     HTTPS      ┌──────────────────┐
│  Frontend   │ ──────────────►│  API Gateway /   │
│  (Vite SPA) │                │  BFF (optional)  │
└─────────────┘                └────────┬─────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    ▼                   ▼                   ▼
            ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
            │ Auth Service │   │ Club Service │   │ Event Service│
            │ (JWT/OIDC)   │   │ clubs, hours │   │ tournaments  │
            └──────────────┘   │ tee slots    │   │ leaderboard  │
                               └──────────────┘   └──────────────┘
                                        │
                                        ▼
                               ┌──────────────┐
                               │ Booking Svc  │
                               │ bookings     │
                               └──────────────┘
```

**R1 pragmatism:** A single **modular monolith** (e.g. NestJS, FastAPI, or Express + Prisma) with namespaced routes under `/api/v1` is sufficient; split services only when load or team boundaries require it.

## 4. Data contracts (align with `contracts.ts`)

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
| GET | `/api/v1/clubs?search=` | — | `ClubDto[]` |
| POST | `/api/v1/clubs` | `{ name, location, holes }` | `ClubDto` 201 |
| GET | `/api/v1/clubs/:id` | — | `ClubDto` |
| PATCH | `/api/v1/clubs/:id` | partial Club | `ClubDto` |
| POST | `/api/v1/clubs/:id/join` | — | `{ joined: true }` 200 |

Validation: `name` and `location` required (matches frontend); `holes` enum 9 | 18 | 27.

### 4.2 User

```json
{
  "id": "uuid",
  "name": "Alex Morgan",
  "email": "alex@teevo.app",
  "role": "superadmin | clubadmin | player",
  "clubId": "uuid | null"
}
```

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/v1/users` | Superadmin only |
| POST | `/api/v1/users` | Superadmin; email unique |
| DELETE | `/api/v1/users/:id` | Superadmin; 409 if last superadmin |
| GET/PATCH | `/api/v1/users/me` | Authenticated user |

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
| GET | `/api/v1/tournaments` |
| POST | `/api/v1/tournaments` |
| DELETE | `/api/v1/tournaments/:id` |
| POST | `/api/v1/tournaments/:id/register` | Player; decrements `spotsLeft` atomically |

### 4.4 Tee time slot

```json
{
  "id": "uuid",
  "time": "07:00",
  "intervalMinutes": 10,
  "available": true
}
```

| Method | Path |
|--------|------|
| GET | `/api/v1/clubs/:clubId/tee-slots` |
| PUT | `/api/v1/clubs/:clubId/tee-slots` | Replace day schedule |
| POST | `/api/v1/clubs/:clubId/tee-slots/generate` | `{ startTime, intervalMinutes, count }` |

### 4.5 Operating hours

```json
{
  "day": "Monday",
  "open": "06:30",
  "close": "20:00",
  "closed": false
}
```

`PUT /api/v1/clubs/:clubId/hours` — array of 7 day records.

### 4.6 Game booking

```json
{
  "id": "uuid",
  "playerName": "Sam Rivera",
  "date": "2026-06-05",
  "teeTime": "09:20",
  "players": 4,
  "status": "confirmed | pending | cancelled"
}
```

`PATCH /api/v1/bookings/:id` — `{ "status": "confirmed" }` (club admin).

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

`GET /api/v1/leaderboard?tournamentId=` — read-only R1.

### 4.8 Error envelope (all endpoints)

```json
{
  "message": "Human-readable error",
  "code": "VALIDATION_ERROR"
}
```

HTTP mapping: 400 validation, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 500 internal.

## 5. Authentication and authorization

### 5.1 R1 recommendation

| Concern | Approach |
|---------|----------|
| Protocol | OAuth2 / OIDC (Auth0, Cognito, or Keycloak) issuing JWT access tokens |
| Transport | `Authorization: Bearer <token>` on all `/api/v1/*` except health |
| Session | Stateless JWT; refresh token in httpOnly cookie if using BFF |
| Role claims | `role` + `clubId` in token claims or loaded from `/users/me` |

### 5.2 Role matrix

| Endpoint group | superadmin | clubadmin | player |
|----------------|------------|-----------|--------|
| Clubs CRUD | full | read own club | read + join |
| Users admin | full | — | — |
| Tee slots / hours | all clubs | own `clubId` | — |
| Tournaments admin | all | own club | — |
| Register tournament | — | — | yes |
| Bookings manage | all | own club | own bookings (future) |
| Leaderboard | read | read | read |

### 5.3 Frontend integration steps (auth)

1. Add login route or Launchpad-hosted auth shell (out of R1 SPA scope if embedded).
2. Store access token; pass to `apiRequest` via `Authorization` header in `client.ts`.
3. On 401, redirect to login; on 403, show permission error panel.
4. Replace demo “all roles in sidebar” with nav filtered by `role` from `/users/me`.

## 6. Database sketch (PostgreSQL)

```sql
-- Core entities
clubs (id, name, location, holes, member_count, created_at)
users (id, name, email, role, club_id FK nullable, ...)
club_memberships (user_id, club_id, joined_at)
tournaments (id, club_id, name, date, format, max_players, spots_left)
tournament_registrations (tournament_id, user_id, registered_at)
tee_time_slots (id, club_id, slot_time, interval_minutes, available)
operating_hours (club_id, day_of_week, open_time, close_time, closed)
bookings (id, club_id, player_user_id, date, tee_time, players, status)
scorecards (id, player_user_id, course, date, gross, net)  -- optional seed
leaderboard_entries (materialized view or computed query)
```

Use transactions for `register` and `join` to avoid race conditions on `spotsLeft` / `memberCount`.

## 7. Deployment considerations

| Layer | Guidance |
|-------|----------|
| Frontend | Static build from `npm run build`; CDN + HTTPS; env `VITE_API_URL` per environment |
| API | Container on port 5000; path prefix `/api`; CORS allow frontend origin |
| DB | Managed PostgreSQL; migrations via Flyway/Prisma |
| Secrets | JWT signing keys, DB URL in vault — never in frontend bundle |
| Observability | Structured logs, request IDs, health `GET /api/health` |

Environment matrix:

| Env | `VITE_API_URL` | Notes |
|-----|----------------|-------|
| local | `http://localhost:5000/api/v1` | Playwright mocks `**/api/**` until wired |
| staging | `https://api.staging.teevo.app/api/v1` | |
| production | `https://api.teevo.app/api/v1` | |

## 8. Concrete integration steps (ordered)

### Phase A — Contract freeze (week 1)

1. Publish OpenAPI 3.1 from sections 4–5 (or generate from `contracts.ts`).
2. Agree on pagination (`?limit=&cursor=`) for list endpoints — R1 can return full lists.
3. Add `GET /api/health` and `GET /api/v1/openapi.json`.

### Phase B — Backend scaffold (week 1–2)

1. Initialize monolith repo under `development-1/backend/` (or separate service repo).
2. Implement clubs + users + auth middleware.
3. Seed data matching `Frontend/src/data/mockData.ts` for parity testing.

### Phase C — Frontend wiring (week 2–3)

1. Create `src/api/clubs.ts`, `users.ts`, `tournaments.ts`, etc., each calling `apiRequest`.
2. Replace `useState` seed data in `App.tsx` with `useEffect` + fetch on mount (or React Query).
3. Feature-flag: `VITE_USE_MOCK_API=true` falls back to in-memory for local UX demos.
4. Map API errors to UI messages (replace inline validation-only paths).

### Phase D — E2E against real API (week 3)

1. Point Playwright `webServer` env `VITE_API_URL` to local API.
2. Reduce `page.route` mocks in `*.api.spec.ts` for integration job only.
3. CI: docker-compose with Postgres + API + frontend.

### Phase E — Hardening (week 4)

1. Rate limiting on write endpoints.
2. Audit log for superadmin mutations.
3. Load test tournament registration concurrency.

## 9. CORS and security checklist

- [ ] CORS: explicit frontend origins, no `*` with credentials
- [ ] Parameterized SQL / ORM only
- [ ] Input validation (Zod/class-validator) mirroring frontend rules
- [ ] Output encoding for XSS-safe JSON
- [ ] HTTPS everywhere in non-local environments
- [ ] RBAC enforced server-side (never trust sidebar hiding alone)

## 10. Open questions

1. **Multi-tenant clubs:** Is one deployment per operator or shared SaaS with `clubId` tenancy?
2. **Payments:** Bookings/tournaments — payment gateway in R2?
3. **Score entry:** Will players submit scores or only admins in R1?
4. **Launchpad embed:** Is auth handled by Launchpad shell vs standalone Teevo login?

## 11. References in repo

| Artifact | Path |
|----------|------|
| Frontend mock seeds | `Frontend/src/data/mockData.ts` |
| API client | `Frontend/src/api/client.ts` |
| DTO types | `Frontend/src/api/contracts.ts` |
| E2E suite | `Frontend/automation-tests/` |
| Launchpad reference UI | `launchpad-frontend/` (submodule; sync from Launchpad pipeline) |

---

*Document version: backend-vR1-release1-0-0 — generated for Frontend R1 / Release 1.0.0.*
