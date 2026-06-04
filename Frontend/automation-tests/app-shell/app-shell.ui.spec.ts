import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../pages/TeevoAppPage'
import { appShellData } from '../fixtures/mock-data/app-shell.data'

test.describe('Teevo App Shell — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
  })

  test('sidebar navigation sections are visible', async ({ page }) => {
    await expect(page.getByText('Superadmin')).toBeVisible()
    await expect(page.getByText('Club Admin')).toBeVisible()
    await expect(page.getByText('Player')).toBeVisible()
  })

  test('notifications toggle is visible and enabled', async ({ page }) => {
    const toggle = page.getByLabel(appShellData.valid.notificationsLabel)
    await expect(toggle).toBeVisible()
    await expect(toggle).toBeEnabled()
  })

  test('App Settings button opens dropdown', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.openAppSettings()
    await expect(page.getByText('Settings', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Display name')).toBeVisible()
  })

  test('navigating to Manage Users updates page title', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Manage Users')
    await expect(app.mainHeading).toHaveText('Manage Users')
  })

  test('navigating to Browse Clubs updates page title', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Player', 'Browse Clubs')
    await expect(app.mainHeading).toHaveText('Browse Clubs')
  })

  test('active nav item is highlighted', async ({ page }) => {
    const addClubBtn = page.getByRole('button', { name: 'Add Club', exact: true })
    await expect(addClubBtn).toHaveClass(/bg-green-700/)
  })
})
