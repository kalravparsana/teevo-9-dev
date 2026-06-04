import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerLeaderboardData } from '../../fixtures/mock-data/player-leaderboard.data'

test.describe('Teevo R1 > Tournament Leaderboard', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.leaderboard)
  })

  test('read-only view has no editable submit controls', async ({ page }) => {
    await expect(page.getByRole('button', { name: /submit|save|create/i })).toHaveCount(0)
  })
})
