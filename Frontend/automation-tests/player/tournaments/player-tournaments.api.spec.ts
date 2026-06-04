import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerTournamentsData } from '../../fixtures/mock-data/player-tournaments.data'

test.describe('Teevo R1 > Upcoming Tournaments', () => {
  test('future API success mock does not break page', async ({ page }) => {
    await page.route('**/api/tournaments**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(playerTournamentsData.api.profileSuccess),
      }),
    )
    await gotoView(page, NAV_IDS.playerTournaments)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('API 500 route does not crash shell', async ({ page }) => {
    await page.route('**/api/tournaments**', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: playerTournamentsData.api.errorMessage }),
      }),
    )
    await gotoView(page, NAV_IDS.playerTournaments)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('API network abort does not crash shell', async ({ page }) => {
    await page.route('**/api/tournaments**', (route) => route.abort('failed'))
    await gotoView(page, NAV_IDS.playerTournaments)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('malformed JSON response does not crash page', async ({ page }) => {
    await page.route('**/api/tournaments**', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    await gotoView(page, NAV_IDS.playerTournaments)
    await expect(page.getByTestId('app-main')).toBeVisible()
  })
})
