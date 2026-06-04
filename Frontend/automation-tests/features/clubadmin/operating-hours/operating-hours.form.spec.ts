import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { operatingHoursData } from '../../../fixtures/mock-data/operating-hours.data'

test.describe('Operating Hours — Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Operating Hours')
  })

  test('Monday open time can be updated', async ({ page }) => {
    const mondayRow = page.locator('li').filter({ hasText: 'Monday' })
    await mondayRow.getByLabel('Opens').fill(operatingHoursData.valid.mondayOpen)
    await expect(mondayRow.getByLabel('Opens')).toHaveValue(operatingHoursData.valid.mondayOpen)
  })

  test('Closed checkbox disables time fields', async ({ page }) => {
    const mondayRow = page.locator('li').filter({ hasText: 'Monday' })
    await mondayRow.getByLabel('Closed').check()
    await expect(mondayRow.getByLabel('Opens')).toBeDisabled()
    await expect(mondayRow.getByLabel('Closes')).toBeDisabled()
  })

  test('Save Hours shows success message', async ({ page }) => {
    await page.getByRole('button', { name: 'Save Hours' }).click()
    await expect(page.getByText('Operating hours updated.')).toBeVisible()
  })

  test('updating close time persists in field', async ({ page }) => {
    const sundayRow = page.locator('li').filter({ hasText: 'Sunday' })
    await sundayRow.getByLabel('Closes').fill(operatingHoursData.valid.sundayClose)
    await expect(sundayRow.getByLabel('Closes')).toHaveValue(operatingHoursData.valid.sundayClose)
  })
})
