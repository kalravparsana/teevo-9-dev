export const manageUsersData = {
  valid: {
    name: 'Jordan Lee',
    email: 'jordan.new@teevo.app',
    role: 'clubadmin',
    roleLabel: 'Club Admin',
    existingUser: 'Alex Morgan',
    existingEmail: 'alex@teevo.app',
  },
  invalid: {
    name: '',
    email: 'not-an-email',
    emailShort: 'a@b',
  },
  edge: {
    longName: 'A'.repeat(500),
    unicodeName: 'Müller — 日本',
    whitespaceOnly: '   ',
    xssLikeText: '<script>alert(1)</script>',
  },
  api: {
    usersSuccess: [
      { id: 'u1', name: 'Alex Morgan', email: 'alex@teevo.app', role: 'superadmin' },
    ],
    usersEmpty: [],
    errorMessage: 'Failed to load users',
    duplicateMessage: 'Already exists',
  },
} as const
