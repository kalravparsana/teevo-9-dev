import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerTournamentsData } from '../../fixtures/mock-data/player-tournaments.data'

test.describe('Teevo R1 > Upcoming Tournaments', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.playerTournaments)
  })

  test('book spot shows registration message', async ({ page }) => {
    const row = page.getByRole('listitem').filter({ hasText: playerTournamentsData.valid.tournamentName })
    await row.getByRole('button', { name: playerTournamentsData.valid.bookButton }).click()
    await expect(page.getByText(new RegExp(playerTournamentsData.valid.registeredPrefix))).toBeVisible()
    await expect(row.getByRole('button', { name: playerTournamentsData.valid.bookedButton })).toBeDisabled()
  })
})
