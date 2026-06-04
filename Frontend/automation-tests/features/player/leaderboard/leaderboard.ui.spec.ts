import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { leaderboardData } from '../../../fixtures/mock-data/leaderboard.data'

test.describe('Tournament Leaderboard — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/leaderboard', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(leaderboardData.api.listSuccess ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Leaderboard')
  })

  test('leaderboard shows ranked entries', async ({ page }) => {
    await expect(page.getByText('Chris Park')).toBeVisible()
    await expect(page.getByText('Mia Chen')).toBeVisible()
  })

  test('rank numbers are displayed', async ({ page }) => {
    await expect(page.getByText('1', { exact: true })).toBeVisible()
    await expect(page.getByText('2', { exact: true })).toBeVisible()
  })

  test('scores and par values are visible', async ({ page }) => {
    await expect(page.getByText('68')).toBeVisible()
    await expect(page.getByText(/Par 72/).first()).toBeVisible()
  })
})
