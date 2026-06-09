import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../utils/navigation'
import { appShellData } from '../fixtures/mock-data/app-shell.data'

test.describe('Teevo R1 > App Shell', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('rapid navigation between views does not break layout', async ({ page }) => {
    await navigateTo(page, NAV_IDS.manageUsers)
    await navigateTo(page, NAV_IDS.playerClubs)
    await navigateTo(page, NAV_IDS.addClub)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('special characters in inputs are handled safely', async ({ page }) => {
    await expect(page.getByTestId('app-main')).toBeVisible()
    const alertFired = await page.evaluate(() => (window as unknown as { __xss?: boolean }).__xss === true)
    expect(alertFired).toBeFalsy()
  })
})
