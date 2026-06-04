import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { bookingData } from '../../../fixtures/mock-data/booking.data'

test.describe('Game Bookings — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/bookings', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(bookingData.api.listSuccess ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Game Bookings')
  })

  test('booking list shows player names', async ({ page }) => {
    await expect(page.getByText('Sam Rivera')).toBeVisible()
    await expect(page.getByText('Mia Chen')).toBeVisible()
  })

  test('pending booking shows Confirm and Decline buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Decline' })).toBeVisible()
  })

  test('confirmed booking shows Cancel button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
  })

  test('status badges are visible', async ({ page }) => {
    await expect(page.getByText('confirmed')).toBeVisible()
    await expect(page.getByText('pending')).toBeVisible()
  })
})
