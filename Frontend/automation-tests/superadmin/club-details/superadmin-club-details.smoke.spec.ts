import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { clubDetailsData } from '../../fixtures/mock-data/club-details.data'

test.describe('Teevo R1 > Club Details', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.clubDetails)
  })

  test('page loads with correct document title', async ({ page }) => {
    await expect(page).toHaveTitle(APP_TITLE)
  })

  test('top bar and sidebar are visible', async ({ page }) => {
    await expect(page.getByTestId('app-topbar')).toBeVisible()
    await expect(page.getByTestId('app-sidebar')).toBeVisible()
  })

  test('main content region is visible', async ({ page }) => {
    await expect(page.getByTestId('app-main')).toBeVisible()
  })

  test('page heading matches active view', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Configure Club Details' })).toBeVisible()
  })

  test('page renders within 3 seconds', async ({ page }) => {
    const start = Date.now()
    await gotoHome(page)
    await navigateTo(page, NAV_IDS.clubDetails)
    await page.waitForLoadState('domcontentloaded')
    expect(Date.now() - start).toBeLessThan(3000)
  })
})
