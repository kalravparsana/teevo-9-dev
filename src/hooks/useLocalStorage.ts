import { useCallback, useState } from 'react'

function readStorageValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : initialValue
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readStorageValue(key, initialValue),
  )

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* storage full or unavailable */
        }
        return next
      })
    },
    [key],
  )

  return [storedValue, setValue] as const
}
