import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { clubData } from '../../../fixtures/mock-data/club.data'

test.describe('Add Club — Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
  })

  test('submit empty form shows required field error', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText('Club name and location are required.')).toBeVisible()
  })

  test('club name: whitespace-only shows required error', async ({ page }) => {
    await page.getByLabel('Club name').fill(clubData.invalid.whitespaceName)
    await page.getByLabel('Location').fill(clubData.valid.location)
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText('Club name and location are required.')).toBeVisible()
  })

  test('valid form submission shows success message', async ({ page }) => {
    await page.getByLabel('Club name').fill(clubData.valid.name)
    await page.getByLabel('Location').fill(clubData.valid.location)
    await page.getByLabel('Number of holes').selectOption(clubData.valid.holes)
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText('Club added successfully.')).toBeVisible()
  })

  test('form clears after successful submission', async ({ page }) => {
    await page.getByLabel('Club name').fill(clubData.valid.name)
    await page.getByLabel('Location').fill(clubData.valid.location)
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByLabel('Club name')).toHaveValue('')
    await expect(page.getByLabel('Location')).toHaveValue('')
  })

  test('long club name does not crash form', async ({ page }) => {
    await page.getByLabel('Club name').fill(clubData.edge.longName)
    await expect(page.getByLabel('Club name')).toBeVisible()
  })

  test('special characters in notes are handled', async ({ page }) => {
    await page.getByLabel('Notes (optional)').fill(clubData.edge.specialChars)
    await page.getByLabel('Club name').fill(clubData.valid.name)
    await page.getByLabel('Location').fill(clubData.valid.location)
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText('Club added successfully.')).toBeVisible()
  })
})
