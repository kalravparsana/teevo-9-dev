import { CheckSquare, LayoutDashboard, Menu, Settings, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between border-b border-border bg-surface-elevated px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <CheckSquare className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg text-ink">Clearboard</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-ink-muted hover:bg-stone-100"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-stone-900/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-surface-elevated shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <span className="font-display text-lg text-ink">Clearboard</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-ink-muted hover:bg-stone-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1 px-3 py-4" aria-label="Mobile navigation">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                      isActive
                        ? 'bg-primary-muted text-primary'
                        : 'text-ink-muted hover:bg-stone-50',
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
