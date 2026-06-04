export const clubData = {
  valid: {
    name: 'Oak Ridge Country Club',
    location: 'Austin, Texas, USA',
    holes: '18',
    notes: 'Championship course with practice facilities.',
  },
  invalid: {
    emptyName: '',
    emptyLocation: '',
    whitespaceName: '   ',
  },
  edge: {
    longName: 'A'.repeat(500),
    unicodeLocation: 'Zürich, Schweiz — 日本',
    xssNotes: '<script>alert(1)</script>',
    specialChars: '!@#$%^&*()<>?/\\|{}~`',
  },
  api: {
    listSuccess: [
      { id: '1', name: 'Pine Valley Golf Club', location: 'New Jersey, USA', holes: 18, memberCount: 420 },
      { id: '2', name: 'St Andrews Links', location: 'Fife, Scotland', holes: 18, memberCount: 890 },
    ],
    listEmpty: [],
    createSuccess: { id: 'club-99', name: 'Oak Ridge Country Club', location: 'Austin, Texas, USA', holes: 18, memberCount: 0 },
    errorMessage: 'Request failed',
  },
} as const
