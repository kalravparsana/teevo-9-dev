import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > App Shell — UI', () => {
  test('role sections visible', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome()
    await expect(page.getByText('Superadmin')).toBeVisible()
    await expect(page.getByText('Club Admin')).toBeVisible()
  })
  test('settings dropdown opens', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome()
    await page.getByRole('button', { name: /App Settings/i }).click()
    await expect(page.getByTestId('settings-dropdown')).toBeVisible()
  })
})