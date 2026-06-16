import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Tournament Admin — Form', () => {
  test('create tournament', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.tournamentsAdmin)
    await page.getByLabel(/Tournament name/i).fill(teevoData.valid.tournamentName)
    await page.getByLabel(/^Date$/i).fill(teevoData.valid.tournamentDate)
    await page.getByRole('button', { name: /Create Tournament/i }).click()
    await expect(page.getByText(teevoData.valid.tournamentName)).toBeVisible()
  })
})