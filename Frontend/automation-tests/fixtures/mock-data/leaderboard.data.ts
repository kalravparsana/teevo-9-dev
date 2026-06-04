export const leaderboardData = {
  valid: {
    topPlayer: 'Chris Park',
    topScore: '68',
  },
  api: {
    listSuccess: [
      { rank: 1, playerName: 'Chris Park', tournamentName: 'Spring Classic', score: 68, par: 72 },
      { rank: 2, playerName: 'Mia Chen', tournamentName: 'Spring Classic', score: 70, par: 72 },
    ],
    listEmpty: [],
    errorMessage: 'Request failed',
  },
  edge: {
    longPlayerName: 'A'.repeat(500),
    xssPlayerName: '<script>alert(1)</script>',
  },
} as const
