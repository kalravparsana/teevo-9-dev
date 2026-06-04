export const userData = {
  valid: {
    name: 'Jordan Smith',
    email: 'jordan.smith@testmail.com',
    phone: '+1 555-0199',
    handicapCount: '12.4',
    role: 'player' as const,
    clubName: 'Pine Valley Golf Club',
  },
  invalid: {
    email: 'not-an-email',
    handicapNegative: '-5',
    handicapOverMax: '55',
    emptyName: '',
    emptyEmail: '',
  },
  edge: {
    longName: 'A'.repeat(500),
    unicodeName: 'Müller — 田中',
    whitespaceEmail: '   ',
    xssName: '<script>alert(1)</script>',
  },
  api: {
    listSuccess: [
      { id: 'u1', name: 'Alex Morgan', email: 'alex@teevo.app', role: 'superadmin' },
      { id: 'u3', name: 'Sam Rivera', email: 'sam@example.com', role: 'player', handicapCount: 14 },
    ],
    listEmpty: [],
    createSuccess: { id: 'u-99', name: 'Jordan Smith', email: 'jordan.smith@testmail.com', role: 'player' },
    duplicateError: { message: 'Already exists' },
  },
} as const
