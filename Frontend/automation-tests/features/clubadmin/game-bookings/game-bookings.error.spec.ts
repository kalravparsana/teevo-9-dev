import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Game Bookings — Error & Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Game Bookings')
  })

  test('malformed API response does not crash feature view', async ({ page }) => {
    await page.route('**/api/bookings', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Game Bookings')
    await expect(app.mainPanel).toBeVisible()
  })
  test('rapid Confirm clicks do not break UI', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Confirm' })
    if (await btn.isVisible()) {
      await btn.click()
      await btn.click()
    }
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
