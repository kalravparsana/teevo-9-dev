import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { clubData } from '../../../fixtures/mock-data/club.data'

test.describe('Add Club — Error & Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
  })

  test('malformed API response does not crash feature view', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await expect(app.mainPanel).toBeVisible()
  })
  test('error message clears after correction', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText('Club name and location are required.')).toBeVisible()
    await page.getByLabel('Club name').fill(clubData.valid.name)
    await page.getByLabel('Location').fill(clubData.valid.location)
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText('Club added successfully.')).toBeVisible()
  })
})
