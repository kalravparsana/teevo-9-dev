# Backend integration plan — Teevo Frontend R1 / Release 1.0.1

| Field | Value |
|---|---|
| Frontend version | R1 |
| Release | 1.0.1 |
| Frontend path | `Frontend/` |
| Reference UI | `launchpad-frontend/` (Launchpad submodule: `YorkIE-Launchpad/teevo-9`) |
| Dev server | Vite, `strictPort`, default **5173** (`PW_DEV_PORT` / `PORT` override) |

## 1. Executive summary

The R1 frontend is a single-page React 19 + Vite + Tailwind application with **role-based views** (Superadmin, Club Admin, Player) driven by sidebar navigation. All domain data today lives in `Frontend/src/data/mockData.ts` and in-memory React state in `App.tsx`. This plan defines the REST API surface, TypeScript contracts, auth model, and step-by-step wiring so a backend can replace mocks without UI regressions.

## 2. Current frontend capabilities (must be backed by APIs)

| Role | View | Operations today (local state) |
|---|---|---|
| Superadmin | Add Club | Create club (name, location, holes, optional notes) |
| Superadmin | Manage Users | List/add/remove users (name, email, role) |
| Superadmin | Club Details | Select club, update name/location/holes |
| Club Admin | Tee Time Slots | Configure interval, generate slots, toggle availability |
| Club Admin | Operating Hours | Per-weekday open/close/closed, save |
| Club Admin | Tournaments | Create/cancel tournaments |
| Club Admin | Game Bookings | List bookings, confirm/decline/cancel |
| Club Admin | Scorecards | Read-only list |
| Player | Browse Clubs | Search, join club |
| Player | Tournaments | Book spot (decrement spots) |
| Player | Leaderboard | Read-only ranked list |

## 3. Recommended API architecture

### 3.1 Style and base path

- **REST** over HTTPS, JSON bodies, UTF-8.
- Base path: `/api/v1`
- Version header (optional): `Accept: application/vnd.teevo.v1+json`
- Correlation: `X-Request-Id` on every response.

### 3.2 Resource model

```
/api/v1/clubs
/api/v1/clubs/{clubId}
/api/v1/clubs/{clubId}/operating-hours
/api/v1/clubs/{clubId}/tee-slots
/api/v1/clubs/{clubId}/tournaments
/api/v1/users
/api/v1/users/{userId}
/api/v1/bookings
/api/v1/bookings/{bookingId}
/api/v1/scorecards
/api/v1/leaderboard
/api/v1/players/me/clubs          # memberships
/api/v1/tournaments/{id}/register
```

### 3.3 Data contracts (align with `Frontend/src/data/mockData.ts`)

#### Club

```typescript
interface Club {
  id: string;           // UUID
  name: string;
  location: string;
  holes: number;        // 9 | 18 | 27
  memberCount: number;
}
```

| Method | Path | Body | Response |
|---|---|---|---|
| GET | `/clubs` | — | `Club[]` |
| POST | `/clubs` | `Omit<Club,'id'|'memberCount'>` | `Club` 201 |
| GET | `/clubs/{id}` | — | `Club` |
| PATCH | `/clubs/{id}` | `Partial<Pick<Club,'name'|'location'|'holes'>>` | `Club` |

#### AppUser

```typescript
type UserRole = 'superadmin' | 'clubadmin' | 'player';

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clubId?: string;
}
```

| Method | Path | Notes |
|---|---|---|
| GET | `/users` | Superadmin only |
| POST | `/users` | Superadmin; validate unique email |
| DELETE | `/users/{id}` | Superadmin; 409 if last superadmin |

#### Tournament

```typescript
interface Tournament {
  id: string;
  name: string;
  clubId: string;
  clubName: string;      // denormalized for player list
  date: string;          // ISO date YYYY-MM-DD
  format: string;
  spotsLeft: number;
  maxPlayers: number;
}
```

| Method | Path | Notes |
|---|---|---|
| GET | `/clubs/{clubId}/tournaments` | Club admin scope |
| GET | `/tournaments?scope=player` | Player upcoming |
| POST | `/clubs/{clubId}/tournaments` | Create |
| DELETE | `/tournaments/{id}` | Cancel |
| POST | `/tournaments/{id}/register` | Player book; 409 if full |

#### TeeTimeSlot

```typescript
interface TeeTimeSlot {
  id: string;
  clubId: string;
  time: string;           // HH:mm
  intervalMinutes: number;
  available: boolean;
}
```

| Method | Path | Notes |
|---|---|---|
| GET | `/clubs/{clubId}/tee-slots?date=YYYY-MM-DD` | List day |
| PUT | `/clubs/{clubId}/tee-slots` | Replace generated set |
| PATCH | `/tee-slots/{id}` | Toggle `available` |

#### OperatingHours

```typescript
interface DayHours {
  open: string;    // HH:mm
  close: string;
  closed: boolean;
}

type OperatingHours = Record<
  'Monday'|'Tuesday'|'Wednesday'|'Thursday'|'Friday'|'Saturday'|'Sunday',
  DayHours
>;
```

| Method | Path |
|---|---|
| GET | `/clubs/{clubId}/operating-hours` |
| PUT | `/clubs/{clubId}/operating-hours` |

#### GameBooking

```typescript
type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

interface GameBooking {
  id: string;
  clubId: string;
  playerName: string;
  playerId?: string;
  date: string;
  teeTime: string;
  players: number;
  status: BookingStatus;
}
```

| Method | Path |
|---|---|
| GET | `/bookings?clubId={id}&status=` |
| PATCH | `/bookings/{id}` | `{ status }` |

#### Leaderboard & Scorecards

Read-only collections; support `?tournamentId=` filter on leaderboard.

### 3.4 Standard error envelope

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Club name and location are required.",
    "fields": { "name": "required", "location": "required" }
  },
  "requestId": "uuid"
}
```

| HTTP | Usage |
|---|---|
| 400 | Validation |
| 401 | Unauthenticated |
| 403 | Wrong role / club scope |
| 404 | Missing resource |
| 409 | Duplicate email, tournament full, conflict |
| 500 | Server error |

## 4. Authentication and session

R1 UI has **no login screen**; it assumes an implicit superadmin session. For production:

1. **Phase A (minimal):** API key or JWT in `Authorization: Bearer <token>` issued by an identity provider (Auth0, Cognito, or custom).
2. **Phase B:** Role claims embedded in JWT: `roles: ['superadmin']`, `clubId` for club admins.
3. **Frontend wiring:**
   - Add `VITE_API_BASE_URL` (e.g. `http://localhost:3000/api/v1`).
   - Create `Frontend/src/api/client.ts` with `fetch` wrapper, attaches token from `sessionStorage`.
   - Replace `useState` seed data with `useEffect` + API hydration per view.
4. **Session notes:**
   - HttpOnly cookie option for same-site deploys; Bearer for SPA + separate API host.
   - CORS: allow frontend origin, credentials if cookie-based.

## 5. Frontend integration steps (ordered)

1. **Environment**
   - `Frontend/.env.development`: `VITE_API_BASE_URL=http://localhost:3000/api/v1`
   - `Frontend/.env.production`: production API URL.

2. **API client layer** (`Frontend/src/api/`)
   - `client.ts` — base URL, JSON headers, error parsing.
   - `clubs.ts`, `users.ts`, `tournaments.ts`, `bookings.ts`, `teeSlots.ts`, `hours.ts`, `leaderboard.ts`.

3. **Hooks per feature** (`Frontend/src/hooks/`)
   - `useClubs`, `useUsers`, etc. — loading / error / empty states for future UI (Playwright api specs already stub routes).

4. **Lift state from `App.tsx`**
   - Initial load: parallel `GET` for clubs, users, tournaments, bookings, leaderboard, tee slots.
   - Mutations call POST/PATCH/DELETE then refresh or optimistic update.

5. **Validation parity**
   - Mirror client rules server-side (required name/location on club, email format on user).

6. **Remove mock-only paths**
   - Keep `mockData.ts` for Storybook/tests; gate with `import.meta.env.VITE_USE_MOCKS === 'true'`.

## 6. Deployment considerations

| Component | Suggestion |
|---|---|
| Frontend | Static build `npm run build` → CDN or object storage; `VITE_*` baked at build |
| API | Container (Node/FastAPI/Go) behind ALB/nginx |
| DB | PostgreSQL — clubs, users, tournaments, bookings, slots, hours |
| Ports | Frontend **5173** (dev), API **3000** (example) |
| Health | `GET /api/v1/health` → `{ status: 'ok' }` |

### CORS example (API)

```
Access-Control-Allow-Origin: https://app.teevo.example
Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
```

## 7. Database schema (minimal)

- `clubs` (id, name, location, holes, member_count, created_at)
- `users` (id, name, email, role, club_id FK nullable)
- `club_memberships` (user_id, club_id)
- `tournaments` (id, club_id, name, date, format, max_players, spots_left)
- `tournament_registrations` (tournament_id, user_id)
- `tee_slots` (id, club_id, slot_date, time, interval_minutes, available)
- `operating_hours` (club_id, day_of_week, open_time, close_time, closed)
- `bookings` (id, club_id, player_id, date, tee_time, players, status)
- `scorecards` (id, club_id, player_id, course, date, gross, net)
- `leaderboard_entries` (materialized view or computed query)

## 8. Testing alignment

- Playwright specs: `tests/teevo-r1/release-1-0-1/r1-1-0-1/`
- Base URL: `utils/base-url.ts` reads `BASE_URL`, `VITE_FRONTEND_URL`, `PW_DEV_PORT` (default **5173**).
- API specs use `page.route('**/api/**')` — match outgoing paths to `/api/v1/...` when client is wired.
- Run against real API in CI only after `playwright.config` `webServer` starts both services (out of scope for generation-only QA rule).

## 9. Release 1.0.1 acceptance checklist

- [ ] All contract endpoints implemented with OpenAPI 3.1 spec checked into `backend/openapi.yaml`
- [ ] Role-based authorization enforced per route
- [ ] Frontend `VITE_USE_MOCKS=false` passes manual smoke of all 11 views
- [ ] Playwright suite green against staging (`BASE_URL` + API URL set)
- [ ] Operating hours and tee-slot generation persist per club
- [ ] Tournament booking is atomic (no negative `spotsLeft`)

## 10. Submodule note

`launchpad-frontend/` is the canonical Launchpad reference (git submodule). In this workspace the submodule clone may require GitHub credentials; `main/` / copied tree was used to populate `launchpad-frontend/` and `Frontend/` when the submodule was empty. Reconcile with:

```bash
git submodule update --init launchpad-frontend
diff -rq launchpad-frontend Frontend
```

Any drift should be resolved in favor of Launchpad patterns (Vite launchpad HMR plugins, Tailwind `@source not` test exclusions, feature folder layout under `src/features/`).
