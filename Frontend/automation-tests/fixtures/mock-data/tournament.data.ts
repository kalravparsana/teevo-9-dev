export const tournamentData = {
  valid: {
    name: 'Summer Invitational',
    date: '2026-07-15',
    format: 'Stroke Play',
    maxPlayers: '32',
  },
  invalid: {
    emptyName: '',
    emptyDate: '',
  },
  edge: {
    longName: 'A'.repeat(500),
    unicodeName: 'Masters — 夏季邀请赛',
    maxPlayersHigh: '999999',
  },
  api: {
    listSuccess: [
      {
        id: 't1',
        name: 'Spring Classic',
        clubName: 'Pine Valley Golf Club',
        date: '2026-04-12',
        format: 'Stroke Play',
        spotsLeft: 8,
        maxPlayers: 32,
      },
    ],
    listEmpty: [],
    fullTournament: {
      id: 't-full',
      name: 'Full Event',
      clubName: 'Pine Valley Golf Club',
      date: '2026-08-01',
      format: 'Scramble',
      spotsLeft: 0,
      maxPlayers: 16,
    },
  },
} as const
