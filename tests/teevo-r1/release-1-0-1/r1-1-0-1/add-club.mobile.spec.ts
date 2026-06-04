import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

const DESCRIBE = 'Teevo R1 > Release 1.0.1 > Add Club — Mobile';

const VIEWPORTS = [
  { name: 'iPhone 14', width: 390, height: 844 },
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'Android 360', width: 360, height: 800 },
  { name: 'iPad', width: 768, height: 1024 },
];

for (const vp of VIEWPORTS) {
  test.describe(`${DESCRIBE}: ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test('form renders on mobile viewport', async ({ page }) => {
      const app = new TeevoAppPage(page);
      await app.gotoHome();
      await app.navigateTo('Add Club');
      await expect(page.getByLabel(/Club name/i)).toBeVisible();
      await expect(page.getByRole('button', { name: 'Add Club' })).toBeVisible();
    });
  });
}
