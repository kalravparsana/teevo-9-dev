import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { addClubData } from '../../fixtures/mock-data/add-club.data'

test.describe('Teevo R1 > Add Club', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.addClub)
  })

  test('page has one primary h1 in top bar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  })

  test('sidebar nav buttons are keyboard focusable', async ({ page }) => {
    await page.getByTestId('nav-sa-add-club').focus()
    await expect(page.getByTestId('nav-sa-add-club')).toBeFocused()
  })

  test('form controls have associated labels', async ({ page }) => {
    const inputs = page.locator('input:not([type="hidden"]), select, textarea')
    const count = await inputs.count()
    for (let i = 0; i < count; i++) {
      const id = await inputs.nth(i).getAttribute('id')
      const ariaLabel = await inputs.nth(i).getAttribute('aria-label')
      const hasLabel = id ? (await page.locator(`label[for="${id}"]`).count()) > 0 : false
      expect(hasLabel || ariaLabel).toBeTruthy()
    }
  })
  })
