import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Club Details — Error & Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Club Details')
  })

  test('malformed API response does not crash feature view', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Club Details')
    await expect(app.mainPanel).toBeVisible()
  })
})
