import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { operatingHoursData } from '../../../fixtures/mock-data/operating-hours.data'

test.describe('Operating Hours — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/operating-hours', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(operatingHoursData.api.listSuccess ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Operating Hours')
  })

  test('Monday row is visible with time fields', async ({ page }) => {
    await expect(page.getByText('Monday', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Opens').first()).toBeVisible()
    await expect(page.getByLabel('Closes').first()).toBeVisible()
  })

  test('Closed checkbox is visible for each day', async ({ page }) => {
    await expect(page.getByLabel('Closed').first()).toBeVisible()
  })

  test('Save Hours button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Save Hours' })).toBeVisible()
  })
})
