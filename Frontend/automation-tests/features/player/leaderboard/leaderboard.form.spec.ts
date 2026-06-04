import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { leaderboardData } from '../../../fixtures/mock-data/leaderboard.data'

test.describe('Tournament Leaderboard — Display Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Leaderboard')
  })

  test('top ranked player is displayed first', async ({ page }) => {
    const firstEntry = page.locator('ol li').first()
    await expect(firstEntry.getByText(leaderboardData.valid.topPlayer)).toBeVisible()
  })

  test('tournament names are shown for each entry', async ({ page }) => {
    await expect(page.getByText('Spring Classic')).toBeVisible()
    await expect(page.getByText('Member Scramble')).toBeVisible()
  })

  test('scores are displayed for all entries', async ({ page }) => {
    await expect(page.getByText(leaderboardData.valid.topScore)).toBeVisible()
    await expect(page.getByText('70')).toBeVisible()
  })

  test('entries are sorted by rank', async ({ page }) => {
    const ranks = page.locator('ol li span').filter({ hasText: /^[1-5]$/ })
    await expect(ranks.first()).toHaveText('1')
  })
})
