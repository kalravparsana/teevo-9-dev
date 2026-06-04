import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../pages/TeevoAppPage'

test.describe('Teevo App Shell — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
  })

  test('page loads without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    const app = new TeevoAppPage(page)
    await app.goto()
    expect(errors).toHaveLength(0)
  })

  test('page has correct document title', async ({ page }) => {
    await expect(page).toHaveTitle(/Teevo — Golf Club Management/i)
  })

  test('primary heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('sidebar brand is visible', async ({ page }) => {
    await expect(page.getByText('Teevo')).toBeVisible()
    await expect(page.getByText('Golf Club Platform')).toBeVisible()
  })

  test('main panel renders within 3 seconds', async ({ page }) => {
    const start = Date.now()
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByRole('main')).toBeVisible()
    expect(Date.now() - start).toBeLessThan(3000)
  })
})
