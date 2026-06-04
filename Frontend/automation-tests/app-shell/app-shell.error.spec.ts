import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../pages/TeevoAppPage'

test.describe('Teevo App Shell — Error & Negative Cases', () => {
  test('settings dropdown closes on outside click', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.openAppSettings()
    await page.getByRole('heading', { level: 1 }).click()
    await expect(page.getByText('Settings', { exact: true })).not.toBeVisible()
  })

  test('malformed API response does not crash app shell', async ({ page }) => {
    await page.route('**/api/**', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await expect(app.mainPanel).toBeVisible()
  })

  test('rapid settings toggle does not break UI', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    const btn = page.getByRole('button', { name: 'App Settings' })
    await btn.click()
    await btn.click()
    await btn.click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
