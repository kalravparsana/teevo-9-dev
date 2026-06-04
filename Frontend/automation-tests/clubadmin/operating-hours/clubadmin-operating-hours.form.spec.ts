import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { operatingHoursData } from '../../fixtures/mock-data/operating-hours.data'

test.describe('Teevo R1 > Operating Hours', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.operatingHours)
  })

  test('marking day closed disables time inputs', async ({ page }) => {
    const mondayRow = page.getByRole('listitem').filter({ hasText: operatingHoursData.valid.monday })
    await mondayRow.getByLabel(operatingHoursData.valid.closedLabel).check()
    await expect(mondayRow.getByLabel(operatingHoursData.valid.opensLabel)).toBeDisabled()
  })

  test('save hours shows confirmation message', async ({ page }) => {
    await page.getByRole('button', { name: operatingHoursData.valid.saveButton }).click()
    await expect(page.getByText(operatingHoursData.valid.savedMessage)).toBeVisible()
  })

  test('updating open time persists until save', async ({ page }) => {
    const mondayRow = page.getByRole('listitem').filter({ hasText: operatingHoursData.valid.monday })
    await mondayRow.getByLabel(operatingHoursData.valid.opensLabel).fill('05:00')
    await expect(mondayRow.getByLabel(operatingHoursData.valid.opensLabel)).toHaveValue('05:00')
  })
})
