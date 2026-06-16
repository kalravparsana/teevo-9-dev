import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Club Details — Smoke', () => {
  test('loads', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.clubDetails)
    await expect(app.page).toHaveTitle(/Teevo/i)
    await expect(app.mainPanel()).toBeVisible()
  })
  test('h1 visible', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.clubDetails)
    await expect(app.pageHeading()).toBeVisible()
  })

})