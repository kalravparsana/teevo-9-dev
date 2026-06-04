import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Club Details — Form', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Club Details');
  });

  test('save changes shows success message', async ({ page }) => {
    await page.getByLabel(/Club name/i).fill('Updated Club Name');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText(/Club details saved/i)).toBeVisible();
  });

  test('switching club updates form fields', async ({ page }) => {
    const select = page.getByLabel(/Select club/i);
    const options = await select.locator('option').allTextContents();
    if (options.length > 1) {
      await select.selectOption({ index: 1 });
      await expect(page.getByLabel(/Club name/i)).not.toHaveValue('');
    }
  });
});
