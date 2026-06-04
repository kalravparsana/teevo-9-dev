import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Upcoming Tournaments — Book Spot Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Tournaments')
  })

  test('Book Spot registers for tournament', async ({ page }) => {
    const row = page.locator('li').filter({ hasText: 'Spring Classic' })
    await row.getByRole('button', { name: 'Book Spot' }).click()
    await expect(page.getByText(/Registered for Spring Classic!/)).toBeVisible()
    await expect(row.getByRole('button', { name: 'Booked' })).toBeVisible()
  })

  test('Booked button is disabled after registration', async ({ page }) => {
    const row = page.locator('li').filter({ hasText: 'Member Scramble' })
    await row.getByRole('button', { name: 'Book Spot' }).click()
    await expect(row.getByRole('button', { name: 'Booked' })).toBeDisabled()
  })

  test('tournament details show date and format', async ({ page }) => {
    await expect(page.getByText(/2026-04-12 · Stroke Play/)).toBeVisible()
  })

  test('booking message clears after timeout', async ({ page }) => {
    const row = page.locator('li').filter({ hasText: 'Club Championship' })
    await row.getByRole('button', { name: 'Book Spot' }).click()
    await expect(page.getByText(/Registered for Club Championship!/)).toBeVisible()
    await expect(page.getByText(/Registered for Club Championship!/)).not.toBeVisible({ timeout: 5000 })
  })
})
