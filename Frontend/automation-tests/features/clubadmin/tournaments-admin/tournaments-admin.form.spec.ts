import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { tournamentData } from '../../../fixtures/mock-data/tournament.data'

test.describe('Tournament Management — Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Tournaments')
  })

  test('empty name and date does not create tournament', async ({ page }) => {
    const countBefore = await page.getByRole('button', { name: 'Cancel' }).count()
    await page.getByRole('button', { name: 'Create Tournament' }).click()
    expect(await page.getByRole('button', { name: 'Cancel' }).count()).toBe(countBefore)
  })

  test('valid tournament creation adds to list', async ({ page }) => {
    await page.getByLabel('Tournament name').fill(tournamentData.valid.name)
    await page.getByLabel('Date').fill(tournamentData.valid.date)
    await page.getByLabel('Format').selectOption(tournamentData.valid.format)
    await page.getByLabel('Max players').fill(tournamentData.valid.maxPlayers)
    await page.getByRole('button', { name: 'Create Tournament' }).click()
    await expect(page.getByText(tournamentData.valid.name)).toBeVisible()
  })

  test('form clears name after successful create', async ({ page }) => {
    await page.getByLabel('Tournament name').fill(tournamentData.valid.name)
    await page.getByLabel('Date').fill(tournamentData.valid.date)
    await page.getByRole('button', { name: 'Create Tournament' }).click()
    await expect(page.getByLabel('Tournament name')).toHaveValue('')
  })

  test('format select accepts Scramble option', async ({ page }) => {
    await page.getByLabel('Format').selectOption('Scramble')
    await expect(page.getByLabel('Format')).toHaveValue('Scramble')
  })
})
