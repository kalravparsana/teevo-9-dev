export const bookingData = {
  valid: {
    pendingPlayer: 'Mia Chen',
    confirmedPlayer: 'Sam Rivera',
  },
  api: {
    listSuccess: [
      { id: 'b1', playerName: 'Sam Rivera', date: '2026-06-05', teeTime: '09:20', players: 4, status: 'confirmed' },
      { id: 'b2', playerName: 'Mia Chen', date: '2026-06-06', teeTime: '14:00', players: 2, status: 'pending' },
    ],
    listEmpty: [],
  },
} as const
