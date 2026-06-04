import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Scorecards — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Scorecards')
  })

  test('table handles all rows without layout break', async ({ page }) => {
    const rows = page.locator('tbody tr')
    expect(await rows.count()).toBeGreaterThan(0)
    const box = await page.getByRole('main').boundingBox()
    expect(box?.width).toBeLessThanOrEqual(1280)
  })

  test('rapid navigation away and back preserves feature', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await app.navigate('Club Admin', 'Scorecards')
    await expect(app.mainHeading).toHaveText('Scorecards')
  })

  test('browser back after navigation keeps app stable', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
