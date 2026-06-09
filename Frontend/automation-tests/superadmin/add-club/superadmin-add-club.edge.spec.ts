import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { addClubData } from '../../fixtures/mock-data/add-club.data'

test.describe('Teevo R1 > Add Club', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.addClub)
  })

  test('rapid navigation between views does not break layout', async ({ page }) => {
    await navigateTo(page, NAV_IDS.manageUsers)
    await navigateTo(page, NAV_IDS.playerClubs)
    await navigateTo(page, NAV_IDS.addClub)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('special characters in inputs are handled safely', async ({ page }) => {
    await page.getByLabel('Club name').fill(addClubData.edge.xssLikeText)
    const alertFired = await page.evaluate(() => (window as unknown as { __xss?: boolean }).__xss === true)
    expect(alertFired).toBeFalsy()
  })
})
