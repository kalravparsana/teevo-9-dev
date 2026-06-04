import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Game Bookings — Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Game Bookings')
  })

  test('page has exactly one h1 heading', async ({ page }) => {
    expect(await page.getByRole('heading', { level: 1 }).count()).toBe(1)
  })

  test('main landmark is present', async ({ page }) => {
    await expect(page.getByRole('main')).toBeVisible()
  })

  test('heading text matches feature title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Game Bookings')
  })
  test('action buttons are keyboard reachable', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Confirm' })
    if (await btn.isVisible()) {
      await btn.focus()
      await expect(btn).toBeFocused()
    }
  })

  test('interactive elements in main are keyboard reachable', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
  })
})
