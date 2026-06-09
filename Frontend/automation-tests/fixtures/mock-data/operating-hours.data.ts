export const operatingHoursData = {
  valid: {
    cardTitle: 'Club Operating Hours',
    saveButton: 'Save Hours',
    savedMessage: 'Operating hours updated.',
    monday: 'Monday',
    sunday: 'Sunday',
    opensLabel: 'Opens',
    closesLabel: 'Closes',
    closedLabel: 'Closed',
    defaultOpen: '06:30',
    defaultClose: '20:00',
  },
  invalid: {
    openAfterClose: { open: '22:00', close: '06:00' },
  },
  edge: {
    earlyOpen: '00:00',
    lateClose: '23:59',
    xssDayNote: '<script>alert(1)</script>',
  },
  api: {
    hoursSuccess: { Monday: { open: '06:30', close: '20:00', closed: false } },
    errorMessage: 'Failed to save hours',
  },
} as const
