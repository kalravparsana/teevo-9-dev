import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Operating Hours — Form', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Operating Hours');
  });

  test('mark Monday closed disables time inputs', async ({ page }) => {
    const mondayRow = page.getByText('Monday').locator('..');
    await mondayRow.getByRole('checkbox').check();
    await expect(page.getByLabel(/Opens/i).first()).toBeDisabled();
  });

  test('save hours shows confirmation', async ({ page }) => {
    await page.getByRole('button', { name: 'Save Hours' }).click();
    await expect(page.getByText(/Operating hours updated/i)).toBeVisible();
  });
});
