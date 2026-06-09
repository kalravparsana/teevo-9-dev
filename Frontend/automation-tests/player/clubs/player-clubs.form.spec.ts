import { test, expect } from '@playwright/test'
import { gotoHome, gotoView, navigateTo, openAppSettings, APP_TITLE, NAV_IDS } from '../../utils/navigation'
import { playerClubsData } from '../../fixtures/mock-data/player-clubs.data'

test.describe('Teevo R1 > Browse Clubs', () => {
  test.beforeEach(async ({ page }) => {
    await gotoView(page, NAV_IDS.playerClubs)
  })

  test('valid search term filters clubs', async ({ page }) => {
    await page.getByTestId('clubs-search').fill(playerClubsData.valid.searchTerm)
    await expect(page.getByText(playerClubsData.valid.matchClub)).toBeVisible()
    await expect(page.getByText('Augusta National')).not.toBeVisible()
  })

  test('no results message when search matches nothing', async ({ page }) => {
    await page.getByTestId('clubs-search').fill('zzznomatch999')
    await expect(page.getByText(playerClubsData.valid.noResultsMessage)).toBeVisible()
  })

  test('clearing search restores all clubs', async ({ page }) => {
    await page.getByTestId('clubs-search').fill(playerClubsData.valid.searchTerm)
    await page.getByTestId('clubs-search').fill('')
    await expect(page.getByText('Augusta National')).toBeVisible()
  })

  test('leading and trailing spaces still match', async ({ page }) => {
    await page.getByTestId('clubs-search').fill(playerClubsData.edge.searchWhitespace)
    await expect(page.getByText(playerClubsData.valid.matchClub)).toBeVisible()
  })

  test('200-character search does not crash', async ({ page }) => {
    await page.getByTestId('clubs-search').fill(playerClubsData.edge.search200)
    await expect(page.getByTestId('clubs-search')).toBeVisible()
  })

  test('join club enables joined state', async ({ page }) => {
    const row = page.getByRole('listitem').filter({ hasText: playerClubsData.valid.matchClub })
    await row.getByRole('button', { name: playerClubsData.valid.joinButton }).click()
    await expect(row.getByRole('button', { name: playerClubsData.valid.joinedButton })).toBeDisabled()
  })
})
