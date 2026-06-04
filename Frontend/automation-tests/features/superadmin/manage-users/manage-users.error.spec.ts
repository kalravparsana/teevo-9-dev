import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'

test.describe('Manage Users — Error & Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Manage Users')
  })

  test('malformed API response does not crash feature view', async ({ page }) => {
    await page.route('**/api/users', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Manage Users')
    await expect(app.mainPanel).toBeVisible()
  })
  test('invalid email format prevents submission', async ({ page }) => {
    await page.getByLabel('Full name').fill('Test User')
    await page.getByLabel('Email').fill('not-an-email')
    const countBefore = await page.getByRole('button', { name: 'Remove' }).count()
    await page.getByRole('button', { name: 'Add User' }).click()
    expect(await page.getByRole('button', { name: 'Remove' }).count()).toBe(countBefore)
  })

  test('remove user deletes from list', async ({ page }) => {
    await page.getByLabel('Full name').fill('Temp User')
    await page.getByLabel('Email').fill('temp@example.com')
    await page.getByRole('button', { name: 'Add User' }).click()
    const row = page.locator('li').filter({ hasText: 'Temp User' })
    await row.getByRole('button', { name: 'Remove' }).click()
    await expect(page.getByText('Temp User')).not.toBeVisible()
  })
})
