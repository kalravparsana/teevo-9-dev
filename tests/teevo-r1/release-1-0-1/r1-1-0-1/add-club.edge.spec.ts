import { test, expect } from '@playwright/test';
import { addClubData } from '../../../../fixtures/mock-data/add-club.data';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

const DESCRIBE = 'Teevo R1 > Release 1.0.1 > Add Club — Edge';

test.describe(DESCRIBE, () => {
  test('special characters in notes are handled gracefully', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Add Club');
    await page.getByLabel(/Notes/i).fill(addClubData.edge.xssNotes);
    await page.getByLabel(/Club name/i).fill('Safe Club');
    await page.getByLabel(/Location/i).fill('Safe City');
    await page.getByRole('button', { name: 'Add Club' }).click();
    const alertFired = await page.evaluate(
      () => (window as unknown as { __alertFired?: boolean }).__alertFired === true,
    );
    expect(alertFired).toBeFalsy();
  });

  test('rapid double submit does not break UI', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Add Club');
    await page.getByLabel(/Club name/i).fill('Double Submit Club');
    await page.getByLabel(/Location/i).fill('Test City');
    const btn = page.getByRole('button', { name: 'Add Club' });
    await btn.dblclick();
    await expect(page.getByRole('main')).toBeVisible();
  });
});
