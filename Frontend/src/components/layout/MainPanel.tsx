import type { AppView } from '../../types/navigation'
import type {
  AppUser,
  Club,
  GameBooking,
  LeaderboardEntry,
  Scorecard,
  TeeTimeSlot,
  Tournament,
} from '../../data/mockData'
import { AddClubForm } from '../../features/superadmin/AddClubForm'
import { ClubDetailsPanel } from '../../features/superadmin/ClubDetailsPanel'
import { ManageUsersPanel } from '../../features/superadmin/ManageUsersPanel'
import { GameBookingsPanel } from '../../features/clubadmin/GameBookingsPanel'
import { OperatingHoursPanel } from '../../features/clubadmin/OperatingHoursPanel'
import { ScorecardsPanel } from '../../features/clubadmin/ScorecardsPanel'
import { TeeTimeSlotsPanel } from '../../features/clubadmin/TeeTimeSlotsPanel'
import { TournamentsAdminPanel } from '../../features/clubadmin/TournamentsAdminPanel'
import { ClubsListPanel } from '../../features/player/ClubsListPanel'
import { LeaderboardPanel } from '../../features/player/LeaderboardPanel'
import { TournamentsPlayerPanel } from '../../features/player/TournamentsPlayerPanel'

interface MainPanelProps {
  activeView: AppView
  clubs: Club[]
  users: AppUser[]
  tournaments: Tournament[]
  leaderboard: LeaderboardEntry[]
  teeSlots: TeeTimeSlot[]
  bookings: GameBooking[]
  scorecards: Scorecard[]
  joinedClubIds: Set<string>
  bookedTournamentIds: Set<string>
  onAddClub: (club: Club) => void
  onUpdateClub: (club: Club) => void
  onAddUser: (user: AppUser) => void
  onRemoveUser: (id: string) => void
  onUpdateTeeSlots: (slots: TeeTimeSlot[]) => void
  onAddTournament: (t: Tournament) => void
  onRemoveTournament: (id: string) => void
  onBookTournament: (id: string) => void
  onUpdateBookingStatus: (id: string, status: GameBooking['status']) => void
  onJoinClub: (clubId: string) => void
}

export function MainPanel({
  activeView,
  clubs,
  users,
  tournaments,
  leaderboard,
  teeSlots,
  bookings,
  scorecards,
  joinedClubIds,
  bookedTournamentIds,
  onAddClub,
  onUpdateClub,
  onAddUser,
  onRemoveUser,
  onUpdateTeeSlots,
  onAddTournament,
  onRemoveTournament,
  onBookTournament,
  onUpdateBookingStatus,
  onJoinClub,
}: MainPanelProps) {
  const { role, view } = activeView

  if (role === 'superadmin') {
    switch (view) {
      case 'add-club':
        return <AddClubForm onAddClub={onAddClub} />
      case 'manage-users':
        return (
          <ManageUsersPanel
            users={users}
            clubs={clubs}
            onAddUser={onAddUser}
            onRemoveUser={onRemoveUser}
          />
        )
      case 'club-details':
        return <ClubDetailsPanel clubs={clubs} onUpdateClub={onUpdateClub} />
    }
  }

  if (role === 'clubadmin') {
    switch (view) {
      case 'tee-times':
        return <TeeTimeSlotsPanel slots={teeSlots} onUpdateSlots={onUpdateTeeSlots} />
      case 'operating-hours':
        return <OperatingHoursPanel />
      case 'tournaments':
        return (
          <TournamentsAdminPanel
            tournaments={tournaments}
            onAddTournament={onAddTournament}
            onRemoveTournament={onRemoveTournament}
          />
        )
      case 'bookings':
        return <GameBookingsPanel bookings={bookings} onUpdateStatus={onUpdateBookingStatus} />
      case 'scorecards':
        return <ScorecardsPanel scorecards={scorecards} />
    }
  }

  if (role === 'player') {
    switch (view) {
      case 'clubs':
        return (
          <ClubsListPanel clubs={clubs} joinedClubIds={joinedClubIds} onJoinClub={onJoinClub} />
        )
      case 'tournaments':
        return (
          <TournamentsPlayerPanel
            tournaments={tournaments}
            bookedIds={bookedTournamentIds}
            onBook={onBookTournament}
          />
        )
      case 'leaderboard':
        return <LeaderboardPanel entries={leaderboard} />
    }
  }

  return null
}
