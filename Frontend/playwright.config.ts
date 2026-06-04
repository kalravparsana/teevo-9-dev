import { defineConfig, devices } from '@playwright/test'

/**
 * E2E tests live under automation-tests/; the suite entry is index.ts (imports all specs).
 * Port resolution: PW_DEV_PORT → VITE_PORT → 5173 (Vite default).
 */
const nodeMajor = Number.parseInt(process.versions.node.split('.')[0] ?? '0', 10)
if (nodeMajor < 18) {
  throw new Error(
    `Playwright requires Node.js 18+. Current: ${process.version}. ` +
      `Run nvm use (or install Node 20 LTS) and retry.`,
  )
}

const devPort = Number(process.env.PW_DEV_PORT ?? process.env.VITE_PORT ?? 5173)
const baseURL = process.env.VITE_FRONTEND_URL ?? `http://localhost:${devPort}`
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './automation-tests',
  fullyParallel: isCI,
  forbidOnly: isCI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'], viewport: { width: 390, height: 844 } },
    },
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'], viewport: { width: 768, height: 1024 } },
    },
  ],
})
