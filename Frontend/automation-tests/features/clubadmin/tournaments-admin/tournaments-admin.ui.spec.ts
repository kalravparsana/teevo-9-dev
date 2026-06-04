import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { tournamentData } from '../../../fixtures/mock-data/tournament.data'

test.describe('Tournament Management — UI Rendering', () => {
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
    await app.navigate('Club Admin', 'Tournaments')
  })

  test('Create tournament form fields are visible', async ({ page }) => {
    await expect(page.getByLabel('Tournament name')).toBeVisible()
    await expect(page.getByLabel('Date')).toBeVisible()
    await expect(page.getByLabel('Format')).toBeVisible()
    await expect(page.getByLabel('Max players')).toBeVisible()
  })

  test('Create Tournament button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Create Tournament' })).toBeVisible()
  })

  test('Managed Tournaments list shows events', async ({ page }) => {
    await expect(page.getByText('Spring Classic')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancel' }).first()).toBeVisible()
  })
})
