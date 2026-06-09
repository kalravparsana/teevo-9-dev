export const playerTournamentsData = {
  valid: {
    cardTitle: 'Upcoming Tournaments',
    bookButton: 'Book Spot',
    bookedButton: 'Booked',
    fullButton: 'Full',
    tournamentName: 'Spring Classic',
    clubName: 'Pine Valley Golf Club',
    registeredPrefix: 'Registered for',
  },
  invalid: {},
  edge: {
    xssLikeText: '<script>alert(1)</script>',
    longTournamentName: 'A'.repeat(500),
  },
  api: {
    tournamentsSuccess: [
      {
        id: 't1',
        name: 'Spring Classic',
        clubName: 'Pine Valley Golf Club',
        date: '2026-04-12',
        format: 'Stroke Play',
        spotsLeft: 8,
        maxPlayers: 32,
      },
    ],
    tournamentsEmpty: [],
    tournamentsFull: [
      {
        id: 't-full',
        name: 'Full Event',
        clubName: 'Test Club',
        date: '2026-08-01',
        format: 'Stroke Play',
        spotsLeft: 0,
        maxPlayers: 16,
      },
    ],
    errorMessage: 'Failed to load tournaments',
  },
} as const
