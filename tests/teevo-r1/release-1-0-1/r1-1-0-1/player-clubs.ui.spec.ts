import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Browse Clubs — UI', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Browse Clubs');
  });

  test('Golf Clubs card visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Golf Clubs/i })).toBeVisible();
  });

  test('search input visible', async ({ page }) => {
    await expect(page.getByPlaceholder(/Search clubs/i)).toBeVisible();
  });

  test('at least one club card listed', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Join Club|Joined/ }).first()).toBeVisible();
  });
});
