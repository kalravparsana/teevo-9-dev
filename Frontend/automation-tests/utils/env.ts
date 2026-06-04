const devPort = Number(process.env.PW_DEV_PORT ?? process.env.VITE_PORT ?? 5173)

export const BASE_URL = process.env.VITE_FRONTEND_URL ?? `http://localhost:${devPort}`
