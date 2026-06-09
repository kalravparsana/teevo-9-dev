export const bookingsData = {
  valid: {
    cardTitle: 'Game Bookings',
    pendingPlayer: 'Mia Chen',
    confirmedPlayer: 'Sam Rivera',
    confirmButton: 'Confirm',
    declineButton: 'Decline',
    cancelButton: 'Cancel',
    statusPending: 'pending',
    statusConfirmed: 'confirmed',
    statusCancelled: 'cancelled',
  },
  invalid: {},
  edge: {
    xssPlayerName: '<script>alert(1)</script>',
    longPlayerName: 'A'.repeat(500),
  },
  api: {
    bookingsSuccess: [
      {
        id: 'b1',
        playerName: 'Sam Rivera',
        date: '2026-06-05',
        teeTime: '09:20',
        players: 4,
        status: 'confirmed',
      },
      {
        id: 'b2',
        playerName: 'Mia Chen',
        date: '2026-06-06',
        teeTime: '14:00',
        players: 2,
        status: 'pending',
      },
    ],
    bookingsEmpty: [],
    errorMessage: 'Failed to load bookings',
  },
} as const
