import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

const MOBILE_VIEWPORTS = [
  { name: 'iPhone 14', width: 390, height: 844 },
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'Android (360)', width: 360, height: 800 },
  { name: 'iPad', width: 768, height: 1024 },
]

for (const viewport of MOBILE_VIEWPORTS) {
  test.describe(`Club Details — Mobile: ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } })

    test.beforeEach(async ({ page }) => {
      const app = new TeevoAppPage(page)
      await app.goto()
      await app.navigate('Superadmin', 'Club Details')
    })

    test('page renders correctly on mobile viewport', async ({ page }) => {
      await expect(page.getByRole('main')).toBeVisible()
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Configure Club Details')
    })

    test('sidebar remains accessible on mobile', async ({ page }) => {
      await expect(page.locator('aside')).toBeVisible()
    })

    test('primary content is in viewport', async ({ page }) => {
      await expect(page.getByText('Configure Club Details')).toBeInViewport()
    })

    test('primary action buttons meet minimum tap target', async ({ page }) => {
      const buttons = page.getByRole('button').filter({ hasNot: page.locator('aside') })
      const count = await buttons.count()
      for (let i = 0; i < Math.min(count, 3); i++) {
        const box = await buttons.nth(i).boundingBox()
        if (box) expect(box.height).toBeGreaterThanOrEqual(28)
      }
    })
  })
}
