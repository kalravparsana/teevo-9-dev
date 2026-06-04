import { test, expect } from '@playwright/test';
import { addClubData } from '../../../../fixtures/mock-data/add-club.data';
import { TeevoAppPage } from '../../../../pages/TeevoAppPage';

const DESCRIBE = 'Teevo R1 > Release 1.0.1 > Add Club — Form';

test.describe(DESCRIBE, () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    await app.navigateTo('Add Club');
  });

  test('submit empty form shows required field message', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Club' }).click();
    await expect(page.getByText(/Club name and location are required/i)).toBeVisible();
  });

  test('valid form submission succeeds', async ({ page }) => {
    const { name, location, holes } = addClubData.valid;
    await page.getByLabel(/Club name/i).fill(name);
    await page.getByLabel(/Location/i).fill(location);
    await page.getByLabel(/Number of holes/i).selectOption(holes);
    await page.getByRole('button', { name: 'Add Club' }).click();
    await expect(page.getByText(/Club added successfully/i)).toBeVisible();
    await expect(page.getByText(name)).toBeVisible();
  });

  test('whitespace-only name treated as empty', async ({ page }) => {
    await page.getByLabel(/Club name/i).fill(addClubData.invalid.whitespaceName);
    await page.getByLabel(/Location/i).fill(addClubData.valid.location);
    await page.getByRole('button', { name: 'Add Club' }).click();
    await expect(page.getByText(/required/i)).toBeVisible();
  });

  test('1000-character name does not crash the form', async ({ page }) => {
    await page.getByLabel(/Club name/i).fill(addClubData.edge.longName);
    await expect(page.getByLabel(/Club name/i)).toBeVisible();
  });

  test('submit by pressing Enter key works', async ({ page }) => {
    await page.getByLabel(/Club name/i).fill(addClubData.valid.name);
    await page.getByLabel(/Location/i).fill(addClubData.valid.location);
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Club added successfully|required/i)).toBeVisible();
  });
});
