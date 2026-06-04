import { test, expect } from '@playwright/test';
import { BASE_URL } from "../../../../utils/base-url";
import { TeevoAppPage } from "../../../../pages/TeevoAppPage";

test.describe('Teevo R1 > Release 1.0.1 > Add Club — Smoke', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Add Club');
  });

  test('page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto(BASE_URL + '/');
    await expect(page).toHaveTitle(/Teevo/i);
    expect(errors).toHaveLength(0);
  });

  test('primary heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Add Club/i);
  });

  test('main content region renders', async ({ page }) => {
    await expect(page.getByRole('main')).toBeVisible();
  });
});
