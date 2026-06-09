import type { Page } from '@playwright/test'

/** Sidebar `data-testid="nav-{id}"` identifiers from `src/config/navigation.ts`. */
export type NavId =
  | 'sa-add-club'
  | 'sa-users'
  | 'sa-club-details'
  | 'ca-tee-times'
  | 'ca-hours'
  | 'ca-tournaments'
  | 'ca-bookings'
  | 'ca-scorecards'
  | 'pl-clubs'
  | 'pl-tournaments'
  | 'pl-leaderboard'

export const NAV_IDS = {
  addClub: 'sa-add-club',
  manageUsers: 'sa-users',
  clubDetails: 'sa-club-details',
  teeTimes: 'ca-tee-times',
  operatingHours: 'ca-hours',
  tournamentsAdmin: 'ca-tournaments',
  bookings: 'ca-bookings',
  scorecards: 'ca-scorecards',
  playerClubs: 'pl-clubs',
  playerTournaments: 'pl-tournaments',
  leaderboard: 'pl-leaderboard',
} as const satisfies Record<string, NavId>

export const APP_TITLE = 'Teevo — Golf Club Management'

/** Default landing view (Add Club). */
export async function gotoHome(page: Page): Promise<void> {
  await page.goto('/')
  await page.waitForLoadState('domcontentloaded')
}

export async function navigateTo(page: Page, navId: NavId): Promise<void> {
  await page.getByTestId(`nav-${navId}`).click()
}

export async function gotoView(page: Page, navId: NavId): Promise<void> {
  await gotoHome(page)
  if (navId !== NAV_IDS.addClub) {
    await navigateTo(page, navId)
  }
}

export async function openAppSettings(page: Page): Promise<void> {
  await page.getByTestId('app-settings-trigger').click()
  await page.getByTestId('app-settings-panel').waitFor({ state: 'visible' })
}

export async function closeAppSettings(page: Page): Promise<void> {
  const panel = page.getByTestId('app-settings-panel')
  if (await panel.isVisible()) {
    await page.getByRole('button', { name: 'Close' }).click()
    await panel.waitFor({ state: 'hidden' })
  }
}
