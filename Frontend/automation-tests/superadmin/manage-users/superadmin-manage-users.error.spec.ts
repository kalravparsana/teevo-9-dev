import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { manageUsersData } from '../../fixtures/mock-data/manage-users.data'

test.describe('Teevo R1 > Manage Users', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.manageUsers)
  })

  test('page remains usable after validation error', async ({ page }) => {
    await expect(page.getByTestId('app-main')).toBeVisible()
    await expect(page.getByTestId('app-sidebar')).toBeVisible()
  })

  test('navigating away after error clears view-specific state', async ({ page }) => {
    await navigateTo(page, NAV_IDS.addClub)
    await navigateTo(page, NAV_IDS.manageUsers)
    await expect(page.getByRole('heading', { level: 1, name: 'Manage Users' })).toBeVisible()
  })
})
