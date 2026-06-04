import { defineConfig, devices } from '@playwright/test'

const nodeMajor = Number.parseInt(process.versions.node.split('.')[0] ?? '0', 10)
if (nodeMajor < 18) {
  throw new Error(
    `Playwright requires Node.js 18+. Current: ${process.version}.`,
  )
}

const devPort = Number(process.env.PW_DEV_PORT ?? process.env.PORT ?? 5173)
const baseURL =
  process.env.BASE_URL ??
  process.env.VITE_FRONTEND_URL ??
  `http://localhost:${devPort}`

const isCI = !!process.env.CI

export default defineConfig({
  testDir: '../tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: isCI,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } },
    },
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'], viewport: { width: 768, height: 1024 } },
    },
  ],
})
