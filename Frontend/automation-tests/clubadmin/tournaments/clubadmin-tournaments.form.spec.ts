import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { tournamentsAdminData } from '../../fixtures/mock-data/tournaments-admin.data'

test.describe('Teevo R1 > Tournament Management', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.tournamentsAdmin)
  })

  test('empty name and date does not create tournament', async ({ page }) => {
    const countBefore = await page.getByRole('listitem').count()
    await page.getByRole('button', { name: tournamentsAdminData.valid.createButton }).click()
    expect(await page.getByRole('listitem').count()).toBe(countBefore)
  })

  test('valid tournament appears in managed list', async ({ page }) => {
    await page.getByLabel('Tournament name').fill(tournamentsAdminData.valid.name)
    await page.getByLabel('Date').fill(tournamentsAdminData.valid.date)
    await page.getByLabel('Format').selectOption(tournamentsAdminData.valid.format)
    await page.getByLabel('Max players').fill(tournamentsAdminData.valid.maxPlayers)
    await page.getByRole('button', { name: tournamentsAdminData.valid.createButton }).click()
    await expect(page.getByText(tournamentsAdminData.valid.name)).toBeVisible()
  })

  test('cancel removes tournament from list', async ({ page }) => {
    const row = page.getByRole('listitem').filter({ hasText: tournamentsAdminData.valid.existingTournament })
    await row.getByRole('button', { name: tournamentsAdminData.valid.cancelButton }).click()
    await expect(page.getByText(tournamentsAdminData.valid.existingTournament)).not.toBeVisible()
  })
})
