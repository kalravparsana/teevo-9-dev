import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { clubData } from '../../../fixtures/mock-data/club.data'

test.describe('Club Details — Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Superadmin', 'Club Details')
  })

  test('selecting a club loads its details', async ({ page }) => {
    await page.getByLabel('Select club').selectOption({ label: 'St Andrews Links' })
    await expect(page.getByLabel('Club name')).toHaveValue('St Andrews Links')
  })

  test('updating club name and saving shows success', async ({ page }) => {
    await page.getByLabel('Club name').fill('Updated Club Name')
    await page.getByRole('button', { name: 'Save Changes' }).click()
    await expect(page.getByText('Club details saved.')).toBeVisible()
  })

  test('changing holes updates select value', async ({ page }) => {
    await page.getByLabel('Holes').selectOption('9')
    await expect(page.getByLabel('Holes')).toHaveValue('9')
  })

  test('location field accepts valid input', async ({ page }) => {
    await page.getByLabel('Location').fill(clubData.valid.location)
    await expect(page.getByLabel('Location')).toHaveValue(clubData.valid.location)
  })

  test('save persists updated name in form', async ({ page }) => {
    const newName = 'Oak Ridge Country Club'
    await page.getByLabel('Club name').fill(newName)
    await page.getByRole('button', { name: 'Save Changes' }).click()
    await expect(page.getByLabel('Club name')).toHaveValue(newName)
  })
})
