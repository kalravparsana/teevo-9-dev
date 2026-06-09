export const playerClubsData = {
  valid: {
    searchPlaceholder: 'Search clubs...',
    searchTerm: 'Pine',
    matchClub: 'Pine Valley Golf Club',
    locationTerm: 'Scotland',
    matchClubScotland: 'St Andrews Links',
    joinButton: 'Join Club',
    joinedButton: 'Joined',
    noResultsMessage: 'No clubs match your search.',
    cardTitle: 'Golf Clubs',
  },
  invalid: {
    searchNonsense: '!@#$%^&*()',
  },
  edge: {
    searchSingleChar: 'a',
    search200: 'A'.repeat(200),
    searchWhitespace: 'Pine ',
    xssLikeText: '<script>alert(1)</script>',
    unicodeTerm: '日本',
  },
  api: {
    clubsSuccess: [
      {
        id: '1',
        name: 'Pine Valley Golf Club',
        location: 'New Jersey, USA',
        holes: 18,
        memberCount: 420,
      },
    ],
    clubsEmpty: [],
    errorMessage: 'Failed to load clubs',
  },
} as const
