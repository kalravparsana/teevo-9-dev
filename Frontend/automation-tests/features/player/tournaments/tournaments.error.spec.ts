import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Upcoming Tournaments — Error & Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Tournaments')
  })

  test('malformed API response does not crash feature view', async ({ page }) => {
    await page.route('**/api/tournaments', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Tournaments')
    await expect(app.mainPanel).toBeVisible()
  })
  test('double Book Spot click does not crash', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Book Spot' }).first()
    await btn.click()
    await btn.click({ force: true })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
