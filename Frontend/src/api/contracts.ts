/** R1 API contracts — mirror backend plan `backend-vR1-release1-0-0.md`. */

export type UserRole = 'superadmin' | 'clubadmin' | 'player'

export interface ClubDto {
  id: string
  name: string
  location: string
  holes: number
  memberCount: number
}

export interface UserDto {
  id: string
  name: string
  email: string
  role: UserRole
  clubId?: string
}

export interface TournamentDto {
  id: string
  name: string
  clubName: string
  date: string
  format: string
  spotsLeft: number
  maxPlayers: number
}

export interface TeeTimeSlotDto {
  id: string
  time: string
  intervalMinutes: number
  available: boolean
}

export interface GameBookingDto {
  id: string
  playerName: string
  date: string
  teeTime: string
  players: number
  status: 'confirmed' | 'pending' | 'cancelled'
}

export interface ApiErrorBody {
  message: string
  code?: string
}
