import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { teeTimeData } from '../../../fixtures/mock-data/tee-time.data'

test.describe('Tee Time Slots — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/tee-times', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(teeTimeData.api.listSuccess ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tee Time Slots')
  })

  test('First tee time input is visible', async ({ page }) => {
    await expect(page.getByLabel('First tee time')).toBeVisible()
  })

  test('Interval select is visible', async ({ page }) => {
    await expect(page.getByLabel('Interval (minutes)')).toBeVisible()
  })

  test('Generate Slots button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Generate Slots' })).toBeVisible()
  })

  test('Today tee times list shows slots', async ({ page }) => {
    await expect(page.getByText("Today's Tee Times")).toBeVisible()
    await expect(page.getByRole('button', { name: 'Toggle' }).first()).toBeVisible()
  })
})
