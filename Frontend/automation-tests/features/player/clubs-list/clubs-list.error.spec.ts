import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Browse Clubs — Error & Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Browse Clubs')
  })

  test('malformed API response does not crash feature view', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Browse Clubs')
    await expect(app.mainPanel).toBeVisible()
  })
  test('special characters in search do not crash', async ({ page }) => {
    await page.getByPlaceholder('Search clubs...').fill('!@#$%^&*()')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
