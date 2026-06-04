import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Game Bookings — UI', () => {
  test('confirm pending', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.bookings)
    await page.getByRole('button', { name: /Confirm/i }).first().click()
    await expect(page.getByText('confirmed').first()).toBeVisible()
  })
})