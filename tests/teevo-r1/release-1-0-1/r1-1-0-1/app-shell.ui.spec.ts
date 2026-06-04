import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > App Shell — UI', () => {
  test('sidebar brand visible', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await expect(page.getByText('Teevo')).toBeVisible();
    await expect(page.getByText('Golf Club Platform')).toBeVisible();
  });

  test('notifications toggle works', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    const toggle = page.getByRole('checkbox', { name: /Notifications/i });
    const initial = await toggle.isChecked();
    await toggle.click();
    await expect(toggle).toBeChecked({ checked: !initial });
  });

  test('App Settings dropdown opens and closes', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.openAppSettings();
    await expect(page.getByText('Settings')).toBeVisible();
    await app.closeAppSettings();
    await expect(page.getByText('Settings')).not.toBeVisible();
  });

  test('all role nav sections visible', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await expect(page.getByText('Superadmin')).toBeVisible();
    await expect(page.getByText('Club Admin')).toBeVisible();
    await expect(page.getByText('Player')).toBeVisible();
  });
});
