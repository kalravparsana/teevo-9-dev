import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Tournament Leaderboard — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Leaderboard')
  })

  test('all five entries render without overflow', async ({ page }) => {
    const entries = page.locator('ol li')
    expect(await entries.count()).toBe(5)
    await expect(page.getByRole('main')).toBeVisible()
  })

  test('rapid navigation away and back preserves feature', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await app.navigate('Player', 'Leaderboard')
    await expect(app.mainHeading).toHaveText('Tournament Leaderboard')
  })

  test('browser back after navigation keeps app stable', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
