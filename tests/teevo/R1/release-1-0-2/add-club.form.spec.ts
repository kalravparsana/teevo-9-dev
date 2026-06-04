import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Add Club — Form', () => {
  test('empty submit shows required', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.addClub)
    await page.getByRole('button', { name: /Add Club/i }).click()
    await expect(page.getByTestId('add-club-message')).toContainText(/required/i)
  })
  test('valid submit succeeds', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.addClub)
    await page.getByLabel(/Club name/i).fill(teevoData.valid.clubName)
    await page.getByLabel(/Location/i).fill(teevoData.valid.clubLocation)
    await page.getByRole('button', { name: /Add Club/i }).click()
    await expect(page.getByTestId('add-club-message')).toContainText(/success/i)
  })
})