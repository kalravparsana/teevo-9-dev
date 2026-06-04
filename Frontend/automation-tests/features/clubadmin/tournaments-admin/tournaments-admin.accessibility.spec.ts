import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Tournament Management — Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tournaments')
  })

  test('page has exactly one h1 heading', async ({ page }) => {
    expect(await page.getByRole('heading', { level: 1 }).count()).toBe(1)
  })

  test('main landmark is present', async ({ page }) => {
    await expect(page.getByRole('main')).toBeVisible()
  })

  test('heading text matches feature title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tournament Management')
  })
  test('form fields have associated labels', async ({ page }) => {
    const inputs = page.locator('main input:not([type="hidden"]), main select, main textarea')
    const count = await inputs.count()
    for (let i = 0; i < count; i++) {
      const id = await inputs.nth(i).getAttribute('id')
      const ariaLabel = await inputs.nth(i).getAttribute('aria-label')
      const hasLabel = id ? (await page.locator(`label[for="${id}"]`).count()) > 0 : false
      expect(hasLabel || ariaLabel).toBeTruthy()
    }
  })

  test('interactive elements in main are keyboard reachable', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
  })
})
