import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../pages/TeevoAppPage'

const MOBILE_VIEWPORTS = [
  { name: 'iPhone 14', width: 390, height: 844 },
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'Android (360)', width: 360, height: 800 },
  { name: 'iPad', width: 768, height: 1024 },
]

for (const viewport of MOBILE_VIEWPORTS) {
  test.describe(`Teevo App Shell — Mobile: ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } })

    test.beforeEach(async ({ page }) => {
      const app = new TeevoAppPage(page)
      await app.goto()
    })

    test('page renders correctly on mobile viewport', async ({ page }) => {
      await expect(page.getByRole('main')).toBeVisible()
    })

    test('sidebar is visible on mobile', async ({ page }) => {
      await expect(page.locator('aside')).toBeVisible()
    })

    test('App Settings opens on mobile', async ({ page }) => {
      await page.getByRole('button', { name: 'App Settings' }).click()
      await expect(page.getByLabel('Display name')).toBeVisible()
    })

    test('primary action buttons meet minimum tap target', async ({ page }) => {
      const buttons = page.getByRole('button')
      const count = await buttons.count()
      for (let i = 0; i < Math.min(count, 5); i++) {
        const box = await buttons.nth(i).boundingBox()
        if (box) expect(box.height).toBeGreaterThanOrEqual(28)
      }
    })
  })
}
