import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Add Club — API', () => {
  test('clubs API mock', async ({ page }) => {
    await page.route('**/api/v1/clubs', r => r.fulfill({ status: 200, body: JSON.stringify(teevoData.api.clubs) }))
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.addClub)
    await expect(page.getByTestId('add-club-form')).toBeVisible()
  })
})