import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../pages/TeevoAppPage'
import { appShellData } from '../fixtures/mock-data/app-shell.data'

test.describe('Teevo App Shell — Edge Cases', () => {
  test('all sidebar nav items are clickable', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    const navButtons = page.locator('aside nav button')
    const count = await navButtons.count()
    for (let i = 0; i < count; i++) {
      await navButtons.nth(i).click()
      await expect(app.mainHeading).toBeVisible()
    }
  })

  test('notifications toggle persists across navigation', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    const toggle = page.getByLabel('Notifications')
    await toggle.uncheck()
    await app.navigate('Player', 'Leaderboard')
    await expect(toggle).not.toBeChecked()
  })

  test('special characters in display name are handled', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.openAppSettings()
    await page.getByLabel('Display name').fill(appShellData.edge.xssDisplayName)
    await expect(page.getByLabel('Display name')).toHaveValue(appShellData.edge.xssDisplayName)
  })

  test('rapid navigation between roles does not crash', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Club Admin', 'Scorecards')
    await app.navigate('Player', 'Browse Clubs')
    await app.navigate('Superadmin', 'Add Club')
    await expect(app.mainHeading).toHaveText('Add Club')
  })
})
