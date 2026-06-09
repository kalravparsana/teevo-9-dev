/*
 * SEMANTIC ANALYSIS
 * - Sidebar with Superadmin / Club Admin / Player sections → role-based nav (useState activeView)
 * - Top bar "App Settings" dropdown → useState isOpen + click-outside ref
 * - Superadmin: add club form, manage users list, configure club details → local state + forms
 * - Club Admin: tee time slots, operating hours, tournaments, bookings, scorecards → useState per feature
 * - Player: clubs list with join, tournaments with book, leaderboard → mapped data + useState joins/bookings
 * - Visual: white bg, green-700 accent, gray-200 cards, 1px border, 8px radius (rounded-lg), 16px gutters (p-4/gap-4)
 */
import { useState } from 'react'
import { DEFAULT_VIEW, VIEW_TITLES, viewKey } from './config/navigation'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { MainPanel } from './components/layout/MainPanel'
import type { AppView } from './types/navigation'
import {
  defaultBookings,
  defaultScorecards,
  defaultTeeSlots,
  initialClubs,
  initialLeaderboard,
  initialTournaments,
  initialUsers,
  type AppUser,
  type Club,
  type GameBooking,
  type TeeTimeSlot,
  type Tournament,
} from './data/mockData'

function App() {
  const [activeView, setActiveView] = useState<AppView>(DEFAULT_VIEW)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const [clubs, setClubs] = useState<Club[]>(initialClubs)
  const [users, setUsers] = useState<AppUser[]>(initialUsers)
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments)
  const [leaderboard] = useState(initialLeaderboard)
  const [teeSlots, setTeeSlots] = useState<TeeTimeSlot[]>(defaultTeeSlots)
  const [bookings, setBookings] = useState<GameBooking[]>(defaultBookings)
  const [scorecards] = useState(defaultScorecards)
  const [joinedClubIds, setJoinedClubIds] = useState<Set<string>>(new Set())
  const [bookedTournamentIds, setBookedTournamentIds] = useState<Set<string>>(new Set())

  const pageTitle = VIEW_TITLES[viewKey(activeView)] ?? 'Teevo'

  const handleAddClub = (club: Club) => setClubs((prev) => [...prev, club])

  const handleUpdateClub = (club: Club) =>
    setClubs((prev) => prev.map((c) => (c.id === club.id ? club : c)))

  const handleAddUser = (user: AppUser) => setUsers((prev) => [...prev, user])

  const handleRemoveUser = (id: string) => setUsers((prev) => prev.filter((u) => u.id !== id))

  const handleAddTournament = (t: Tournament) => setTournaments((prev) => [...prev, t])

  const handleRemoveTournament = (id: string) =>
    setTournaments((prev) => prev.filter((t) => t.id !== id))

  const handleBookTournament = (id: string) => {
    setBookedTournamentIds((prev) => new Set(prev).add(id))
    setTournaments((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, spotsLeft: Math.max(0, t.spotsLeft - 1) } : t,
      ),
    )
  }

  const handleJoinClub = (clubId: string) => {
    setJoinedClubIds((prev) => new Set(prev).add(clubId))
    setClubs((prev) =>
      prev.map((c) => (c.id === clubId ? { ...c, memberCount: c.memberCount + 1 } : c)),
    )
  }

  const handleUpdateBookingStatus = (id: string, status: GameBooking['status']) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          pageTitle={pageTitle}
          notificationsEnabled={notificationsEnabled}
          onToggleNotifications={() => setNotificationsEnabled((v) => !v)}
        />

        <main data-testid="app-main" role="main" className="flex-1 overflow-y-auto p-4">
          <MainPanel
            activeView={activeView}
            clubs={clubs}
            users={users}
            tournaments={tournaments}
            leaderboard={leaderboard}
            teeSlots={teeSlots}
            bookings={bookings}
            scorecards={scorecards}
            joinedClubIds={joinedClubIds}
            bookedTournamentIds={bookedTournamentIds}
            onAddClub={handleAddClub}
            onUpdateClub={handleUpdateClub}
            onAddUser={handleAddUser}
            onRemoveUser={handleRemoveUser}
            onUpdateTeeSlots={setTeeSlots}
            onAddTournament={handleAddTournament}
            onRemoveTournament={handleRemoveTournament}
            onBookTournament={handleBookTournament}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onJoinClub={handleJoinClub}
          />
        </main>
      </div>
    </div>
  )
}

export default App
