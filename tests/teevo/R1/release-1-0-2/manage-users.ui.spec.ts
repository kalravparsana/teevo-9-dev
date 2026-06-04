import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Manage Users — UI', () => {
  test('lists Alex Morgan', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.manageUsers)
    await expect(page.getByText('Alex Morgan')).toBeVisible()
  })
})