export const appShellData = {
  valid: {
    displayName: 'Taylor Brooks',
    searchTerm: 'Pine',
    notificationsLabel: 'Notifications',
  },
  edge: {
    longDisplayName: 'A'.repeat(200),
    xssDisplayName: '<script>alert(1)</script>',
    searchNoResults: 'zzzznonexistentclub999',
    searchSpecial: '!@#$%',
    searchLong: 'A'.repeat(200),
  },
  api: {
    healthOk: { status: 'ok' },
    healthError: { message: 'Service unavailable' },
  },
} as const
