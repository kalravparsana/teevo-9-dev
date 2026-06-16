import type { AppView, NavSection } from '../types/navigation'

export const NAV_SECTIONS: NavSection[] = [
  {
    role: 'superadmin',
    title: 'Superadmin',
    items: [
      {
        id: 'sa-add-club',
        label: 'Add Club',
        view: { role: 'superadmin', view: 'add-club' },
      },
      {
        id: 'sa-users',
        label: 'Manage Users',
        view: { role: 'superadmin', view: 'manage-users' },
      },
      {
        id: 'sa-club-details',
        label: 'Club Details',
        view: { role: 'superadmin', view: 'club-details' },
      },
    ],
  },
  {
    role: 'clubadmin',
    title: 'Club Admin',
    items: [
      {
        id: 'ca-tee-times',
        label: 'Tee Time Slots',
        view: { role: 'clubadmin', view: 'tee-times' },
      },
      {
        id: 'ca-hours',
        label: 'Operating Hours',
        view: { role: 'clubadmin', view: 'operating-hours' },
      },
      {
        id: 'ca-tournaments',
        label: 'Tournaments',
        view: { role: 'clubadmin', view: 'tournaments' },
      },
      {
        id: 'ca-bookings',
        label: 'Game Bookings',
        view: { role: 'clubadmin', view: 'bookings' },
      },
      {
        id: 'ca-scorecards',
        label: 'Scorecards',
        view: { role: 'clubadmin', view: 'scorecards' },
      },
    ],
  },
  {
    role: 'player',
    title: 'Player',
    items: [
      {
        id: 'pl-clubs',
        label: 'Browse Clubs',
        view: { role: 'player', view: 'clubs' },
      },
      {
        id: 'pl-tournaments',
        label: 'Tournaments',
        view: { role: 'player', view: 'tournaments' },
      },
      {
        id: 'pl-leaderboard',
        label: 'Leaderboard',
        view: { role: 'player', view: 'leaderboard' },
      },
    ],
  },
]

export const DEFAULT_VIEW: AppView = {
  role: 'superadmin',
  view: 'add-club',
}

export function viewKey(view: AppView): string {
  return `${view.role}:${view.view}`
}

export function isSameView(a: AppView, b: AppView): boolean {
  return a.role === b.role && a.view === b.view
}

export const VIEW_TITLES: Record<string, string> = {
  'superadmin:add-club': 'Add Club',
  'superadmin:manage-users': 'Manage Users',
  'superadmin:club-details': 'Configure Club Details',
  'clubadmin:tee-times': 'Tee Time Slots',
  'clubadmin:operating-hours': 'Operating Hours',
  'clubadmin:tournaments': 'Tournament Management',
  'clubadmin:bookings': 'Game Bookings',
  'clubadmin:scorecards': 'Scorecards',
  'player:clubs': 'Browse Clubs',
  'player:tournaments': 'Upcoming Tournaments',
  'player:leaderboard': 'Tournament Leaderboard',
}
