import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../pages/TeevoAppPage'
import { clubData } from '../fixtures/mock-data/club.data'

test.describe('Teevo App Shell — API Mock Tests', () => {
  test('future clubs API success mock renders list when wired', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(clubData.api.listSuccess),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await expect(app.mainPanel).toBeVisible()
  })

  test('future clubs API 500 does not crash shell', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({ status: 500, body: JSON.stringify({ message: clubData.api.errorMessage }) }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await expect(app.sidebar).toBeVisible()
  })

  test('future clubs API network failure does not crash shell', async ({ page }) => {
    await page.route('**/api/clubs', (route) => route.abort('failed'))
    const app = new TeevoAppPage(page)
    await app.goto()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('future health check 404 handled gracefully', async ({ page }) => {
    await page.route('**/api/health', (route) =>
      route.fulfill({ status: 404, body: JSON.stringify({ message: 'Not Found' }) }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await expect(app.mainPanel).toBeVisible()
  })
})
