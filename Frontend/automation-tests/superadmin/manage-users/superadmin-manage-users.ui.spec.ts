import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { manageUsersData } from '../../fixtures/mock-data/manage-users.data'

test.describe('Teevo R1 > Manage Users', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.manageUsers)
  })

  test('add user form and user list are visible', async ({ page }) => {
    await expect(page.getByLabel('Full name')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByText(manageUsersData.valid.existingUser)).toBeVisible()
  })
})
