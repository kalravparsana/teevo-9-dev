/** Resolves app URL from CI/local env (aligns with Frontend/playwright.config.ts). */
export function getBaseUrl(): string {
  const port = process.env.PW_DEV_PORT ?? process.env.PORT ?? '5173'
  return (
    process.env.BASE_URL ??
    process.env.VITE_FRONTEND_URL ??
    `http://localhost:${port}`
  )
}
