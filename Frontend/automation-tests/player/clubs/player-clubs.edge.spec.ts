import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerClubsData } from '../../fixtures/mock-data/player-clubs.data'

test.describe('Teevo R1 > Browse Clubs', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.playerClubs)
  })

  test('rapid navigation between views does not break layout', async ({ page }) => {
    await navigateTo(page, NAV_IDS.manageUsers)
    await navigateTo(page, NAV_IDS.playerClubs)
    await navigateTo(page, NAV_IDS.playerClubs)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('special characters in search are handled safely', async ({ page }) => {
    await page.getByTestId('clubs-search').fill(playerClubsData.edge.xssLikeText)
    const alertFired = await page.evaluate(() => (window as unknown as { __xss?: boolean }).__xss === true)
    expect(alertFired).toBeFalsy()
  })
})
