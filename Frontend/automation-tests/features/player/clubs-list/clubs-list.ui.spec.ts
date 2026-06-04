import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { clubData } from '../../../fixtures/mock-data/club.data'

test.describe('Browse Clubs — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(clubData.api.listSuccess ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Browse Clubs')
  })

  test('search input is visible', async ({ page }) => {
    await expect(page.getByPlaceholder('Search clubs...')).toBeVisible()
  })

  test('club list shows clubs from mock data', async ({ page }) => {
    await expect(page.getByText('Pine Valley Golf Club')).toBeVisible()
    await expect(page.getByText('St Andrews Links')).toBeVisible()
  })

  test('Join Club buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Join Club' }).first()).toBeVisible()
  })

  test('search filters clubs by name', async ({ page }) => {
    await page.getByPlaceholder('Search clubs...').fill('Pine')
    await expect(page.getByText('Pine Valley Golf Club')).toBeVisible()
    await expect(page.getByText('Augusta National')).not.toBeVisible()
  })
})
