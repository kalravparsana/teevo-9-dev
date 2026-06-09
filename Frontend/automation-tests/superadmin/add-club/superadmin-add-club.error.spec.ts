import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { addClubData } from '../../fixtures/mock-data/add-club.data'

test.describe('Teevo R1 > Add Club', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.addClub)
  })

  test('page remains usable after validation error', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText(addClubData.valid.requiredError)).toBeVisible()
    await expect(page.getByTestId('app-sidebar')).toBeVisible()
  })

  test('navigating away after error clears view-specific state', async ({ page }) => {
    await navigateTo(page, NAV_IDS.addClub)
    await navigateTo(page, NAV_IDS.addClub)
    await expect(page.getByRole('heading', { level: 1, name: 'Add Club' })).toBeVisible()
  })
})
