import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../utils/navigation'
import { appShellData } from '../fixtures/mock-data/app-shell.data'

test.describe('Teevo R1 > App Shell', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('notifications toggle is visible', async ({ page }) => {
    await expect(page.getByLabel('Notifications')).toBeVisible()
  })

  test('app settings dropdown opens', async ({ page }) => {
    await openAppSettings(page)
    await expect(page.getByTestId('app-settings-panel')).toBeVisible()
    await expect(page.getByText('Display name')).toBeVisible()
  })

  test('sidebar shows all role sections', async ({ page }) => {
    await expect(page.getByText('Superadmin')).toBeVisible()
    await expect(page.getByText('Club Admin')).toBeVisible()
    await expect(page.getByText('Player')).toBeVisible()
  })
})
