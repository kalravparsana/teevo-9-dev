export const operatingHoursData = {
  valid: {
    mondayOpen: '06:30',
    mondayClose: '20:00',
    sundayOpen: '08:00',
    sundayClose: '18:00',
  },
  edge: {
    earlyOpen: '05:00',
    lateClose: '23:00',
  },
  api: {
    listSuccess: [{ day: 'Monday', open: '06:30', close: '20:00', closed: false }],
    listEmpty: [],
    saveSuccess: { success: true },
    errorMessage: 'Request failed',
  },
} as const
