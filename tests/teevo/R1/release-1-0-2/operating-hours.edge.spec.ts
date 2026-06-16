import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Operating Hours — Edge', () => {
  test('multi nav', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome()
    await app.navigate(NAV.addClub)
    await app.navigate(NAV.clubs)
    await expect(app.mainPanel()).toBeVisible()
  })
})