# Backend integration plan — Frontend R1 / Release 1.0.2

**Release:** 1.0.2  
**Frontend version:** R1  
**App:** Teevo — Golf Club Management  
**Repository path:** `development-1/Frontend/`  
**Reference submodule:** `launchpad-frontend/` (Launchpad platform UI patterns)

---

## 1. Executive summary

The R1 frontend is a single-page React application with role-based views (Superadmin, Club Admin, Player). Today it runs in **demo mode**: all state is held in React `useState` with seed data from `src/data/mockData.ts`. No HTTP calls are made at runtime.

This plan defines the REST API surface, data contracts, authentication model, deployment topology, and step-by-step integration so a backend can replace in-memory state without breaking UI behavior or Playwright coverage.

---

## 2. Current frontend architecture

| Layer | Location | Notes |
|--------|----------|--------|
| Shell | `App.tsx` | Central state for clubs, users, tournaments, bookings, tee slots, joins, bookings |
| Navigation | `config/navigation.ts` | View keys: `role:view` (no React Router) |
| API stubs | `src/services/api.ts` | Path constants + placeholder `fetch` clients |
| Types | `data/mockData.ts` | Source of truth for entity shapes until OpenAPI is published |

**Environment variables (Vite):**

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_API_URL` | API base path | `/api/v1` |
| `VITE_FRONTEND_URL` | E2E / preview base URL | `http://localhost:5173` |

---

## 3. Recommended backend stack (implementation-agnostic)

- **API style:** REST JSON over HTTPS  
- **Versioning:** Path prefix `/api/v1` (matches `api.ts`)  
- **Auth:** JWT access token + refresh token (or session cookie for same-origin deploy)  
- **Database:** PostgreSQL (relational fits clubs, users, bookings, tournaments)  
- **Optional:** Redis for session/cache; object storage for club assets later  

---

## 4. Resource model & data contracts

### 4.1 Club

```json
{
  "id": "string (uuid)",
  "name": "string",
  "location": "string",
  "holes": 9 | 18 | 27,
  "memberCount": "integer >= 0"
}
```

| Method | Path | Used by |
|--------|------|---------|
| GET | `/api/v1/clubs` | Player browse, Superadmin select |
| POST | `/api/v1/clubs` | Add Club form |
| GET | `/api/v1/clubs/{id}` | Club details |
| PATCH | `/api/v1/clubs/{id}` | Configure Club Details |
| POST | `/api/v1/clubs/{id}/members` | Player “Join Club” |

### 4.2 User

```json
{
  "id": "string",
  "name": "string",
  "email": "string (email)",
  "role": "superadmin" | "clubadmin" | "player",
  "clubId": "string | null"
}
```

| Method | Path | Used by |
|--------|------|---------|
| GET | `/api/v1/users` | Manage Users list |
| POST | `/api/v1/users` | Add User form |
| DELETE | `/api/v1/users/{id}` | Remove user |

### 4.3 Tournament

```json
{
  "id": "string",
  "name": "string",
  "clubName": "string",
  "clubId": "string",
  "date": "YYYY-MM-DD",
  "format": "Stroke Play" | "Scramble" | "Match Play",
  "spotsLeft": "integer",
  "maxPlayers": "integer"
}
```

| Method | Path | Used by |
|--------|------|---------|
| GET | `/api/v1/tournaments` | Admin + Player lists |
| POST | `/api/v1/tournaments` | Create Tournament |
| DELETE | `/api/v1/tournaments/{id}` | Cancel tournament |
| POST | `/api/v1/tournaments/{id}/bookings` | Player Book Spot |

### 4.4 Tee time slot

```json
{
  "id": "string",
  "clubId": "string",
  "time": "HH:mm",
  "intervalMinutes": "integer",
  "available": "boolean"
}
```

| Method | Path | Used by |
|--------|------|---------|
| GET | `/api/v1/clubs/{clubId}/tee-slots` | Tee Time Slots panel |
| PUT | `/api/v1/clubs/{clubId}/tee-slots` | Generate / bulk replace slots |
| PATCH | `/api/v1/clubs/{clubId}/tee-slots/{id}` | Toggle availability |

### 4.5 Game booking

```json
{
  "id": "string",
  "playerName": "string",
  "playerId": "string",
  "date": "YYYY-MM-DD",
  "teeTime": "HH:mm",
  "players": "integer 1-4",
  "status": "confirmed" | "pending" | "cancelled"
}
```

| Method | Path | Used by |
|--------|------|---------|
| GET | `/api/v1/bookings?clubId=` | Game Bookings |
| PATCH | `/api/v1/bookings/{id}` | Confirm / decline / cancel |

### 4.6 Scorecard & leaderboard (read-mostly)

| Method | Path | Used by |
|--------|------|---------|
| GET | `/api/v1/scorecards?clubId=` | Scorecards table |
| GET | `/api/v1/leaderboard` | Tournament Leaderboard |

### 4.7 Operating hours

```json
{
  "clubId": "string",
  "days": {
    "Monday": { "open": "HH:mm", "close": "HH:mm", "closed": false }
  }
}
```

| Method | Path | Used by |
|--------|------|---------|
| GET | `/api/v1/clubs/{clubId}/operating-hours` | Operating Hours panel |
| PUT | `/api/v1/clubs/{clubId}/operating-hours` | Save Hours |

---

## 5. Authentication & authorization

### 5.1 Target model (post-demo)

1. **Login** — `POST /api/v1/auth/login` → `{ accessToken, refreshToken, user }`  
2. **Frontend** stores token in memory (or httpOnly cookie if same-site).  
3. **Requests** — `Authorization: Bearer <accessToken>`.  
4. **Role guards** — middleware enforces:
   - `superadmin`: clubs CRUD, users CRUD  
   - `clubadmin`: scoped to `clubId` — tee slots, hours, tournaments, bookings, scorecards  
   - `player`: join club, book tournament, read leaderboard  

### 5.2 R1 demo → prod transition

- Phase A: Optional auth; all routes open (current demo).  
- Phase B: Auth required; sidebar still shows all roles for **superadmin impersonation** only.  
- Phase C: Hide nav sections by `user.role` from `/api/v1/me`.

### 5.3 Session notes

- No auth in R1 UI today — Playwright specs assume open access.  
- When auth lands, add `storageState` fixture and `POST /auth/login` in global setup.  
- 401 responses should redirect to `/login` (specs in `*.api.spec.ts` already stub this pattern).

---

## 6. Error handling standard

All non-2xx responses:

```json
{
  "message": "Human-readable error",
  "code": "VALIDATION_ERROR | NOT_FOUND | CONFLICT | UNAUTHORIZED",
  "details": [{ "field": "email", "message": "Invalid format" }]
}
```

| Status | Frontend behavior |
|--------|-------------------|
| 400 | Inline field errors (forms) |
| 401 | Redirect login |
| 404 | Empty / not found copy |
| 409 | Duplicate (e.g. email exists) |
| 500 | Toast / alert “Something went wrong” |

---

## 7. Deployment considerations

### 7.1 Topology

```
[Browser] → [CDN / static host: Frontend build]
         → [API gateway / BFF] → [App service] → [PostgreSQL]
```

### 7.2 Build & env

- Build: `cd Frontend && npm run build` → `dist/`  
- Serve SPA with fallback to `index.html` for client-side routes (single `/` today).  
- Inject `VITE_API_URL=https://api.<env>.teevo.app/api/v1` at build time per environment.

### 7.3 CORS

- Allow frontend origin(s) for `GET, POST, PATCH, PUT, DELETE`.  
- Expose `Authorization` header.  
- Credentials: `true` if using cookies.

### 7.4 Ports (local)

| Service | Port |
|---------|------|
| Vite dev server | `5173` (override with `PW_DEV_PORT` / `PORT`) |
| API (suggested) | `3000` or `8080` |

Playwright resolves base URL via `BASE_URL`, `VITE_FRONTEND_URL`, or `http://localhost:${PW_DEV_PORT||5173}`.

---

## 8. Concrete integration steps

### Step 1 — OpenAPI contract

1. Publish `openapi.yaml` from sections 4–6.  
2. Generate TypeScript types into `Frontend/src/types/api.generated.ts`.  
3. Align `mockData.ts` interfaces with generated types.

### Step 2 — API client layer

1. Extend `src/services/api.ts` with typed methods per resource.  
2. Add `src/services/http.ts` wrapper (base URL, auth header, error parsing).  
3. Replace `throw` stubs with real `fetch`.

### Step 3 — Data fetching hooks

1. Add `useClubs()`, `useUsers()`, etc. (React Query or simple `useEffect`).  
2. Loading: render skeleton in `main-panel` (`data-testid="skeleton"` for tests).  
3. Error: `role="alert"` region for API failures.

### Step 4 — Wire `App.tsx` mutations

| Current handler | API call |
|-----------------|----------|
| `handleAddClub` | `POST /clubs` |
| `handleUpdateClub` | `PATCH /clubs/{id}` |
| `handleAddUser` | `POST /users` |
| `handleRemoveUser` | `DELETE /users/{id}` |
| `handleAddTournament` | `POST /tournaments` |
| `handleBookTournament` | `POST /tournaments/{id}/bookings` |
| `handleJoinClub` | `POST /clubs/{id}/members` |
| `handleUpdateBookingStatus` | `PATCH /bookings/{id}` |
| `setTeeSlots` | `PUT /clubs/{clubId}/tee-slots` |

### Step 5 — Club context

- Club Admin views need active `clubId` from authenticated user or selector.  
- Store in context: `ClubProvider`.

### Step 6 — Operating hours persistence

- Replace local-only `OperatingHoursPanel` state with GET on mount, PUT on Save.

### Step 7 — E2E against real API

1. Set `VITE_API_URL` to test stack.  
2. Run Playwright with `reuseExistingServer` and seeded DB.  
3. Keep `page.route()` suites for UI-only CI without backend.

### Step 8 — Release 1.0.2 checklist

- [ ] OpenAPI published and reviewed  
- [ ] Auth `/me` returns role + clubId  
- [ ] All CRUD paths return contracts in §4  
- [ ] CORS + HTTPS in staging  
- [ ] Frontend `.env.staging` with API URL  
- [ ] Smoke: `POST /clubs` + UI list update  
- [ ] Regression: `tests/teevo/R1/release-1-0-2/*.spec.ts`

---

## 9. Suggested database schema (minimal)

- `clubs` — id, name, location, holes, member_count  
- `users` — id, name, email, role, club_id FK  
- `club_members` — user_id, club_id  
- `tournaments` — id, club_id, name, date, format, max_players, spots_left  
- `tournament_registrations` — tournament_id, user_id  
- `tee_time_slots` — id, club_id, time, interval_minutes, available  
- `bookings` — id, club_id, player_id, date, tee_time, players, status  
- `scorecards` — id, club_id, player_id, course, date, gross, net  
- `operating_hours` — club_id, day_of_week, open, close, closed  

---

## 10. Risks & open questions

| Risk | Mitigation |
|------|------------|
| Demo nav exposes all roles | Gate by auth role before production |
| No `clubId` on club admin UI | Add club selector or infer from JWT |
| Submodule `launchpad-frontend` not cloned in CI | Use committed `Frontend/` as source of truth |
| In-memory IDs (`Date.now()`) | Backend returns UUIDs; map in client |

**Open questions for product:**

1. Single-tenant vs multi-tenant clubs?  
2. Payment integration for tee times / tournaments?  
3. Real-time leaderboard updates (WebSocket) or poll?

---

## 11. References

- Frontend API stubs: `Frontend/src/services/api.ts`  
- Entity types: `Frontend/src/data/mockData.ts`  
- E2E coverage: `tests/teevo/R1/release-1-0-2/`  
- Playwright config: `Frontend/playwright.config.ts`
