import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { manageUsersData } from '../../fixtures/mock-data/manage-users.data'

test.describe('Teevo R1 > Manage Users — Mobile: iPhone 14', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('main content visible on iPhone 14', async ({ page }) => {
    await gotoView(page, NAV_IDS.manageUsers)
    await expect(page.getByTestId('app-main')).toBeVisible()
    await expect(page.getByTestId('app-sidebar')).toBeVisible()
  })
})

test.describe('Teevo R1 > Manage Users — Mobile: iPhone SE', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('main content visible on iPhone SE', async ({ page }) => {
    await gotoView(page, NAV_IDS.manageUsers)
    await expect(page.getByTestId('app-main')).toBeVisible()
    await expect(page.getByTestId('app-sidebar')).toBeVisible()
  })
})

test.describe('Teevo R1 > Manage Users — Mobile: Android 360', () => {
  test.use({ viewport: { width: 360, height: 800 } })

  test('main content visible on Android 360', async ({ page }) => {
    await gotoView(page, NAV_IDS.manageUsers)
    await expect(page.getByTestId('app-main')).toBeVisible()
    await expect(page.getByTestId('app-sidebar')).toBeVisible()
  })
})

test.describe('Teevo R1 > Manage Users — Mobile: iPad', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test('main content visible on iPad', async ({ page }) => {
    await gotoView(page, NAV_IDS.manageUsers)
    await expect(page.getByTestId('app-main')).toBeVisible()
    await expect(page.getByTestId('app-sidebar')).toBeVisible()
  })
})

