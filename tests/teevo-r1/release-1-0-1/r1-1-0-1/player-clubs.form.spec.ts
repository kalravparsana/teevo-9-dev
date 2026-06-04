import { test, expect } from '@playwright/test';
import { playerClubsData } from '../../../../fixtures/mock-data/player-clubs.data';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Browse Clubs — Form & Search', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Browse Clubs');
  });

  test('search filters clubs by name', async ({ page }) => {
    await page.getByPlaceholder(/Search clubs/i).fill(playerClubsData.valid.searchTerm);
    await expect(page.getByText(playerClubsData.valid.clubName)).toBeVisible();
  });

  test('no results message for nonsense search', async ({ page }) => {
    await page.getByPlaceholder(/Search clubs/i).fill(playerClubsData.edge.noMatch);
    await expect(page.getByText(/No clubs match your search/i)).toBeVisible();
  });

  test('join club enables joined state', async ({ page }) => {
    const joinBtn = page.getByRole('button', { name: 'Join Club' }).first();
    await joinBtn.click();
    await expect(page.getByRole('button', { name: 'Joined' }).first()).toBeDisabled();
  });
});
