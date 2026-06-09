/** Runtime env — aligns with Launchpad Vite conventions for API base URL. */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? 'http://localhost:5000/api'

export const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '1.0.0'
