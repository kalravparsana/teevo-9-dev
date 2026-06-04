import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Tee Time Slots — Error & Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tee Time Slots')
  })

  test('malformed API response does not crash feature view', async ({ page }) => {
    await page.route('**/api/tee-times', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tee Time Slots')
    await expect(app.mainPanel).toBeVisible()
  })
})
