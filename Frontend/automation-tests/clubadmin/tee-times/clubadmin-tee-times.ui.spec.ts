import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { teeTimesData } from '../../fixtures/mock-data/tee-times.data'

test.describe('Teevo R1 > Tee Time Slots', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.teeTimes)
  })

  test('primary card content is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Tee Time Slots' })).toBeVisible()
  })
})
