import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { teeTimesData } from '../../fixtures/mock-data/tee-times.data'

test.describe('Teevo R1 > Tee Time Slots', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.teeTimes)
  })

  test('page remains usable after validation error', async ({ page }) => {
    await expect(page.getByTestId('app-main')).toBeVisible()
    await expect(page.getByTestId('app-sidebar')).toBeVisible()
  })

  test('navigating away after error clears view-specific state', async ({ page }) => {
    await navigateTo(page, NAV_IDS.addClub)
    await navigateTo(page, NAV_IDS.teeTimes)
    await expect(page.getByRole('heading', { level: 1, name: 'Tee Time Slots' })).toBeVisible()
  })
})
