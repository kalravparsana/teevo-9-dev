import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Manage Users — Form', () => {
  test('add user appears in list', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.manageUsers)
    await page.getByLabel(/Full name/i).fill(teevoData.valid.userName)
    await page.getByLabel(/Email/i).fill(teevoData.valid.userEmail)
    await page.getByRole('button', { name: /Add User/i }).click()
    await expect(page.getByText(teevoData.valid.userName)).toBeVisible()
  })
})