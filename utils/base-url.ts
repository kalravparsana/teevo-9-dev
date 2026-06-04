/**
 * Resolves the frontend base URL for Playwright specs.
 * Aligns with launchpad vite dev server (strictPort; default 5173).
 */
export function getBaseUrl(): string {
  const explicit =
    process.env.BASE_URL ||
    process.env.VITE_FRONTEND_URL ||
    process.env.PLAYWRIGHT_BASE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const port = process.env.PW_DEV_PORT || process.env.PORT || '5173';
  const host = process.env.PW_DEV_HOST || 'localhost';
  return `http://${host}:${port}`;
}

export const BASE_URL = getBaseUrl();
