export const playerLeaderboardData = {
  valid: {
    cardTitle: 'Tournament Leaderboard',
    topPlayer: 'Chris Park',
    tournamentName: 'Spring Classic',
    topScore: '68',
    parLabel: 'Par 72',
    rankOne: '1',
  },
  invalid: {},
  edge: {
    xssPlayerName: '<script>alert(1)</script>',
    longTournamentName: 'A'.repeat(500),
  },
  api: {
    entriesSuccess: [
      {
        rank: 1,
        playerName: 'Chris Park',
        tournamentName: 'Spring Classic',
        score: 68,
        par: 72,
      },
      {
        rank: 2,
        playerName: 'Mia Chen',
        tournamentName: 'Spring Classic',
        score: 70,
        par: 72,
      },
    ],
    entriesEmpty: [],
    errorMessage: 'Failed to load leaderboard',
  },
} as const
