import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { appShellData } from '../../../fixtures/mock-data/app-shell.data'

test.describe('Browse Clubs — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Browse Clubs')
  })

  test('long search query does not crash', async ({ page }) => {
    await page.getByPlaceholder('Search clubs...').fill(appShellData.edge.searchLong)
    await expect(page.getByText('No clubs match your search.')).toBeVisible()
  })

  test('case-insensitive search works', async ({ page }) => {
    await page.getByPlaceholder('Search clubs...').fill('pine valley')
    await expect(page.getByText('Pine Valley Golf Club')).toBeVisible()
  })

  test('rapid navigation away and back preserves feature', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await app.navigate('Player', 'Browse Clubs')
    await expect(app.mainHeading).toHaveText('Browse Clubs')
  })

  test('browser back after navigation keeps app stable', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
