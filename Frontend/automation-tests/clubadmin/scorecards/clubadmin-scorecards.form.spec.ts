import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { scorecardsData } from '../../fixtures/mock-data/scorecards.data'

test.describe('Teevo R1 > Scorecards', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.scorecards)
  })

  test('read-only view has no editable submit controls', async ({ page }) => {
    await expect(page.getByRole('button', { name: /submit|save|create/i })).toHaveCount(0)
  })
})
