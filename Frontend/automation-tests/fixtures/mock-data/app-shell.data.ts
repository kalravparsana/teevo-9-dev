export const appShellData = {
  valid: {
    displayName: 'Alex Morgan',
    pageTitleAddClub: 'Add Club',
    notificationsLabel: 'Notifications',
    settingsTrigger: 'App Settings',
  },
  invalid: {
    displayName: '   ',
  },
  edge: {
    displayNameLong: 'A'.repeat(120),
    displayNameUnicode: 'Alex & Co. — 日本',
    xssLikeText: '<script>alert(1)</script>',
  },
  api: {
    profileSuccess: { displayName: 'Alex Morgan' },
    errorMessage: 'Request failed',
  },
} as const
