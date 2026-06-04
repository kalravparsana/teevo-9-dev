import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerLeaderboardData } from '../../fixtures/mock-data/player-leaderboard.data'

test.describe('Teevo R1 > Tournament Leaderboard', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.leaderboard)
  })

  test('leaderboard entries are visible', async ({ page }) => {
    await expect(page.getByText(playerLeaderboardData.valid.topPlayer)).toBeVisible()
    await expect(page.getByText(playerLeaderboardData.valid.topScore)).toBeVisible()
  })
})
