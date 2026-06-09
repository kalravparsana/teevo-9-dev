import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { tournamentsAdminData } from '../../fixtures/mock-data/tournaments-admin.data'

test.describe('Teevo R1 > Tournament Management', () => {
  test('future API success mock does not break page', async ({ page }) => {
    await page.route('**/api/tournaments**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(tournamentsAdminData.api.tournamentsSuccess),
      }),
    )
    await gotoView(page, NAV_IDS.tournamentsAdmin)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('API 500 route does not crash shell', async ({ page }) => {
    await page.route('**/api/tournaments**', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: tournamentsAdminData.api.errorMessage }),
      }),
    )
    await gotoView(page, NAV_IDS.tournamentsAdmin)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('API network abort does not crash shell', async ({ page }) => {
    await page.route('**/api/tournaments**', (route) => route.abort('failed'))
    await gotoView(page, NAV_IDS.tournamentsAdmin)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('malformed JSON response does not crash page', async ({ page }) => {
    await page.route('**/api/tournaments**', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    await gotoView(page, NAV_IDS.tournamentsAdmin)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })
})
