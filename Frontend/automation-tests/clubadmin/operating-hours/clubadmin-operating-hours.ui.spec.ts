import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { operatingHoursData } from '../../fixtures/mock-data/operating-hours.data'

test.describe('Teevo R1 > Operating Hours', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.operatingHours)
  })

  test('primary card content is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Operating Hours' })).toBeVisible()
  })
})
