import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { userData } from '../../../fixtures/mock-data/user.data'

test.describe('Manage Users — UI Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/users', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(userData.api.listSuccess ?? []),
      }),
    )
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Manage Users')
  })

  test('Add User form fields are visible', async ({ page }) => {
    await expect(page.getByLabel('Full name')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Phone')).toBeVisible()
    await expect(page.getByLabel('Handicap count')).toBeVisible()
    await expect(page.getByLabel('Role')).toBeVisible()
  })

  test('Add User button is visible and enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Add User' })).toBeEnabled()
  })

  test('All Users list shows existing users', async ({ page }) => {
    await expect(page.getByText('Alex Morgan')).toBeVisible()
    await expect(page.getByText('All Users')).toBeVisible()
  })

  test('Remove button is visible for each user', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible()
  })
})
