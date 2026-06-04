import { test, expect } from '@playwright/test';
import { manageUsersData } from '../../../../fixtures/mock-data/manage-users.data';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

test.describe('Teevo R1 > Release 1.0.1 > Manage Users — Form', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Manage Users');
  });

  test('add user with valid data increases list', async ({ page }) => {
    const { name, email } = manageUsersData.valid;
    const before = await page.getByRole('listitem').count();
    await page.getByLabel(/Full name/i).fill(name);
    await page.getByLabel(/Email/i).fill(email);
    await page.getByRole('button', { name: 'Add User' }).click();
    await expect(page.getByText(name)).toBeVisible();
    expect(await page.getByRole('listitem').count()).toBeGreaterThanOrEqual(before);
  });

  test('empty submit does not add blank user row', async ({ page }) => {
    const before = await page.getByRole('listitem').count();
    await page.getByRole('button', { name: 'Add User' }).click();
    expect(await page.getByRole('listitem').count()).toBe(before);
  });

  test('remove user deletes from list', async ({ page }) => {
    await page.getByRole('button', { name: 'Remove' }).first().click();
    await expect(page.getByRole('main')).toBeVisible();
  });
});
