import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Tee Time Slots — UI', () => {
  test('generate slots', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.teeTimes)
    await page.getByRole('button', { name: /Generate Slots/i }).click()
    await expect(page.getByText(/07:00|07:10/i).first()).toBeVisible()
  })
})