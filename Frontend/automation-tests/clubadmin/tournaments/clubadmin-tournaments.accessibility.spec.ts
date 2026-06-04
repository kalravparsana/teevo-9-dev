import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { tournamentsAdminData } from '../../fixtures/mock-data/tournaments-admin.data'

test.describe('Teevo R1 > Tournament Management', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.tournamentsAdmin)
  })

  test('page has one primary h1 in top bar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  })

  test('sidebar nav buttons are keyboard focusable', async ({ page }) => {
    await page.getByTestId('nav-ca-tournaments').focus()
    await expect(page.getByTestId('nav-ca-tournaments')).toBeFocused()
  })

    })
