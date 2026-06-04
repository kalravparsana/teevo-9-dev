import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { tournamentData } from '../../../fixtures/mock-data/tournament.data'

test.describe('Upcoming Tournaments — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/tournaments', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(tournamentData.api.listSuccess ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Tournaments')
  })

  test('tournament list shows upcoming events', async ({ page }) => {
    await expect(page.getByText('Spring Classic')).toBeVisible()
    await expect(page.getByText('Member Scramble')).toBeVisible()
  })

  test('Book Spot buttons are visible for open tournaments', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Book Spot' }).first()).toBeVisible()
  })

  test('spots left count is displayed', async ({ page }) => {
    await expect(page.getByText(/spots left/i).first()).toBeVisible()
  })
})
