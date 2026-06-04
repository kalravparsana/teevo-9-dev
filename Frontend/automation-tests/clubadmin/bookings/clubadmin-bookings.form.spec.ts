import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { bookingsData } from '../../fixtures/mock-data/bookings.data'

test.describe('Teevo R1 > Game Bookings', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.bookings)
  })

  test('confirm pending booking updates status', async ({ page }) => {
    const row = page.getByRole('listitem').filter({ hasText: bookingsData.valid.pendingPlayer })
    await row.getByRole('button', { name: bookingsData.valid.confirmButton }).click()
    await expect(row.getByText(bookingsData.valid.statusConfirmed)).toBeVisible()
  })

  test('decline pending booking marks cancelled', async ({ page }) => {
    await page.getByRole('button', { name: bookingsData.valid.confirmButton }).click()
    const row = page.getByRole('listitem').filter({ hasText: bookingsData.valid.pendingPlayer })
    await row.getByRole('button', { name: bookingsData.valid.declineButton }).click()
    await expect(row.getByText(bookingsData.valid.statusCancelled)).toBeVisible()
  })
})
