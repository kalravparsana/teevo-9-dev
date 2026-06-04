import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../pages/TeevoAppPage'
import { appShellData } from '../fixtures/mock-data/app-shell.data'

test.describe('Teevo App Shell — Settings Form', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.openAppSettings()
  })

  test('display name field accepts valid input', async ({ page }) => {
    const input = page.getByLabel('Display name')
    await input.fill(appShellData.valid.displayName)
    await expect(input).toHaveValue(appShellData.valid.displayName)
  })

  test('display name updates avatar initials', async ({ page }) => {
    await page.getByLabel('Display name').fill('Taylor Brooks')
    await expect(page.getByText('TB')).toBeVisible()
  })

  test('compact sidebar checkbox toggles', async ({ page }) => {
    const checkbox = page.getByLabel('Compact sidebar')
    await expect(checkbox).not.toBeChecked()
    await checkbox.check()
    await expect(checkbox).toBeChecked()
  })

  test('Close button dismisses settings panel', async ({ page }) => {
    await page.getByRole('button', { name: 'Close' }).click()
    await expect(page.getByText('Settings', { exact: true })).not.toBeVisible()
  })

  test('long display name does not crash settings panel', async ({ page }) => {
    await page.getByLabel('Display name').fill(appShellData.edge.longDisplayName)
    await expect(page.getByLabel('Display name')).toBeVisible()
  })
})
