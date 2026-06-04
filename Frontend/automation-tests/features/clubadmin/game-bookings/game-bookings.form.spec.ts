import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { bookingData } from '../../../fixtures/mock-data/booking.data'

test.describe('Game Bookings — Action Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Game Bookings')
  })

  test('Confirm changes pending booking to confirmed', async ({ page }) => {
    const pendingRow = page.locator('li').filter({ hasText: bookingData.valid.pendingPlayer })
    await pendingRow.getByRole('button', { name: 'Confirm' }).click()
    await expect(pendingRow.getByText('confirmed')).toBeVisible()
  })

  test('Decline changes pending booking to cancelled', async ({ page }) => {
    const pendingRow = page.locator('li').filter({ hasText: bookingData.valid.pendingPlayer })
    await pendingRow.getByRole('button', { name: 'Decline' }).click()
    await expect(pendingRow.getByText('cancelled')).toBeVisible()
  })

  test('Cancel on confirmed booking sets cancelled status', async ({ page }) => {
    const confirmedRow = page.locator('li').filter({ hasText: bookingData.valid.confirmedPlayer })
    await confirmedRow.getByRole('button', { name: 'Cancel' }).click()
    await expect(confirmedRow.getByText('cancelled')).toBeVisible()
  })

  test('booking details show date and tee time', async ({ page }) => {
    await expect(page.getByText(/2026-06-05 at 09:20/)).toBeVisible()
    await expect(page.getByText(/2026-06-06 at 14:00/)).toBeVisible()
  })
})
