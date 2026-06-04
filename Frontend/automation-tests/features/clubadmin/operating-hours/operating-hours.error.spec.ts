import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Operating Hours — Error & Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Operating Hours')
  })

  test('malformed API response does not crash feature view', async ({ page }) => {
    await page.route('**/api/operating-hours', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Operating Hours')
    await expect(app.mainPanel).toBeVisible()
  })
})
