import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerTournamentsData } from '../../fixtures/mock-data/player-tournaments.data'

test.describe('Teevo R1 > Upcoming Tournaments', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.playerTournaments)
  })

  test('primary card content is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Upcoming Tournaments' })).toBeVisible()
  })
})
