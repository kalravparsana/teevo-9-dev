import type { Page } from '@playwright/test'
import { BASE_URL } from '../utils/env'

export type NavSection = 'Superadmin' | 'Club Admin' | 'Player'

export class TeevoAppPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto(BASE_URL)
    await this.page.waitForLoadState('domcontentloaded')
  }

  async navigate(section: NavSection, itemLabel: string) {
    const sectionBlock = this.page
      .locator('nav')
      .locator('div')
      .filter({ has: this.page.getByText(section, { exact: true }) })
    await sectionBlock.getByRole('button', { name: itemLabel, exact: true }).click()
  }

  async openAppSettings() {
    await this.page.getByRole('button', { name: 'App Settings' }).click()
  }

  async closeAppSettings() {
    await this.page.getByRole('button', { name: 'Close' }).click()
  }

  get mainHeading() {
    return this.page.getByRole('heading', { level: 1 })
  }

  get sidebar() {
    return this.page.locator('aside')
  }

  get mainPanel() {
    return this.page.getByRole('main')
  }
}
