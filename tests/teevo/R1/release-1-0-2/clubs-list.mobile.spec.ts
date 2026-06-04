import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Browse Clubs — Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } })
  test('mobile render', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.clubs)
    await expect(app.sidebar()).toBeVisible()
  })
})