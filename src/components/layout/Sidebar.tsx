import { CheckSquare, LayoutDashboard, LogOut, Settings } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function Sidebar() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  function handleLogout() {
    signOut()
    navigate('/', { replace: true })
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-surface-elevated">
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
          <CheckSquare className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <span className="font-display text-xl text-ink">Clearboard</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Main navigation">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-muted text-primary'
                  : 'text-ink-muted hover:bg-stone-50 hover:text-ink',
              )
            }
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-200 text-sm font-semibold text-stone-600"
            aria-hidden
          >
            {user ? getInitials(user.firstName, user.lastName) : '??'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
            </p>
            <p className="truncate text-xs text-ink-muted">
              {user?.email ?? 'Not signed in'}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-3 w-full justify-start px-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </aside>
  )
}
