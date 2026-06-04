import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Manage Users — UI', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Manage Users');
  });

  test('Add User card visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Add User/i })).toBeVisible();
  });

  test('All Users list visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /All Users/i })).toBeVisible();
    await expect(page.getByText(/users on the platform/i)).toBeVisible();
  });

  test('role select visible', async ({ page }) => {
    await expect(page.getByLabel(/Role/i)).toBeVisible();
  });
});
