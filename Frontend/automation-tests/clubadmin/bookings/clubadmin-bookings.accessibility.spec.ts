import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { bookingsData } from '../../fixtures/mock-data/bookings.data'

test.describe('Teevo R1 > Game Bookings', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.bookings)
  })

  test('page has one primary h1 in top bar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  })

  test('sidebar nav buttons are keyboard focusable', async ({ page }) => {
    await page.getByTestId('nav-ca-bookings').focus()
    await expect(page.getByTestId('nav-ca-bookings')).toBeFocused()
  })

    })
