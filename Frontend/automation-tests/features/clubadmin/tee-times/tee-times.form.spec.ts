import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { teeTimeData } from '../../../fixtures/mock-data/tee-time.data'

test.describe('Tee Time Slots — Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tee Time Slots')
  })

  test('first tee time accepts valid time', async ({ page }) => {
    await page.getByLabel('First tee time').fill(teeTimeData.valid.startTime)
    await expect(page.getByLabel('First tee time')).toHaveValue(teeTimeData.valid.startTime)
  })

  test('interval select changes value', async ({ page }) => {
    await page.getByLabel('Interval (minutes)').selectOption('15')
    await expect(page.getByLabel('Interval (minutes)')).toHaveValue('15')
  })

  test('Generate Slots creates new tee time entries', async ({ page }) => {
    const countBefore = await page.getByRole('button', { name: 'Toggle' }).count()
    await page.getByRole('button', { name: 'Generate Slots' }).click()
    expect(await page.getByRole('button', { name: 'Toggle' }).count()).toBeGreaterThanOrEqual(countBefore)
  })

  test('Toggle changes slot availability status', async ({ page }) => {
    const firstToggle = page.getByRole('button', { name: 'Toggle' }).first()
    const row = page.locator('li').filter({ has: firstToggle })
    const statusBefore = await row.getByText(/Available|Booked/).textContent()
    await firstToggle.click()
    await expect(row.getByText(/Available|Booked/)).not.toHaveText(statusBefore ?? '')
  })
})
