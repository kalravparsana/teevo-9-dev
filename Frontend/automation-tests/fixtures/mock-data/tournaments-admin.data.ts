export const tournamentsAdminData = {
  valid: {
    name: 'Summer Open',
    date: '2026-07-15',
    format: 'Stroke Play',
    maxPlayers: '24',
    createButton: 'Create Tournament',
    cancelButton: 'Cancel',
    existingTournament: 'Spring Classic',
  },
  invalid: {
    name: '',
    date: '',
    maxPlayers: 'abc',
  },
  edge: {
    longName: 'A'.repeat(500),
    maxPlayersHigh: '999999',
    xssLikeText: '<script>alert(1)</script>',
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
    errorMessage: 'Failed to create tournament',
  },
} as const
