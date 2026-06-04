export const teeTimeData = {
  valid: {
    startTime: '07:00',
    interval: '10',
  },
  api: {
    listSuccess: [
      { id: 's1', time: '07:00', intervalMinutes: 10, available: true },
      { id: 's2', time: '07:10', intervalMinutes: 10, available: false },
    ],
    listEmpty: [],
    errorMessage: 'Request failed',
  },
  edge: {
    earlyStart: '05:30',
    lateStart: '18:00',
  },
} as const
