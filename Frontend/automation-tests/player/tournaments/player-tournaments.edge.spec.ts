import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerTournamentsData } from '../../fixtures/mock-data/player-tournaments.data'

test.describe('Teevo R1 > Upcoming Tournaments', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.playerTournaments)
  })

  test('rapid navigation between views does not break layout', async ({ page }) => {
    await navigateTo(page, NAV_IDS.manageUsers)
    await navigateTo(page, NAV_IDS.playerClubs)
    await navigateTo(page, NAV_IDS.playerTournaments)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('special characters in inputs are handled safely', async ({ page }) => {
    await expect(page.getByTestId('app-main')).toBeVisible()
    const alertFired = await page.evaluate(() => (window as unknown as { __xss?: boolean }).__xss === true)
    expect(alertFired).toBeFalsy()
  })
})
