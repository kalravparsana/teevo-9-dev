export const teevoData = {
  valid: {
    clubName: 'Oak Hills Golf Club',
    clubLocation: 'Austin, Texas, USA',
    userName: 'Jamie Fox',
    userEmail: 'jamie.fox@teevo.app',
    searchClub: 'Pine Valley',
    tournamentName: 'Summer Open',
    tournamentDate: '2026-07-15',
  },
  invalid: {
    email: 'not-an-email',
    empty: '',
    whitespace: '     ',
  },
  edge: {
    longName: 'A'.repeat(500),
    xssLike: '<script>alert(1)</script>',
    search200: 'A'.repeat(200),
    unicodeLocation: 'Zürich, Schweiz — 日本',
  },
  api: {
    clubs: [
      { id: '1', name: 'Pine Valley Golf Club', location: 'New Jersey, USA', holes: 18, memberCount: 420 },
    ],
    clubsEmpty: [],
    errorMessage: 'Internal Server Error',
    users: [{ id: 'u1', name: 'Alex Morgan', email: 'alex@teevo.app', role: 'superadmin' }],
    tournaments: [
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
    leaderboard: [
      { rank: 1, playerName: 'Chris Park', tournamentName: 'Spring Classic', score: 68, par: 72 },
    ],
  },
} as const
