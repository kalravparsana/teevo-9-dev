import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Game Bookings — UI', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Game Bookings');
  });

  test('bookings list renders', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Game Bookings/i })).toBeVisible();
    await expect(page.getByText(/Sam Rivera|Mia Chen/).first()).toBeVisible();
  });

  test('confirm pending booking', async ({ page }) => {
    const confirm = page.getByRole('button', { name: 'Confirm' });
    if (await confirm.count()) {
      await confirm.first().click();
      await expect(page.getByText('confirmed').first()).toBeVisible();
    }
  });
});
