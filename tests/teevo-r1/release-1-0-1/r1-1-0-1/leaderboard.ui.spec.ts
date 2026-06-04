import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Leaderboard — UI', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Leaderboard');
  });

  test('leaderboard entries sorted by rank', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Tournament Leaderboard/i })).toBeVisible();
    await expect(page.getByText('Chris Park')).toBeVisible();
    await expect(page.getByText('1').first()).toBeVisible();
  });
});
