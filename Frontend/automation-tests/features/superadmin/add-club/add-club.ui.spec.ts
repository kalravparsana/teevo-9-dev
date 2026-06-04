import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { clubData } from '../../../fixtures/mock-data/club.data'

test.describe('Add Club — UI Rendering', () => {
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
  })

  test('Club name input is visible', async ({ page }) => {
    await expect(page.getByLabel('Club name')).toBeVisible()
  })

  test('Location input is visible', async ({ page }) => {
    await expect(page.getByLabel('Location')).toBeVisible()
  })

  test('Number of holes select is visible', async ({ page }) => {
    await expect(page.getByLabel('Number of holes')).toBeVisible()
  })

  test('Add Club button is visible and enabled', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Add Club' })
    await expect(btn).toBeVisible()
    await expect(btn).toBeEnabled()
  })
})
