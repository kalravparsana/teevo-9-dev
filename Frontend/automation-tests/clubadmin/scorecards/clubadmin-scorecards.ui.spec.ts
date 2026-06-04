import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { scorecardsData } from '../../fixtures/mock-data/scorecards.data'

test.describe('Teevo R1 > Scorecards', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.scorecards)
  })

  test('scorecards table headers are visible', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: scorecardsData.valid.playerHeader })).toBeVisible()
    await expect(page.getByText(scorecardsData.valid.samplePlayer)).toBeVisible()
  })
})
