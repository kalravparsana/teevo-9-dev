import { test, expect } from '@playwright/test';
import { manageUsersData } from '../../../../fixtures/mock-data/manage-users.data';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Manage Users — API', () => {
  test('mock users API success', async ({ page }) => {
    await page.route('**/api/users', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify(manageUsersData.api.usersSuccess),
      }),
    );
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Manage Users');
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('401 redirects or blocks when auth added', async ({ page }) => {
    await page.route('**/api/users', (route) =>
      route.fulfill({ status: 401, body: JSON.stringify({ message: 'Unauthorized' }) }),
    );
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Manage Users');
    await expect(page.getByRole('main')).toBeVisible();
  });
});
