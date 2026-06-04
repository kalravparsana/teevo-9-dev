import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerClubsData } from '../../fixtures/mock-data/player-clubs.data'

test.describe('Teevo R1 > Browse Clubs', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.playerClubs)
  })

  test('search input and club cards are visible', async ({ page }) => {
    await expect(page.getByTestId('clubs-search')).toBeVisible()
    await expect(page.getByText(playerClubsData.valid.matchClub)).toBeVisible()
  })
})
