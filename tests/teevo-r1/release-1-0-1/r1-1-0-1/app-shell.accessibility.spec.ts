import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > App Shell — Accessibility', () => {
  test('sidebar navigation uses buttons with visible labels', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await expect(page.getByRole('button', { name: 'Add Club' })).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('settings dropdown has aria-expanded', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    const settings = page.getByRole('button', { name: 'App Settings' });
    await settings.click();
    await expect(settings).toHaveAttribute('aria-expanded', 'true');
  });
});
