import { Bell, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { useAuth } from '../hooks/useAuth'

export function SettingsPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  function handleLogout() {
    signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage your profile and workspace preferences.
        </p>
      </div>

      <section className="mt-10 rounded-xl border border-border bg-surface-elevated p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-border pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-muted text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-ink">Profile</h2>
            <p className="text-sm text-ink-muted">Your personal information</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First name" defaultValue={user?.firstName ?? ''} />
            <Input label="Last name" defaultValue={user?.lastName ?? ''} />
          </div>
          <Input label="Email" type="email" defaultValue={user?.email ?? ''} />
          <Button>Save profile</Button>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-surface-elevated p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-border pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-warning">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-ink">Notifications</h2>
            <p className="text-sm text-ink-muted">How you stay informed</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <Select
            label="Due date reminders"
            defaultValue="daily"
            options={[
              { value: 'off', label: 'Off' },
              { value: 'daily', label: 'Daily digest' },
              { value: 'instant', label: 'As they happen' },
            ]}
          />
          <Select
            label="Task completion"
            defaultValue="weekly"
            options={[
              { value: 'off', label: 'Off' },
              { value: 'weekly', label: 'Weekly summary' },
              { value: 'instant', label: 'Immediate' },
            ]}
          />
          <Button variant="secondary">Save preferences</Button>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-surface-elevated p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-border pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-error">
            <LogOut className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-ink">Session</h2>
            <p className="text-sm text-ink-muted">Sign out of your workspace on this device</p>
          </div>
        </div>

        <div className="mt-5">
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </section>
    </div>
  )
}
