export const scorecardData = {
  valid: {
    playerName: 'Sam Rivera',
    course: 'Pine Valley',
  },
  api: {
    listSuccess: [
      { id: 'sc1', playerName: 'Sam Rivera', course: 'Pine Valley', date: '2026-05-28', gross: 82, net: 74 },
      { id: 'sc2', playerName: 'Chris Park', course: 'Pine Valley', date: '2026-05-30', gross: 76, net: 70 },
    ],
    listEmpty: [],
    errorMessage: 'Request failed',
  },
  edge: {
    longPlayerName: 'A'.repeat(500),
    xssPlayerName: '<script>alert(1)</script>',
  },
} as const
