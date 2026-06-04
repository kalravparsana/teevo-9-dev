import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { userData } from '../../../fixtures/mock-data/user.data'

test.describe('Manage Users — Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Manage Users')
  })

  test('submit with empty name and email does not add user', async ({ page }) => {
    const countBefore = await page.getByRole('button', { name: 'Remove' }).count()
    await page.getByRole('button', { name: 'Add User' }).click()
    expect(await page.getByRole('button', { name: 'Remove' }).count()).toBe(countBefore)
  })

  test('valid user submission adds to list', async ({ page }) => {
    await page.getByLabel('Full name').fill(userData.valid.name)
    await page.getByLabel('Email').fill(userData.valid.email)
    await page.getByLabel('Phone').fill(userData.valid.phone)
    await page.getByLabel('Handicap count').fill(userData.valid.handicapCount)
    await page.getByRole('button', { name: 'Add User' }).click()
    await expect(page.getByText(userData.valid.name)).toBeVisible()
    await expect(page.getByText(userData.valid.email)).toBeVisible()
  })

  test('invalid handicap over max is rejected', async ({ page }) => {
    await page.getByLabel('Full name').fill(userData.valid.name)
    await page.getByLabel('Email').fill(userData.valid.email)
    await page.getByLabel('Handicap count').fill(userData.invalid.handicapOverMax)
    const countBefore = await page.getByRole('button', { name: 'Remove' }).count()
    await page.getByRole('button', { name: 'Add User' }).click()
    expect(await page.getByRole('button', { name: 'Remove' }).count()).toBe(countBefore)
  })

  test('negative handicap is rejected', async ({ page }) => {
    await page.getByLabel('Full name').fill(userData.valid.name)
    await page.getByLabel('Email').fill(userData.valid.email)
    await page.getByLabel('Handicap count').fill(userData.invalid.handicapNegative)
    const countBefore = await page.getByRole('button', { name: 'Remove' }).count()
    await page.getByRole('button', { name: 'Add User' }).click()
    expect(await page.getByRole('button', { name: 'Remove' }).count()).toBe(countBefore)
  })

  test('club field appears for player role', async ({ page }) => {
    await page.getByLabel('Role').selectOption('player')
    await expect(page.getByLabel('Club')).toBeVisible()
  })

  test('club field hidden for superadmin role', async ({ page }) => {
    await page.getByLabel('Role').selectOption('superadmin')
    await expect(page.getByLabel('Club')).not.toBeVisible()
  })
})
