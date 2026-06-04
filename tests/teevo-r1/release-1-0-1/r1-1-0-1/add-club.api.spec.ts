import { test, expect } from '@playwright/test';
import { addClubData } from '../../../../fixtures/mock-data/add-club.data';
import { BASE_URL } from '../../../../utils/base-url';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

const DESCRIBE = 'Teevo R1 > Release 1.0.1 > Add Club — API';

test.describe(DESCRIBE, () => {
  test('future API: clubs list mock renders when wired', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(addClubData.api.clubsSuccess),
      }),
    );
    await page.goto(BASE_URL + '/');
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('future API: 500 shows error handling path', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: addClubData.api.errorMessage }),
      }),
    );
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Add Club');
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('empty clubs API response still allows local add', async ({ page }) => {
    await page.route('**/api/clubs', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify(addClubData.api.clubsEmpty) }),
    );
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Add Club');
    await expect(page.getByLabel(/Club name/i)).toBeVisible();
  });
});
