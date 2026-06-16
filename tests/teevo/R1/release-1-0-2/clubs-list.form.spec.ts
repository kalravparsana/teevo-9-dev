import { test, expect } from '@playwright/test'
import { teevoData } from '../../../../fixtures/mock-data/teevo.data'
import { NAV, TeevoAppPage } from '../../../../pages/TeevoAppPage'
test.describe('Teevo R1 > Browse Clubs — Form', () => {
  test('search filters', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.clubs)
    await page.getByTestId('club-search').fill(teevoData.valid.searchClub)
    await expect(page.getByText(/Pine Valley/i)).toBeVisible()
  })
  test('empty search state', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.gotoHome(); await app.navigate(NAV.clubs)
    await page.getByTestId('club-search').fill('zzznomatchxyz')
    await expect(page.getByTestId('clubs-empty-state')).toBeVisible()
  })
})