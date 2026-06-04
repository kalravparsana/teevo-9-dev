export const playerClubsData = {
  valid: {
    searchTerm: 'Pine',
    clubName: 'Pine Valley Golf Club',
  },
  invalid: {
    nonsenseSearch: '!@#$%^&*()',
  },
  edge: {
    search200: 'A'.repeat(200),
    noMatch: 'zzzznonexistentclub',
    unicodeSearch: '日本',
  },
  api: {
    clubsSuccess: [
      { id: '1', name: 'Pine Valley Golf Club', location: 'New Jersey, USA', holes: 18, memberCount: 420 },
      { id: '2', name: 'St Andrews Links', location: 'Fife, Scotland', holes: 18, memberCount: 890 },
    ],
    clubsEmpty: [],
  },
} as const;
