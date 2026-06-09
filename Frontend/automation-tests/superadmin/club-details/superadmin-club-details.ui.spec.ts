import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { clubDetailsData } from '../../fixtures/mock-data/club-details.data'

test.describe('Teevo R1 > Club Details', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.clubDetails)
  })

  test('primary card content is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Configure Club Details' })).toBeVisible()
  })
})
