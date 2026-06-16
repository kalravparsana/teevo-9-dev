import type { Page } from '@playwright/test'
import { getBaseUrl } from '../utils/getBaseUrl'

export const NAV = {
  addClub: 'nav-sa-add-club',
  manageUsers: 'nav-sa-users',
  clubDetails: 'nav-sa-club-details',
  teeTimes: 'nav-ca-tee-times',
  operatingHours: 'nav-ca-hours',
  tournamentsAdmin: 'nav-ca-tournaments',
  bookings: 'nav-ca-bookings',
  scorecards: 'nav-ca-scorecards',
  clubs: 'nav-pl-clubs',
  tournamentsPlayer: 'nav-pl-tournaments',
  leaderboard: 'nav-pl-leaderboard',
} as const

export class TeevoAppPage {
  readonly baseURL = getBaseUrl()

  constructor(readonly page: Page) {}

  async gotoHome() {
    await this.page.goto(this.baseURL)
    await this.page.waitForLoadState('domcontentloaded')
  }

  async navigate(testId: (typeof NAV)[keyof typeof NAV]) {
    await this.page.getByTestId(testId).click()
    await this.page.getByTestId('main-panel').waitFor({ state: 'visible' })
  }

  sidebar() {
    return this.page.getByTestId('sidebar')
  }

  mainPanel() {
    return this.page.getByTestId('main-panel')
  }

  pageHeading() {
    return this.page.getByRole('heading', { level: 1 })
  }
}
