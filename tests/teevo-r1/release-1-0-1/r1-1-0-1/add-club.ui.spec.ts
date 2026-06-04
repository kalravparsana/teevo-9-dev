import { test, expect } from '@playwright/test';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

const DESCRIBE = 'Teevo R1 > Release 1.0.1 > Add Club — UI';

test.describe(DESCRIBE, () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Add Club');
  });

  test('Add New Club card heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Add New Club/i })).toBeVisible();
  });

  test('club name input is visible', async ({ page }) => {
    await expect(page.getByLabel(/Club name/i)).toBeVisible();
  });

  test('location input is visible', async ({ page }) => {
    await expect(page.getByLabel(/Location/i)).toBeVisible();
  });

  test('holes select is visible', async ({ page }) => {
    await expect(page.getByLabel(/Number of holes/i)).toBeVisible();
  });

  test('Add Club button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Add Club' })).toBeEnabled();
  });
});
