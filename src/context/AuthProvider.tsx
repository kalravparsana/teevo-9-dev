import type { ReactNode } from 'react'
import { useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { AUTH_STORAGE_KEY, type AuthUser } from '../types/auth'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<AuthUser | null>(AUTH_STORAGE_KEY, null)

  const signIn = useCallback(
    (nextUser: AuthUser) => {
      setUser(nextUser)
    },
    [setUser],
  )

  const signOut = useCallback(() => {
    setUser(null)
  }, [setUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
