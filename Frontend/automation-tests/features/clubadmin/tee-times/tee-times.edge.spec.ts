import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Tee Time Slots — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tee Time Slots')
  })

  test('generating slots multiple times does not crash', async ({ page }) => {
    await page.getByRole('button', { name: 'Generate Slots' }).click()
    await page.getByRole('button', { name: 'Generate Slots' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('rapid navigation away and back preserves feature', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await app.navigate('Club Admin', 'Tee Time Slots')
    await expect(app.mainHeading).toHaveText('Tee Time Slots')
  })

  test('browser back after navigation keeps app stable', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
