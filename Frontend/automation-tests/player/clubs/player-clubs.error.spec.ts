import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerClubsData } from '../../fixtures/mock-data/player-clubs.data'

test.describe('Teevo R1 > Browse Clubs', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.playerClubs)
  })

  test('page remains usable after validation error', async ({ page }) => {
    await page.getByTestId('clubs-search').fill('nomatchxyz')
    await expect(page.getByText(playerClubsData.valid.noResultsMessage)).toBeVisible()
    await expect(page.getByTestId('app-sidebar')).toBeVisible()
  })

  test('navigating away after error clears view-specific state', async ({ page }) => {
    await navigateTo(page, NAV_IDS.addClub)
    await navigateTo(page, NAV_IDS.playerClubs)
    await expect(page.getByRole('heading', { level: 1, name: 'Browse Clubs' })).toBeVisible()
  })
})
