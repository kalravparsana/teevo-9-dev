import { createContext } from 'react'
import type { AuthUser } from '../types/auth'

export type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  signIn: (user: AuthUser) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
