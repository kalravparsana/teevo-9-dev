import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { clubDetailsData } from '../../fixtures/mock-data/club-details.data'

test.describe('Teevo R1 > Club Details', () => {
  test('future API success mock does not break page', async ({ page }) => {
    await page.route('**/api/clubs**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(clubDetailsData.api.clubsSuccess),
      }),
    )
    await gotoView(page, NAV_IDS.clubDetails)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('API 500 route does not crash shell', async ({ page }) => {
    await page.route('**/api/clubs**', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: clubDetailsData.api.errorMessage }),
      }),
    )
    await gotoView(page, NAV_IDS.clubDetails)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('API network abort does not crash shell', async ({ page }) => {
    await page.route('**/api/clubs**', (route) => route.abort('failed'))
    await gotoView(page, NAV_IDS.clubDetails)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('malformed JSON response does not crash page', async ({ page }) => {
    await page.route('**/api/clubs**', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    await gotoView(page, NAV_IDS.clubDetails)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })
})
