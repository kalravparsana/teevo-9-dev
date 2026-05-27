import { ArrowLeft, ListTodo } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'

export function SignInPage() {
  const navigate = useNavigate()
  const { isAuthenticated, signIn } = useAuth()
  const [email, setEmail] = useState('alex@company.com')
  const [password, setPassword] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password.trim()) return

    const [localPart] = trimmedEmail.split('@')
    const nameParts = localPart.split(/[._-]/).filter(Boolean)
    const firstName =
      nameParts[0] != null
        ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1)
        : 'User'
    const lastName =
      nameParts[1] != null
        ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1)
        : 'Member'

    signIn({
      email: trimmedEmail,
      firstName,
      lastName,
    })
    navigate('/app', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-border/60 bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <ListTodo className="h-5 w-5" />
            </div>
            <span className="font-display text-xl text-ink">Clearboard</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface-elevated p-8 shadow-sm">
          <h1 className="font-display text-3xl text-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Sign in to open your workspace and pick up where you left off.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
