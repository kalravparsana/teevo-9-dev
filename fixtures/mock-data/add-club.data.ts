export const addClubData = {
  valid: {
    name: 'Oak Hills Golf Club',
    location: 'Austin, USA',
    holes: '18',
    notes: 'Championship course with practice range.',
  },
  invalid: {
    emptyName: '',
    emptyLocation: '',
    whitespaceName: '   ',
  },
  edge: {
    longName: 'A'.repeat(500),
    unicodeLocation: '東京, 日本',
    xssNotes: '<script>alert(1)</script>',
  },
  api: {
    clubsSuccess: [
      { id: '1', name: 'Pine Valley Golf Club', location: 'New Jersey, USA', holes: 18, memberCount: 420 },
    ],
    clubsEmpty: [],
    errorMessage: 'Request failed',
  },
} as const;
