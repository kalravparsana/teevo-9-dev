import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../../../utils/base-url';
import { TeevoAppPage, type NavLabel, type NavSection } from '../../../../pages/TeevoAppPage';

const VIEWS: { nav: NavLabel; section?: NavSection; title: RegExp }[] = [
  { nav: 'Add Club', section: 'Superadmin', title: /Add Club/i },
  { nav: 'Manage Users', section: 'Superadmin', title: /Manage Users/i },
  { nav: 'Club Details', section: 'Superadmin', title: /Configure Club Details/i },
  { nav: 'Tee Time Slots', section: 'Club Admin', title: /Tee Time Slots/i },
  { nav: 'Operating Hours', section: 'Club Admin', title: /Operating Hours/i },
  { nav: 'Tournaments', section: 'Club Admin', title: /Tournament Management/i },
  { nav: 'Game Bookings', section: 'Club Admin', title: /Game Bookings/i },
  { nav: 'Scorecards', section: 'Club Admin', title: /Scorecards/i },
  { nav: 'Browse Clubs', section: 'Player', title: /Browse Clubs/i },
  { nav: 'Tournaments', section: 'Player', title: /Upcoming Tournaments/i },
  { nav: 'Leaderboard', section: 'Player', title: /Tournament Leaderboard/i },
];

test.describe('Teevo R1 > Release 1.0.1 > Navigation — Edge', () => {
  test('every sidebar destination updates page title', async ({ page }) => {
    const app = new TeevoAppPage(page);
    await app.gotoHome();
    for (const { nav, section, title } of VIEWS) {
      await app.navigateTo(nav, section);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    }
  });

  test('reload preserves shell', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await page.reload();
    await expect(page.getByText('Teevo')).toBeVisible();
  });
});
