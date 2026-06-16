/**
 * API contract stubs for backend integration (R1 / release 1.0.2).
 * Frontend currently uses in-memory state; wire these paths when the API is live.
 */
const API_BASE = import.meta.env.VITE_API_URL ?? '/api/v1'

export const apiPaths = {
  clubs: `${API_BASE}/clubs`,
  clubById: (id: string) => `${API_BASE}/clubs/${id}`,
  users: `${API_BASE}/users`,
  userById: (id: string) => `${API_BASE}/users/${id}`,
  tournaments: `${API_BASE}/tournaments`,
  tournamentById: (id: string) => `${API_BASE}/tournaments/${id}`,
  tournamentBook: (id: string) => `${API_BASE}/tournaments/${id}/bookings`,
  teeSlots: `${API_BASE}/clubs/{clubId}/tee-slots`,
  bookings: `${API_BASE}/bookings`,
  bookingById: (id: string) => `${API_BASE}/bookings/${id}`,
  scorecards: `${API_BASE}/scorecards`,
  leaderboard: `${API_BASE}/leaderboard`,
  operatingHours: (clubId: string) => `${API_BASE}/clubs/${clubId}/operating-hours`,
} as const

export type ApiError = { message: string; code?: string }

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as ApiError
    throw new Error(body.message ?? `Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

/** Placeholder clients — swap mock state in App.tsx for these when backend is ready. */
export const api = {
  getClubs: () => request<unknown[]>(apiPaths.clubs),
  createClub: (body: unknown) =>
    request<unknown>(apiPaths.clubs, { method: 'POST', body: JSON.stringify(body) }),
  getUsers: () => request<unknown[]>(apiPaths.users),
  getTournaments: () => request<unknown[]>(apiPaths.tournaments),
  getLeaderboard: () => request<unknown[]>(apiPaths.leaderboard),
}
