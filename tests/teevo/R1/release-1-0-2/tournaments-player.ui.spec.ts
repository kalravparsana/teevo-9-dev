import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Player Tournaments — UI', () => {
  test('lists tournaments', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.tournamentsPlayer)
    await expect(page.getByText(/Spring Classic/i)).toBeVisible()
  })
  test('book spot', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.tournamentsPlayer)
    await page.getByRole('button', { name: /Book Spot/i }).first().click()
    await expect(page.getByText(/Registered for/i)).toBeVisible()
  })
})