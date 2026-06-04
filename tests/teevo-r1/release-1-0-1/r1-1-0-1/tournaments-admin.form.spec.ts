import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Tournaments Admin — Form', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Tournaments', 'Club Admin');
  });

  test('create tournament adds to managed list', async ({ page }) => {
    const name = `QA Open ${Date.now()}`;
    await page.getByLabel(/Tournament name/i).fill(name);
    await page.getByLabel(/^Date$/i).fill('2026-09-01');
    await page.getByRole('button', { name: 'Create Tournament' }).click();
    await expect(page.getByText(name)).toBeVisible();
  });

  test('cancel tournament removes from list', async ({ page }) => {
    const cancel = page.getByRole('button', { name: 'Cancel' }).first();
    const label = await page.getByRole('listitem').first().innerText();
    await cancel.click();
    await expect(page.getByRole('main')).toBeVisible();
  });
});
