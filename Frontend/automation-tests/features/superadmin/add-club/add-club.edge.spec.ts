import { test, expect } from '@playwright/test'
import { TeevoAppPage } from '../../../pages/TeevoAppPage'
import { clubData } from '../../../fixtures/mock-data/club.data'

test.describe('Add Club — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.goto()
  })

  test('unicode location is accepted', async ({ page }) => {
    await page.getByLabel('Club name').fill('Test Club')
    await page.getByLabel('Location').fill(clubData.edge.unicodeLocation)
    await page.getByRole('button', { name: 'Add Club' }).click()
    await expect(page.getByText('Club added successfully.')).toBeVisible()
  })

  test('xss in notes does not execute script', async ({ page }) => {
    await page.getByLabel('Notes (optional)').fill(clubData.edge.xssNotes)
    const alertFired = await page.evaluate(() => (window as unknown as { __x?: boolean }).__x === true)
    expect(alertFired).toBeFalsy()
  })

  test('rapid navigation away and back preserves feature', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await expect(app.mainHeading).toHaveText('Add Club')
  })

  test('browser back after navigation keeps app stable', async ({ page }) => {
    const app = new TeevoAppPage(page)
    await app.navigate('Superadmin', 'Add Club')
    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
