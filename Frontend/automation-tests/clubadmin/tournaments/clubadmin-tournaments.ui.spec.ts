import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { tournamentsAdminData } from '../../fixtures/mock-data/tournaments-admin.data'

test.describe('Teevo R1 > Tournament Management', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.tournamentsAdmin)
  })

  test('primary card content is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Tournament Management' })).toBeVisible()
  })
})
