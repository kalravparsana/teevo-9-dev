import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { appShellData } from '../../../fixtures/mock-data/app-shell.data'

test.describe('Browse Clubs — Search & Join Tests', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
    await app.navigate('Player', 'Browse Clubs')
  })

  test('search by club name filters results', async ({ page }) => {
    await page.getByPlaceholder('Search clubs...').fill(appShellData.valid.searchTerm)
    await expect(page.getByText('Pine Valley Golf Club')).toBeVisible()
    await expect(page.getByText('Augusta National')).not.toBeVisible()
  })

  test('search by location filters results', async ({ page }) => {
    await page.getByPlaceholder('Search clubs...').fill('Scotland')
    await expect(page.getByText('St Andrews Links')).toBeVisible()
    await expect(page.getByText('Pine Valley Golf Club')).not.toBeVisible()
  })

  test('no results message shown for unmatched search', async ({ page }) => {
    await page.getByPlaceholder('Search clubs...').fill(appShellData.edge.searchNoResults)
    await expect(page.getByText('No clubs match your search.')).toBeVisible()
  })

  test('Join Club button changes to Joined after click', async ({ page }) => {
    const joinBtn = page.locator('li').filter({ hasText: 'Augusta National' }).getByRole('button', { name: 'Join Club' })
    await joinBtn.click()
    await expect(page.locator('li').filter({ hasText: 'Augusta National' }).getByRole('button', { name: 'Joined' })).toBeVisible()
  })

  test('clearing search restores full club list', async ({ page }) => {
    await page.getByPlaceholder('Search clubs...').fill(appShellData.valid.searchTerm)
    await page.getByPlaceholder('Search clubs...').fill('')
    await expect(page.getByText('Augusta National')).toBeVisible()
  })
})
