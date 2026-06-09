import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { manageUsersData } from '../../fixtures/mock-data/manage-users.data'

test.describe('Teevo R1 > Manage Users', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.manageUsers)
  })

  test('empty name and email does not add user', async ({ page }) => {
    const countBefore = await page.getByRole('listitem').count()
    await page.getByRole('button', { name: 'Add User' }).click()
    expect(await page.getByRole('listitem').count()).toBe(countBefore)
  })

  test('valid user is added to the list', async ({ page }) => {
    await page.getByLabel('Full name').fill(manageUsersData.valid.name)
    await page.getByLabel('Email').fill(manageUsersData.valid.email)
    await page.getByLabel('Role').selectOption(manageUsersData.valid.role)
    await page.getByRole('button', { name: 'Add User' }).click()
    await expect(page.getByText(manageUsersData.valid.name)).toBeVisible()
    await expect(page.getByText(manageUsersData.valid.email)).toBeVisible()
  })

  test('invalid email format is rejected by browser validation', async ({ page }) => {
    await page.getByLabel('Email').fill(manageUsersData.invalid.email)
    const validity = await page.getByLabel('Email').evaluate((el: HTMLInputElement) => el.validity.valid)
    expect(validity).toBe(false)
  })

  test('remove user deletes from list', async ({ page }) => {
    await page.getByLabel('Full name').fill('Temp User')
    await page.getByLabel('Email').fill('temp.remove@teevo.app')
    await page.getByRole('button', { name: 'Add User' }).click()
    const row = page.getByRole('listitem').filter({ hasText: 'temp.remove@teevo.app' })
    await row.getByRole('button', { name: 'Remove' }).click()
    await expect(page.getByText('temp.remove@teevo.app')).not.toBeVisible()
  })
})
