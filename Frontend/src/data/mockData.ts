export interface Club {
  id: string
  name: string
  location: string
  holes: number
  memberCount: number
}

export interface AppUser {
  id: string
  name: string
  email: string
  role: 'superadmin' | 'clubadmin' | 'player'
  clubId?: string
}

export interface Tournament {
  id: string
  name: string
  clubName: string
  date: string
  format: string
  spotsLeft: number
  maxPlayers: number
}

export interface LeaderboardEntry {
  rank: number
  playerName: string
  tournamentName: string
  score: number
  par: number
}

export interface TeeTimeSlot {
  id: string
  time: string
  intervalMinutes: number
  available: boolean
}

export interface GameBooking {
  id: string
  playerName: string
  date: string
  teeTime: string
  players: number
  status: 'confirmed' | 'pending' | 'cancelled'
}

export interface Scorecard {
  id: string
  playerName: string
  course: string
  date: string
  gross: number
  net: number
}

export const initialClubs: Club[] = [
  { id: '1', name: 'Pine Valley Golf Club', location: 'New Jersey, USA', holes: 18, memberCount: 420 },
  { id: '2', name: 'St Andrews Links', location: 'Fife, Scotland', holes: 18, memberCount: 890 },
  { id: '3', name: 'Augusta National', location: 'Georgia, USA', holes: 18, memberCount: 300 },
]

export const initialUsers: AppUser[] = [
  { id: 'u1', name: 'Alex Morgan', email: 'alex@teevo.app', role: 'superadmin' },
  { id: 'u2', name: 'Jordan Lee', email: 'jordan@pinevalley.com', role: 'clubadmin', clubId: '1' },
  { id: 'u3', name: 'Sam Rivera', email: 'sam@example.com', role: 'player' },
]

export const initialTournaments: Tournament[] = [
  {
    id: 't1',
    name: 'Spring Classic',
    clubName: 'Pine Valley Golf Club',
    date: '2026-04-12',
    format: 'Stroke Play',
    spotsLeft: 8,
    maxPlayers: 32,
  },
  {
    id: 't2',
    name: 'Member Scramble',
    clubName: 'St Andrews Links',
    date: '2026-05-03',
    format: 'Scramble',
    spotsLeft: 2,
    maxPlayers: 16,
  },
  {
    id: 't3',
    name: 'Club Championship',
    clubName: 'Augusta National',
    date: '2026-06-18',
    format: 'Match Play',
    spotsLeft: 14,
    maxPlayers: 64,
  },
]

export const initialLeaderboard: LeaderboardEntry[] = [
  { rank: 1, playerName: 'Chris Park', tournamentName: 'Spring Classic', score: 68, par: 72 },
  { rank: 2, playerName: 'Mia Chen', tournamentName: 'Spring Classic', score: 70, par: 72 },
  { rank: 3, playerName: 'Taylor Brooks', tournamentName: 'Member Scramble', score: 71, par: 72 },
  { rank: 4, playerName: 'Sam Rivera', tournamentName: 'Spring Classic', score: 74, par: 72 },
  { rank: 5, playerName: 'Jordan Lee', tournamentName: 'Club Championship', score: 75, par: 72 },
]

export const defaultTeeSlots: TeeTimeSlot[] = [
  { id: 's1', time: '07:00', intervalMinutes: 10, available: true },
  { id: 's2', time: '07:10', intervalMinutes: 10, available: true },
  { id: 's3', time: '07:20', intervalMinutes: 10, available: false },
  { id: 's4', time: '07:30', intervalMinutes: 10, available: true },
]

export const defaultBookings: GameBooking[] = [
  { id: 'b1', playerName: 'Sam Rivera', date: '2026-06-05', teeTime: '09:20', players: 4, status: 'confirmed' },
  { id: 'b2', playerName: 'Mia Chen', date: '2026-06-06', teeTime: '14:00', players: 2, status: 'pending' },
]

export const defaultScorecards: Scorecard[] = [
  { id: 'sc1', playerName: 'Sam Rivera', course: 'Pine Valley', date: '2026-05-28', gross: 82, net: 74 },
  { id: 'sc2', playerName: 'Chris Park', course: 'Pine Valley', date: '2026-05-30', gross: 76, net: 70 },
]
