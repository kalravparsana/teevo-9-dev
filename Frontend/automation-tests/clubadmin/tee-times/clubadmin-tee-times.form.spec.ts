import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { teeTimesData } from '../../fixtures/mock-data/tee-times.data'

test.describe('Teevo R1 > Tee Time Slots', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.teeTimes)
  })

  test('generate slots replaces tee time list', async ({ page }) => {
    await page.getByLabel('First tee time').fill(teeTimesData.valid.startTime)
    await page.getByLabel('Interval (minutes)').selectOption(teeTimesData.valid.interval)
    await page.getByRole('button', { name: teeTimesData.valid.generateButton }).click()
    await expect(page.getByText('07:00').first()).toBeVisible()
  })

  test('toggle changes availability label', async ({ page }) => {
    const row = page.getByRole('listitem').first()
    const before = await row.getByText(/Available|Booked/).textContent()
    await row.getByRole('button', { name: teeTimesData.valid.toggleButton }).click()
    await expect(row.getByText(before === 'Available' ? 'Booked' : 'Available')).toBeVisible()
  })
})
