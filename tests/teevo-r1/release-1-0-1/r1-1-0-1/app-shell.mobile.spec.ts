import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > App Shell — Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('layout usable on mobile', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await expect(page.getByRole('main')).toBeVisible();
    await app.navigateTo('Browse Clubs');
    await expect(page.getByPlaceholder(/Search clubs/i)).toBeInViewport();
  });
});
