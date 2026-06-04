import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../utils/navigation'
import { appShellData } from '../fixtures/mock-data/app-shell.data'

test.describe('Teevo R1 > App Shell', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('page has one primary h1 in top bar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  })

  test('sidebar nav buttons are keyboard focusable', async ({ page }) => {
    await page.getByTestId('nav-sa-add-club').focus()
    await expect(page.getByTestId('nav-sa-add-club')).toBeFocused()
  })

    test('settings dialog has aria-label', async ({ page }) => {
    await openAppSettings(page)
    await expect(page.getByRole('dialog', { name: 'App settings' })).toBeVisible()
  })
})
