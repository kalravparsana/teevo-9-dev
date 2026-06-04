import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Scorecards — Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Scorecards')
  })

  test('page has exactly one h1 heading', async ({ page }) => {
    expect(await page.getByRole('heading', { level: 1 }).count()).toBe(1)
  })

  test('main landmark is present', async ({ page }) => {
    await expect(page.getByRole('main')).toBeVisible()
  })

  test('heading text matches feature title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Scorecards')
  })
  test('table has column headers', async ({ page }) => {
    expect(await page.getByRole('columnheader').count()).toBeGreaterThan(0)
  })

  test('interactive elements in main are keyboard reachable', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
  })
})
