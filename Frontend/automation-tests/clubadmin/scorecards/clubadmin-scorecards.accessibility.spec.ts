import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { scorecardsData } from '../../fixtures/mock-data/scorecards.data'

test.describe('Teevo R1 > Scorecards', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.scorecards)
  })

  test('page has one primary h1 in top bar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  })

  test('sidebar nav buttons are keyboard focusable', async ({ page }) => {
    await page.getByTestId('nav-ca-scorecards').focus()
    await expect(page.getByTestId('nav-ca-scorecards')).toBeFocused()
  })

    })
