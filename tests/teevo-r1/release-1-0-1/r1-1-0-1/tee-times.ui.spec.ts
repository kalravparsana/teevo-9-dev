import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Tee Time Slots — UI', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Tee Time Slots');
  });

  test('configuration card visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Tee Time Configuration/i })).toBeVisible();
  });

  test('generate slots replaces list', async ({ page }) => {
    await page.getByRole('button', { name: 'Generate Slots' }).click();
    await expect(page.getByRole('button', { name: 'Toggle' }).first()).toBeVisible();
  });

  test('toggle availability updates label', async ({ page }) => {
    const row = page.getByRole('button', { name: 'Toggle' }).first();
    await row.click();
    await expect(page.getByText(/Available|Booked/).first()).toBeVisible();
  });
});
