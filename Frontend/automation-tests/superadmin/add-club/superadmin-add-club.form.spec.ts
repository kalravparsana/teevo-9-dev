import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { addClubData } from '../../fixtures/mock-data/add-club.data'

test.describe('Teevo R1 > Add Club', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.addClub)
  })

  test('submit empty form shows required message', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText(addClubData.valid.requiredError)).toBeVisible()
  })

  test('valid form submission shows success message', async ({ page }) => {
    await page.getByLabel('Club name').fill(addClubData.valid.name)
    await page.getByLabel('Location').fill(addClubData.valid.location)
    await page.getByLabel('Number of holes').selectOption(addClubData.valid.holes)
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText(addClubData.valid.successMessage)).toBeVisible()
  })

  test('whitespace-only name and location shows required error', async ({ page }) => {
    await page.getByLabel('Club name').fill(addClubData.edge.whitespaceOnly)
    await page.getByLabel('Location').fill(addClubData.edge.whitespaceOnly)
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText(addClubData.valid.requiredError)).toBeVisible()
  })

  test('long club name does not crash the form', async ({ page }) => {
    await page.getByLabel('Club name').fill(addClubData.edge.longName)
    await expect(page.getByLabel('Club name')).toBeVisible()
  })
})
