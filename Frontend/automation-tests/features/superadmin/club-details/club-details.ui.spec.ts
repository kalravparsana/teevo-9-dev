import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { clubData } from '../../../fixtures/mock-data/club.data'

test.describe('Club Details — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(clubData.api.listSuccess ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Club Details')
  })

  test('Select club dropdown is visible', async ({ page }) => {
    await expect(page.getByLabel('Select club')).toBeVisible()
  })

  test('Club name and location fields are visible', async ({ page }) => {
    await expect(page.getByLabel('Club name')).toBeVisible()
    await expect(page.getByLabel('Location')).toBeVisible()
  })

  test('Save Changes button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible()
  })

  test('member count is displayed', async ({ page }) => {
    await expect(page.getByText(/Members:/)).toBeVisible()
  })
})
