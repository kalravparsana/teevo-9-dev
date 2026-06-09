import { API_BASE_URL } from '../env'
import type { ApiErrorBody } from './contracts'

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: ApiErrorBody,
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text()
  if (!text) return {} as T
  try {
    return JSON.parse(text) as T
  } catch {
    throw new ApiClientError('Invalid JSON response', response.status)
  }
}

/** Fetch wrapper for future backend integration (R1 demo uses in-memory state). */
export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!response.ok) {
    const body = await parseJson<ApiErrorBody>(response).catch(() => undefined)
    throw new ApiClientError(body?.message ?? response.statusText, response.status, body)
  }
  return parseJson<T>(response)
}
