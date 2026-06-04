import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Club Details — Form', () => {
  test('save changes shows success', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.clubDetails)
    await page.getByLabel(/Club name/i).fill('Updated Club Name')
    await page.getByRole('button', { name: /Save Changes/i }).click()
    await expect(page.getByText(/saved/i)).toBeVisible()
  })
})