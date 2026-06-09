export const clubDetailsData = {
  valid: {
    selectLabel: 'Select club',
    name: 'Pine Valley Golf Club',
    updatedName: 'Pine Valley Championship',
    location: 'New Jersey, USA',
    updatedLocation: 'New Jersey, United States',
    holes: '18',
    savedMessage: 'Club details saved.',
    emptyMessage: 'No clubs yet. Add a club first.',
  },
  invalid: {
    name: '   ',
    location: '   ',
  },
  edge: {
    longName: 'A'.repeat(500),
    unicodeLocation: 'Fife — Scotland',
    xssLikeText: '<script>alert(1)</script>',
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
    errorMessage: 'Failed to update club',
  },
} as const
