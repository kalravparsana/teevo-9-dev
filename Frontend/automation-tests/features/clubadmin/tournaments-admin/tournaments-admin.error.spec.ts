import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Tournament Management — Error & Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tournaments')
  })

  test('malformed API response does not crash feature view', async ({ page }) => {
    await page.route('**/api/tournaments', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tournaments')
    await expect(app.mainPanel).toBeVisible()
  })
})
