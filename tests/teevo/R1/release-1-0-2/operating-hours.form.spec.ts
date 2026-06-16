import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Operating Hours — Form', () => {
  test('save hours shows confirmation', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.operatingHours)
    await page.getByRole('button', { name: /Save Hours/i }).click()
    await expect(page.getByText(/updated/i)).toBeVisible()
  })
})