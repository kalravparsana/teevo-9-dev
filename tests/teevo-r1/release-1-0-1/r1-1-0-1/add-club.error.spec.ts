import { test, expect } from '@playwright/test';
import { addClubData } from '../../../../fixtures/mock-data/add-club.data';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

const DESCRIBE = 'Teevo R1 > Release 1.0.1 > Add Club — Error';

test.describe(DESCRIBE, () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Add Club');
  });

  test('error message clears after correction', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Club' }).click();
    await expect(page.getByText(/required/i)).toBeVisible();
    await page.getByLabel(/Club name/i).fill(addClubData.valid.name);
    await page.getByLabel(/Location/i).fill(addClubData.valid.location);
    await expect(page.getByText(/required/i)).not.toBeVisible();
  });

  test('page does not crash on malformed API response', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({ status: 200, body: 'not-valid-json{{' }),
    );
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await expect(page.getByRole('main')).toBeVisible();
  });
});
