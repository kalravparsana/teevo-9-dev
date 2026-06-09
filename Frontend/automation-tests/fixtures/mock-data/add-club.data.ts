export const addClubData = {
  valid: {
    name: 'Riverside Golf Club',
    location: 'Portland, USA',
    holes: '18',
    notes: 'Championship course with practice range.',
    successMessage: 'Club added successfully.',
    requiredError: 'Club name and location are required.',
  },
  invalid: {
    name: '',
    location: '',
    email: 'not-an-email',
  },
  edge: {
    longName: 'A'.repeat(500),
    unicodeLocation: 'St Andrews — Fife, UK',
    whitespaceOnly: '   ',
    xssLikeText: '<script>alert(1)</script>',
    search200: 'A'.repeat(200),
  },
  api: {
    clubSuccess: {
      id: 'club-api-1',
      name: 'API Test Club',
      location: 'Test City',
      holes: 18,
      memberCount: 0,
    },
    listEmpty: [],
    errorMessage: 'Failed to create club',
  },
} as const
