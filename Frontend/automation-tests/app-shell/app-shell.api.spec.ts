import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../utils/navigation'
import { appShellData } from '../fixtures/mock-data/app-shell.data'

test.describe('Teevo R1 > App Shell', () => {
  test('future API success mock does not break page', async ({ page }) => {
    await page.route('**/api/profile**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(appShellData.api.profileSuccess),
      }),
    )
    await gotoHome(page)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('API 500 route does not crash shell', async ({ page }) => {
    await page.route('**/api/profile**', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: appShellData.api.errorMessage }),
      }),
    )
    await gotoHome(page)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('API network abort does not crash shell', async ({ page }) => {
    await page.route('**/api/profile**', (route) => route.abort('failed'))
    await gotoHome(page)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('malformed JSON response does not crash page', async ({ page }) => {
    await page.route('**/api/profile**', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    await gotoHome(page)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })
})
