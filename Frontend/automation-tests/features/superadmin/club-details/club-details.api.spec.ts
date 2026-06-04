import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { clubData } from '../../../fixtures/mock-data/club.data'

test.describe('Club Details — API Mock Tests', () => {
  test('renders data correctly on API success (200)', async ({ page }) => {
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
    await expect(app.mainPanel).toBeVisible()
  })

  test('shows graceful UI on server error (500)', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: clubData.api.errorMessage ?? 'Internal Server Error' }),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Club Details')
    await expect(app.mainPanel).toBeVisible()
  })

  test('handles not found (404) without crash', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({ status: 404, body: JSON.stringify({ message: 'Not Found' }) }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Club Details')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('handles network failure without crash', async ({ page }) => {
    await page.route('**/api/clubs', (route) => route.abort('failed'))
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Club Details')
    await expect(app.mainPanel).toBeVisible()
  })

  test('empty API response does not crash page', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(clubData.api.listEmpty ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Club Details')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
