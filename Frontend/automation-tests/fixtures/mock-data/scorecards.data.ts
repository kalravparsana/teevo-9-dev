export const scorecardsData = {
  valid: {
    cardTitle: 'Scorecards',
    playerHeader: 'Player',
    courseHeader: 'Course',
    samplePlayer: 'Sam Rivera',
    sampleCourse: 'Pine Valley',
    sampleGross: '82',
    sampleNet: '74',
  },
  invalid: {},
  edge: {
    xssPlayerName: '<script>alert(1)</script>',
    longCourse: 'A'.repeat(500),
  },
  api: {
    scorecardsSuccess: [
      {
        id: 'sc1',
        playerName: 'Sam Rivera',
        course: 'Pine Valley',
        date: '2026-05-28',
        gross: 82,
        net: 74,
      },
    ],
    scorecardsEmpty: [],
    errorMessage: 'Failed to load scorecards',
  },
} as const
