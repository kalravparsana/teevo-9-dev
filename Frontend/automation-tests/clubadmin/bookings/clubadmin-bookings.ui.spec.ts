import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { bookingsData } from '../../fixtures/mock-data/bookings.data'

test.describe('Teevo R1 > Game Bookings', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.bookings)
  })

  test('booking list shows pending actions', async ({ page }) => {
    await expect(page.getByText(bookingsData.valid.pendingPlayer)).toBeVisible()
    await expect(page.getByRole('button', { name: bookingsData.valid.confirmButton })).toBeVisible()
  })
})
