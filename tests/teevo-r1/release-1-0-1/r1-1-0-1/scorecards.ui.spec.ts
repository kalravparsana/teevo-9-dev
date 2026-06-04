import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Scorecards — UI', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Scorecards');
  });

  test('scorecards table renders headers and rows', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Player' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Sam Rivera' })).toBeVisible();
  });
});
