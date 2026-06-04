import { defineConfig, devices } from '@playwright/test'

const nodeMajor = Number.parseInt(process.versions.node.split('.')[0] ?? '0', 10)
if (nodeMajor < 18) {
  throw new Error(
    `Playwright requires Node.js 18+. Current: ${process.version}.`,
  )
}

/** Vite default; override with PW_DEV_PORT or VITE_DEV_PORT when the dev server binds elsewhere. */
const devPort = Number(process.env.PW_DEV_PORT ?? process.env.VITE_DEV_PORT ?? 5173)
const baseURL =
  process.env.VITE_FRONTEND_URL ?? process.env.BASE_URL ?? `http://127.0.0.1:${devPort}`

const isCI = !!process.env.CI

export default defineConfig({
  testDir: './automation-tests',
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
  webServer: {
    command: `npm run dev -- --port ${devPort} --host 127.0.0.1`,
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
})
