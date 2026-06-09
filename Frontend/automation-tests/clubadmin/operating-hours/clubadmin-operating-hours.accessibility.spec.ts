import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { operatingHoursData } from '../../fixtures/mock-data/operating-hours.data'

test.describe('Teevo R1 > Operating Hours', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.operatingHours)
  })

  test('page has one primary h1 in top bar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  })

  test('sidebar nav buttons are keyboard focusable', async ({ page }) => {
    await page.getByTestId('nav-ca-hours').focus()
    await expect(page.getByTestId('nav-ca-hours')).toBeFocused()
  })

    })
