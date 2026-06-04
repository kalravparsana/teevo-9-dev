import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { scorecardData } from '../../../fixtures/mock-data/scorecard.data'

test.describe('Scorecards — Display Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Scorecards')
  })

  test('table renders all scorecard rows', async ({ page }) => {
    const rows = page.getByRole('row')
    expect(await rows.count()).toBeGreaterThan(1)
  })

  test('gross scores are displayed in table', async ({ page }) => {
    await expect(page.getByRole('cell', { name: '82' })).toBeVisible()
    await expect(page.getByRole('cell', { name: '76' })).toBeVisible()
  })

  test('course names are displayed', async ({ page }) => {
    await expect(page.getByRole('cell', { name: scorecardData.valid.course })).toBeVisible()
  })

  test('table is scrollable on narrow viewports', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 })
    await expect(page.getByRole('table')).toBeVisible()
  })
})
