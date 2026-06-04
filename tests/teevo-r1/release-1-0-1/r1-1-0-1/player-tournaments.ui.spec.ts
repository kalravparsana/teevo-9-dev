import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Player Tournaments — UI', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Tournaments', 'Player');
  });

  test('book spot shows success banner', async ({ page }) => {
    await page.getByRole('button', { name: 'Book Spot' }).first().click();
    await expect(page.getByText(/Registered for/i)).toBeVisible();
  });

  test('booked button disabled after booking', async ({ page }) => {
    await page.getByRole('button', { name: 'Book Spot' }).first().click();
    await expect(page.getByRole('button', { name: 'Booked' }).first()).toBeDisabled();
  });
});
