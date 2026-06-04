import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../pages/TeevoAppPage'

test.describe('Teevo App Shell — Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
  })

  test('page has exactly one h1 heading', async ({ page }) => {
    expect(await page.getByRole('heading', { level: 1 }).count()).toBe(1)
  })

  test('sidebar nav buttons are keyboard reachable', async ({ page }) => {
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })

  test('notifications checkbox has associated label', async ({ page }) => {
    await expect(page.getByLabel('Notifications')).toBeVisible()
  })

  test('App Settings button has aria-expanded', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'App Settings' })
    await expect(btn).toHaveAttribute('aria-expanded', 'false')
    await btn.click()
    await expect(btn).toHaveAttribute('aria-expanded', 'true')
  })

  test('settings display name has label', async ({ page }) => {
    await page.getByRole('button', { name: 'App Settings' }).click()
    await expect(page.getByLabel('Display name')).toBeVisible()
  })

  test('pressing Escape closes settings when focused inside', async ({ page }) => {
    await page.getByRole('button', { name: 'App Settings' }).click()
    await page.getByLabel('Display name').focus()
    await page.keyboard.press('Escape')
    await expect(page.getByText('Settings', { exact: true })).not.toBeVisible()
  })
})
