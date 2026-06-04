# Backend Integration Plan — Teevo Frontend R1 / Release 1.0.3

| Field | Value |
|---|---|
| Frontend version | R1 |
| Release name | 1.0.3 |
| Frontend path | `Frontend/` |
| Reference submodule | `launchpad-frontend/` (YorkIE-Launchpad/teevo-9) |
| Current frontend mode | Demo — in-memory React state, no auth |
| Target | REST API backend with role-based access |

---

## 1. Executive Summary

The Teevo R1 frontend is a single-page React 19 + Vite 8 application with three role workspaces (**Superadmin**, **Club Admin**, **Player**). All data today lives in `Frontend/src/data/mockData.ts` and is mutated via React `useState` in `App.tsx`.

This plan defines the backend services, API contracts, authentication model, and step-by-step integration path to replace in-memory state with persistent APIs while preserving existing UI behavior.

---

## 2. Frontend Domain Model (Source of Truth)

Derived from `Frontend/src/data/mockData.ts` and feature panels.

### 2.1 Entities

| Entity | Key Fields | Notes |
|---|---|---|
| **Club** | `id`, `name`, `location`, `holes`, `memberCount` | Superadmin CRUD; players join |
| **User** | `id`, `name`, `email`, `role`, `clubId?`, `phone?`, `handicapCount?` | Roles: `superadmin`, `clubadmin`, `player` |
| **Tournament** | `id`, `name`, `clubName`, `date`, `format`, `spotsLeft`, `maxPlayers` | Admin creates; player books |
| **TournamentRegistration** | `userId`, `tournamentId`, `registeredAt` | Implied by `bookedTournamentIds` |
| **ClubMembership** | `userId`, `clubId`, `joinedAt` | Implied by `joinedClubIds` |
| **TeeTimeSlot** | `id`, `time`, `intervalMinutes`, `available` | Per club, per day |
| **GameBooking** | `id`, `playerName`, `date`, `teeTime`, `players`, `status` | Status: `confirmed`, `pending`, `cancelled` |
| **Scorecard** | `id`, `playerName`, `course`, `date`, `gross`, `net` | Read-only in R1 UI |
| **OperatingHours** | per-day `open`, `close`, `closed` | 7-day schedule per club |
| **LeaderboardEntry** | `rank`, `playerName`, `tournamentName`, `score`, `par` | Aggregated view |

### 2.2 Role Permissions Matrix

| Action | Superadmin | Club Admin | Player |
|---|---|---|---|
| Create club | ✅ | ❌ | ❌ |
| Edit club details | ✅ | ❌ | ❌ |
| Manage all users | ✅ | ❌ | ❌ |
| Configure tee times | ❌ | ✅ (own club) | ❌ |
| Set operating hours | ❌ | ✅ (own club) | ❌ |
| Create/cancel tournaments | ❌ | ✅ (own club) | ❌ |
| Manage bookings | ❌ | ✅ (own club) | ❌ |
| View scorecards | ❌ | ✅ (own club) | ❌ |
| Browse/join clubs | ❌ | ❌ | ✅ |
| Book tournaments | ❌ | ❌ | ✅ |
| View leaderboard | ❌ | ❌ | ✅ |

---

## 3. Recommended Backend Architecture

```
┌─────────────────┐     HTTPS/JWT      ┌──────────────────────┐
│  Frontend (Vite)│ ◄────────────────► │  API Gateway / BFF   │
│  localhost:5173 │                    │  (optional)          │
└─────────────────┘                    └──────────┬───────────┘
                                                  │
                     ┌────────────────────────────┼────────────────────────────┐
                     ▼                            ▼                            ▼
              ┌─────────────┐            ┌─────────────┐            ┌─────────────┐
              │ Auth Service│            │ Core API    │            │ Notification│
              │ /auth/*     │            │ /api/v1/*   │            │ (future)    │
              └──────┬──────┘            └──────┬──────┘            └─────────────┘
                     │                            │
                     └────────────┬───────────────┘
                                  ▼
                           ┌─────────────┐
                           │ PostgreSQL  │
                           └─────────────┘
```

**Recommended stack (aligns with Launchpad patterns):**

- **Runtime:** Node.js 20 LTS + Express or NestJS
- **Database:** PostgreSQL 16
- **ORM:** Prisma or TypeORM
- **Auth:** JWT access + refresh tokens; bcrypt password hashing
- **Validation:** Zod or class-validator
- **API docs:** OpenAPI 3.1 at `/api/docs`

**Default ports:**

| Service | Port | Env var |
|---|---|---|
| Frontend (Vite) | 5173 | `VITE_PORT` / `PW_DEV_PORT` |
| Backend API | 5000 | `API_PORT` |
| PostgreSQL | 5432 | `DATABASE_URL` |

---

## 4. Authentication & Session

### 4.1 Current State

The R1 frontend runs in **demo mode** — all role sections are navigable without login (`Frontend/README.md`). TopBar shows a hardcoded display name (`Alex Morgan`).

### 4.2 Target Auth Flow

1. **Login** — `POST /api/v1/auth/login` with `{ email, password }` → `{ accessToken, refreshToken, user }`
2. **Refresh** — `POST /api/v1/auth/refresh` with `{ refreshToken }`
3. **Logout** — `POST /api/v1/auth/logout` (invalidate refresh token)
4. **Me** — `GET /api/v1/auth/me` → current user + role + `clubId`

### 4.3 JWT Claims

```json
{
  "sub": "u1",
  "email": "alex@teevo.app",
  "role": "superadmin",
  "clubId": null,
  "iat": 1717459200,
  "exp": 1717462800
}
```

### 4.4 Frontend Integration Points

| File | Change |
|---|---|
| `App.tsx` | Wrap with `AuthProvider`; gate sidebar sections by role |
| `TopBar.tsx` | Load display name from `/auth/me`; logout action |
| New `src/api/client.ts` | Axios/fetch wrapper with JWT interceptor |
| New `src/hooks/useAuth.ts` | Login state, token refresh |
| `vite.config.ts` | Proxy `/api` → `http://localhost:5000` in dev |

### 4.5 Authorization Middleware

Every protected route validates:

1. Valid JWT
2. Role in allowed set for endpoint
3. Club-scoped routes: `req.user.clubId === resource.clubId` (club admin)

---

## 5. REST API Specification

Base path: `/api/v1`  
Content-Type: `application/json`  
Errors: `{ "message": string, "code"?: string, "details"?: object }`

### 5.1 Clubs

| Method | Path | Role | Description |
|---|---|---|---|
| `GET` | `/clubs` | all authenticated | List clubs (player: browse; admin: all) |
| `GET` | `/clubs/:id` | all authenticated | Club detail |
| `POST` | `/clubs` | superadmin | Create club |
| `PATCH` | `/clubs/:id` | superadmin | Update club |
| `DELETE` | `/clubs/:id` | superadmin | Delete club |
| `POST` | `/clubs/:id/join` | player | Join club (increments `memberCount`) |
| `DELETE` | `/clubs/:id/membership` | player | Leave club |

**Create club request:**

```json
{
  "name": "Oak Ridge Country Club",
  "location": "Austin, Texas, USA",
  "holes": 18
}
```

**Response:**

```json
{
  "id": "club-uuid",
  "name": "Oak Ridge Country Club",
  "location": "Austin, Texas, USA",
  "holes": 18,
  "memberCount": 0,
  "createdAt": "2026-06-04T09:00:00Z"
}
```

### 5.2 Users

| Method | Path | Role | Description |
|---|---|---|---|
| `GET` | `/users` | superadmin | List all users |
| `POST` | `/users` | superadmin | Create user |
| `DELETE` | `/users/:id` | superadmin | Remove user |
| `GET` | `/users/:id` | superadmin, self | User detail |

**Create user request:**

```json
{
  "name": "Jordan Smith",
  "email": "jordan.smith@testmail.com",
  "role": "player",
  "phone": "+1 555-0199",
  "handicapCount": 12.4,
  "clubId": "club-uuid"
}
```

Validation:

- `email` — valid format, unique
- `handicapCount` — 0–54 or null
- `clubId` — required when role is `clubadmin` or `player`

### 5.3 Tournaments

| Method | Path | Role | Description |
|---|---|---|---|
| `GET` | `/tournaments` | all authenticated | List tournaments |
| `POST` | `/tournaments` | clubadmin | Create tournament |
| `DELETE` | `/tournaments/:id` | clubadmin | Cancel tournament |
| `POST` | `/tournaments/:id/register` | player | Book spot (decrements `spotsLeft`) |
| `DELETE` | `/tournaments/:id/register` | player | Cancel registration |

**Create tournament request:**

```json
{
  "name": "Summer Invitational",
  "date": "2026-07-15",
  "format": "Stroke Play",
  "maxPlayers": 32
}
```

Booking rules:

- Return `409 Conflict` if `spotsLeft <= 0`
- Return `409` if player already registered
- Atomic decrement of `spotsLeft`

### 5.4 Tee Time Slots

| Method | Path | Role | Description |
|---|---|---|---|
| `GET` | `/clubs/:clubId/tee-slots?date=YYYY-MM-DD` | clubadmin | List slots for date |
| `PUT` | `/clubs/:clubId/tee-slots` | clubadmin | Replace generated slots |
| `PATCH` | `/tee-slots/:id` | clubadmin | Toggle availability |

**Generate slots request:**

```json
{
  "date": "2026-06-05",
  "startTime": "07:00",
  "intervalMinutes": 10,
  "count": 6
}
```

### 5.5 Operating Hours

| Method | Path | Role | Description |
|---|---|---|---|
| `GET` | `/clubs/:clubId/operating-hours` | clubadmin | Get weekly schedule |
| `PUT` | `/clubs/:clubId/operating-hours` | clubadmin | Save weekly schedule |

**Request body:**

```json
{
  "schedule": {
    "Monday": { "open": "06:30", "close": "20:00", "closed": false },
    "Sunday": { "open": "08:00", "close": "18:00", "closed": false }
  }
}
```

### 5.6 Game Bookings

| Method | Path | Role | Description |
|---|---|---|---|
| `GET` | `/clubs/:clubId/bookings` | clubadmin | List bookings |
| `PATCH` | `/bookings/:id/status` | clubadmin | Update status |

**Status update:**

```json
{ "status": "confirmed" }
```

Allowed transitions:

- `pending` → `confirmed` | `cancelled`
- `confirmed` → `cancelled`

### 5.7 Scorecards

| Method | Path | Role | Description |
|---|---|---|---|
| `GET` | `/clubs/:clubId/scorecards` | clubadmin | List scorecards |
| `POST` | `/clubs/:clubId/scorecards` | clubadmin, player | Submit scorecard (future) |

### 5.8 Leaderboard

| Method | Path | Role | Description |
|---|---|---|---|
| `GET` | `/leaderboard` | player, clubadmin | Top scores across tournaments |

Query params: `?tournamentId=`, `?limit=50`

**Response:**

```json
[
  { "rank": 1, "playerName": "Chris Park", "tournamentName": "Spring Classic", "score": 68, "par": 72 }
]
```

### 5.9 Health

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | none | `{ "status": "ok" }` |

---

## 6. Database Schema (PostgreSQL)

```sql
-- Core tables (simplified)

CREATE TYPE user_role AS ENUM ('superadmin', 'clubadmin', 'player');
CREATE TYPE booking_status AS ENUM ('confirmed', 'pending', 'cancelled');

CREATE TABLE clubs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  location    VARCHAR(255) NOT NULL,
  holes       SMALLINT NOT NULL CHECK (holes IN (9, 18, 27)),
  member_count INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(255) NOT NULL,
  email           VARCHAR(255) NOT NULL UNIQUE,
  password_hash   VARCHAR(255) NOT NULL,
  role            user_role NOT NULL,
  club_id         UUID REFERENCES clubs(id),
  phone           VARCHAR(50),
  handicap_count  NUMERIC(4,1) CHECK (handicap_count >= 0 AND handicap_count <= 54),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE club_memberships (
  user_id    UUID NOT NULL REFERENCES users(id),
  club_id    UUID NOT NULL REFERENCES clubs(id),
  joined_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, club_id)
);

CREATE TABLE tournaments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id      UUID NOT NULL REFERENCES clubs(id),
  name         VARCHAR(255) NOT NULL,
  date         DATE NOT NULL,
  format       VARCHAR(50) NOT NULL,
  max_players  INTEGER NOT NULL,
  spots_left   INTEGER NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tournament_registrations (
  tournament_id UUID NOT NULL REFERENCES tournaments(id),
  user_id       UUID NOT NULL REFERENCES users(id),
  registered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (tournament_id, user_id)
);

CREATE TABLE tee_time_slots (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id           UUID NOT NULL REFERENCES clubs(id),
  slot_date         DATE NOT NULL,
  time              TIME NOT NULL,
  interval_minutes  SMALLINT NOT NULL,
  available         BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE operating_hours (
  club_id  UUID NOT NULL REFERENCES clubs(id),
  day      VARCHAR(10) NOT NULL,
  open     TIME,
  close    TIME,
  closed   BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (club_id, day)
);

CREATE TABLE game_bookings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id     UUID NOT NULL REFERENCES clubs(id),
  player_id   UUID NOT NULL REFERENCES users(id),
  date        DATE NOT NULL,
  tee_time    TIME NOT NULL,
  players     SMALLINT NOT NULL,
  status      booking_status NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE scorecards (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id     UUID NOT NULL REFERENCES clubs(id),
  player_id   UUID NOT NULL REFERENCES users(id),
  course      VARCHAR(255) NOT NULL,
  date        DATE NOT NULL,
  gross       SMALLINT NOT NULL,
  net         SMALLINT NOT NULL
);
```

Seed script should mirror `Frontend/src/data/mockData.ts` for dev parity.

---

## 7. Frontend Integration Steps

### Phase 1 — API Client Foundation

1. Create `Frontend/src/api/client.ts`:

```typescript
const API_BASE = import.meta.env.VITE_API_URL ?? '/api/v1'

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })
  if (!res.ok) throw new ApiError(res.status, await res.json())
  return res.json()
}
```

2. Add Vite dev proxy in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': { target: 'http://localhost:5000', changeOrigin: true },
  },
},
```

3. Set env: `VITE_API_URL=/api/v1`

### Phase 2 — Replace Mock State (by feature)

| Priority | Feature | Frontend files | API endpoints |
|---|---|---|---|
| P0 | Auth + role gating | `App.tsx`, `TopBar.tsx`, new `LoginPage` | `/auth/*` |
| P1 | Clubs CRUD | `AddClubForm`, `ClubDetailsPanel` | `/clubs` |
| P1 | Users | `ManageUsersPanel` | `/users` |
| P2 | Tee times | `TeeTimeSlotsPanel` | `/tee-slots` |
| P2 | Operating hours | `OperatingHoursPanel` | `/operating-hours` |
| P2 | Tournaments admin | `TournamentsAdminPanel` | `/tournaments` |
| P2 | Bookings | `GameBookingsPanel` | `/bookings` |
| P3 | Player clubs | `ClubsListPanel` | `/clubs`, `/clubs/:id/join` |
| P3 | Player tournaments | `TournamentsPlayerPanel` | `/tournaments/:id/register` |
| P3 | Scorecards | `ScorecardsPanel` | `/scorecards` |
| P3 | Leaderboard | `LeaderboardPanel` | `/leaderboard` |

### Phase 3 — State Management Refactor

Replace monolithic `App.tsx` state with:

- **Option A:** React Query (`@tanstack/react-query`) — recommended for server state
- **Option B:** Context + custom hooks per domain (`useClubs`, `useTournaments`)

Pattern per feature:

```typescript
// hooks/useClubs.ts
export function useClubs() {
  return useQuery({ queryKey: ['clubs'], queryFn: () => api<Club[]>('/clubs') })
}

export function useCreateClub() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateClubDto) => api<Club>('/clubs', { method: 'POST', body: JSON.stringify(body) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['clubs'] }),
  })
}
```

### Phase 4 — Error & Loading States

Add to each panel (Playwright tests already mock these paths):

- Loading skeleton (`data-testid="skeleton"`)
- Error alert (`role="alert"`) on API failure
- Empty states for zero-result lists

---

## 8. Environment Variables

### Backend (`.env`)

```bash
DATABASE_URL=postgresql://teevo:teevo@localhost:5432/teevo_dev
API_PORT=5000
JWT_SECRET=<256-bit-secret>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Frontend (`.env.development`)

```bash
VITE_API_URL=/api/v1
VITE_PORT=5173
```

### Playwright (`.env.test`)

```bash
PW_DEV_PORT=5173
VITE_FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 9. Deployment Considerations

### 9.1 Development

```bash
# Terminal 1 — Backend
cd backend && npm run dev          # port 5000

# Terminal 2 — Frontend
cd Frontend && npm run dev         # port 5173

# Terminal 3 — E2E (optional)
cd Frontend && npx playwright test automation-tests/index.ts
```

### 9.2 Production Topology

| Component | Suggestion |
|---|---|
| Frontend | Static build (`Frontend/dist`) on CDN or S3 + CloudFront |
| Backend | Container on ECS/Kubernetes or Railway/Render |
| Database | Managed PostgreSQL (RDS, Supabase, Neon) |
| TLS | Terminate at load balancer; enforce HTTPS |
| CORS | Allow production frontend origin only |

### 9.3 CI/CD Pipeline

1. **Backend:** lint → unit tests → integration tests (Testcontainers PG) → deploy
2. **Frontend:** lint → build → Playwright against staging API
3. **Contract tests:** OpenAPI schema validation between FE mocks and BE responses

---

## 10. Testing Alignment

The frontend already includes **96 Playwright specs** under `Frontend/automation-tests/` covering:

- App shell (navigation, settings, notifications)
- All 11 feature panels (smoke, ui, form, api, error, edge, mobile, accessibility)
- Mock data modules in `fixtures/mock-data/`

**Backend testing requirements:**

| Layer | Tool | Coverage target |
|---|---|---|
| Unit | Jest/Vitest | Services, validators |
| Integration | Supertest + Testcontainers | All `/api/v1` routes |
| E2E | Playwright with real API | Critical flows (login, create club, book tournament) |

When backend is ready, update Playwright `*.api.spec.ts` files to hit real endpoints (or keep mocks for CI isolation with a `--mock-api` flag).

---

## 11. Migration Checklist

- [ ] Scaffold backend project in `backend/` (Express/NestJS + Prisma)
- [ ] Apply database migrations + seed from mockData
- [ ] Implement `/health` and `/auth/login`
- [ ] Implement clubs + users endpoints (superadmin)
- [ ] Add JWT middleware + role guards
- [ ] Wire Frontend API client + Vite proxy
- [ ] Replace `useState` clubs/users with React Query
- [ ] Implement club-scoped endpoints for clubadmin role
- [ ] Implement player join/book flows
- [ ] Add loading/error UI states
- [ ] Run Playwright suite against integrated stack
- [ ] Generate OpenAPI spec and publish at `/api/docs`
- [ ] Production deployment + smoke test

---

## 12. Open Questions / Future Scope

1. **Multi-club admins** — Can a clubadmin manage multiple clubs? R1 UI assumes one `clubId`.
2. **Password reset / SSO** — Not in R1 UI; plan OAuth2 for R2.
3. **Real-time notifications** — TopBar toggle exists; backend push (WebSocket/SSE) deferred.
4. **Payment for tournament entry** — Out of scope for 1.0.3.
5. **File uploads** — Club photos, scorecard attachments — out of scope for R1.

---

## 13. References

| Resource | Path |
|---|---|
| Frontend mock types | `Frontend/src/data/mockData.ts` |
| Navigation config | `Frontend/src/config/navigation.ts` |
| App state wiring | `Frontend/src/App.tsx` |
| Playwright config | `Frontend/playwright.config.ts` |
| E2E test index | `Frontend/automation-tests/index.ts` |
| Launchpad reference | `launchpad-frontend/` |

---

*Document generated for Teevo Frontend R1 / Release 1.0.3 — integration repository `teevo-9-dev`.*
