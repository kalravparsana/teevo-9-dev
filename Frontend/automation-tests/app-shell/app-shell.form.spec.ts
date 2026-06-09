import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../utils/navigation'
import { appShellData } from '../fixtures/mock-data/app-shell.data'

test.describe('Teevo R1 > App Shell', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('display name updates avatar initials', async ({ page }) => {
    await openAppSettings(page)
    await page.getByLabel('Display name').fill('Jamie Fox')
    await expect(page.getByText('JF')).toBeVisible()
  })

  test('close button dismisses settings panel', async ({ page }) => {
    await openAppSettings(page)
    await page.getByRole('button', { name: 'Close' }).click()
    await expect(page.getByTestId('app-settings-panel')).not.toBeVisible()
  })

  test('notifications checkbox toggles state', async ({ page }) => {
    const checkbox = page.getByLabel('Notifications')
    const wasChecked = await checkbox.isChecked()
    await checkbox.click()
    await expect(checkbox).toBeChecked({ checked: !wasChecked })
  })
})
