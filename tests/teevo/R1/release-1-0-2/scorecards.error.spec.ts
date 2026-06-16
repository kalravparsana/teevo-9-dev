import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Scorecards — Error', () => {
  test('bad json', async ({ page }) => {
    await page.route('**/api/v1/**', r => r.fulfill({ status: 200, body: 'x{{' }))
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.scorecards)
    await expect(app.sidebar()).toBeVisible()
  })
})