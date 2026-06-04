import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

const DESCRIBE = 'Teevo R1 > Release 1.0.1 > Add Club — Accessibility';

test.describe(DESCRIBE, () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Add Club');
  });

  test('page has exactly one h1 heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });

  test('form fields have associated labels', async ({ page }) => {
    await expect(page.getByLabel(/Club name/i)).toBeVisible();
    await expect(page.getByLabel(/Location/i)).toBeVisible();
    await expect(page.getByLabel(/Number of holes/i)).toBeVisible();
  });

  test('submit button reachable via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });
});
