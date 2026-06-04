export type UserRole = 'superadmin' | 'clubadmin' | 'player'

export type SuperadminView = 'add-club' | 'manage-users' | 'club-details'
export type ClubAdminView =
  | 'tee-times'
  | 'operating-hours'
  | 'tournaments'
  | 'bookings'
  | 'scorecards'
export type PlayerView = 'clubs' | 'tournaments' | 'leaderboard'

export type AppView =
  | { role: 'superadmin'; view: SuperadminView }
  | { role: 'clubadmin'; view: ClubAdminView }
  | { role: 'player'; view: PlayerView }

export interface NavItem {
  id: string
  label: string
  view: AppView
}

export interface NavSection {
  role: UserRole
  title: string
  items: NavItem[]
}
