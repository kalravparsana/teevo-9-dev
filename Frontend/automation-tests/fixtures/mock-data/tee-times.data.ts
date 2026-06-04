export const teeTimesData = {
  valid: {
    startTime: '07:00',
    interval: '10',
    intervalLabel: '10 minutes',
    generateButton: 'Generate Slots',
    toggleButton: 'Toggle',
    defaultSlotTime: '07:00',
    availableLabel: 'Available',
    bookedLabel: 'Booked',
  },
  invalid: {
    startTime: '',
  },
  edge: {
    startTimeLate: '23:45',
    intervalMin: '8',
    xssLikeText: '<script>alert(1)</script>',
  },
  api: {
    slotsSuccess: [
      { id: 's1', time: '07:00', intervalMinutes: 10, available: true },
      { id: 's2', time: '07:10', intervalMinutes: 10, available: false },
    ],
    slotsEmpty: [],
    errorMessage: 'Failed to load tee times',
  },
} as const
