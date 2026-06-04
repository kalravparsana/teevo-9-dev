import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Tournament Management — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tournaments')
  })


  test('rapid navigation away and back preserves feature', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await app.navigate('Club Admin', 'Tournaments')
    await expect(app.mainHeading).toHaveText('Tournament Management')
  })

  test('browser back after navigation keeps app stable', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
