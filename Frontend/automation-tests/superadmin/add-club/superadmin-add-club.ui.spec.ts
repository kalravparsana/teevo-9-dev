import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { addClubData } from '../../fixtures/mock-data/add-club.data'

test.describe('Teevo R1 > Add Club', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.addClub)
  })

  test('add club form fields are visible', async ({ page }) => {
    await expect(page.getByTestId('add-club-form')).toBeVisible()
    await expect(page.getByLabel('Club name')).toBeVisible()
    await expect(page.getByLabel('Location')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add Club' })).toBeEnabled()
  })
})
