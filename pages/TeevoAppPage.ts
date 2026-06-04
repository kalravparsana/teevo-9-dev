import type { Page } from '@playwright/test';
import { BASE_URL } from '../utils/base-url';

export type NavSection = 'Superadmin' | 'Club Admin' | 'Player';

export type NavLabel =
  | 'Add Club'
  | 'Manage Users'
  | 'Club Details'
  | 'Tee Time Slots'
  | 'Operating Hours'
  | 'Tournaments'
  | 'Game Bookings'
  | 'Scorecards'
  | 'Browse Clubs'
  | 'Leaderboard';

export class TeevoAppPage {
  constructor(readonly page: Page) {}

  async gotoHome() {
    await this.page.goto(BASE_URL + '/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Scope by section when labels repeat (e.g. Club Admin vs Player "Tournaments"). */
  async navigateTo(label: NavLabel, section?: NavSection) {
    if (section) {
      const block = this.page
        .locator('nav')
        .locator('div')
        .filter({ has: this.page.getByText(section, { exact: true }) })
        .first();
      await block.getByRole('button', { name: label, exact: true }).click();
      return;
    }
    await this.page.getByRole('button', { name: label, exact: true }).first().click();
  }

  get heading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  async openAppSettings() {
    await this.page.getByRole('button', { name: 'App Settings' }).click();
  }

  async closeAppSettings() {
    await this.page.getByRole('button', { name: 'Close' }).click();
  }
}
