import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { clubDetailsData } from '../../fixtures/mock-data/club-details.data'

test.describe('Teevo R1 > Club Details', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.clubDetails)
  })

  test('save changes updates club name in select', async ({ page }) => {
    await page.getByLabel('Club name').fill(clubDetailsData.valid.updatedName)
    await page.getByRole('button', { name: 'Save Changes' }).click()
    await expect(page.getByText(clubDetailsData.valid.savedMessage)).toBeVisible()
    await expect(page.getByLabel('Select club')).toContainText(clubDetailsData.valid.updatedName)
  })

  test('switching club updates form fields', async ({ page }) => {
    await page.getByLabel('Select club').selectOption({ label: 'St Andrews Links' })
    await expect(page.getByLabel('Club name')).toHaveValue('St Andrews Links')
  })

  test('long club name in edit field is accepted', async ({ page }) => {
    await page.getByLabel('Club name').fill(clubDetailsData.edge.longName)
    await page.getByRole('button', { name: 'Save Changes' }).click()
    await expect(page.getByText(clubDetailsData.valid.savedMessage)).toBeVisible()
  })
})
