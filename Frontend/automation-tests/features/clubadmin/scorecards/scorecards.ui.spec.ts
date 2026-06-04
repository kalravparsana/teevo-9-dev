import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { scorecardData } from '../../../fixtures/mock-data/scorecard.data'

test.describe('Scorecards — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/scorecards', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(scorecardData.api.listSuccess ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Scorecards')
  })

  test('scorecards table headers are visible', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Player' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Course' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Gross' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Net' })).toBeVisible()
  })

  test('scorecard rows render player data', async ({ page }) => {
    await expect(page.getByText('Sam Rivera')).toBeVisible()
    await expect(page.getByText('Chris Park')).toBeVisible()
  })

  test('net scores are displayed', async ({ page }) => {
    await expect(page.getByText('74')).toBeVisible()
    await expect(page.getByText('70')).toBeVisible()
  })
})
