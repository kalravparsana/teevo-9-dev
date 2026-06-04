export const manageUsersData = {
  valid: {
    name: 'Casey Brooks',
    email: 'casey.brooks@teevo.app',
    role: 'player',
  },
  invalid: {
    email: 'not-an-email',
    emptyName: '',
    emptyEmail: '',
  },
  edge: {
    longName: 'B'.repeat(200),
    unicodeName: 'Müller Ñoño',
    xssEmail: '"><script>alert(1)</script>@x.com',
  },
  api: {
    usersSuccess: [
      { id: 'u1', name: 'Alex Morgan', email: 'alex@teevo.app', role: 'superadmin' },
    ],
    usersEmpty: [],
  },
} as const;
