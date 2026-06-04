/**
 * Reference Playwright config aligned with `.cursor/skills/playwrightConfig.mdc`.
 * Copy to project root as `playwright.config.ts` when executing tests (not done in QA generation-only mode).
 */
import { defineConfig, devices } from '@playwright/test';
import { getBaseUrl } from './base-url';

const baseURL = getBaseUrl();
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
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
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
});
