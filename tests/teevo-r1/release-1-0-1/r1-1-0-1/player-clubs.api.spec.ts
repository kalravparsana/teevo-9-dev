import { test, expect } from '@playwright/test';
import { playerClubsData } from '../../../../fixtures/mock-data/player-clubs.data';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Browse Clubs — API', () => {
  test('empty clubs API still shows search UI', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify(playerClubsData.api.clubsEmpty) }),
    );
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Browse Clubs', 'Player');
    await expect(page.getByPlaceholder(/Search clubs/i)).toBeVisible();
  });

  test('network failure handled when API wired', async ({ page }) => {
    await page.route('**/api/clubs', (route) => route.abort('failed'));
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Browse Clubs', 'Player');
    await expect(page.getByRole('main')).toBeVisible();
  });
});
