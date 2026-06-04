import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/Button'

interface TopBarProps {
  pageTitle: string
  notificationsEnabled: boolean
  onToggleNotifications: () => void
}

export function TopBar({
  pageTitle,
  notificationsEnabled,
  onToggleNotifications,
}: TopBarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [profileName, setProfileName] = useState('Alex Morgan')
  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4"
      data-testid="top-bar"
    >
      <h1 className="text-lg font-semibold text-gray-900">{pageTitle}</h1>

      <div className="flex items-center gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={onToggleNotifications}
            className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-600"
          />
          Notifications
        </label>

        <div className="relative" ref={settingsRef}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSettingsOpen((open) => !open)}
            aria-expanded={settingsOpen}
            aria-haspopup="true"
          >
            App Settings
          </Button>

          {settingsOpen && (
            <div
              role="dialog"
              aria-label="App settings"
              data-testid="settings-dropdown"
              className="absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-gray-300 bg-gray-200 p-4 shadow-lg"
            >
              <p className="mb-3 text-xs font-semibold uppercase text-gray-500">Settings</p>
              <div className="flex flex-col gap-3">
                <label className="text-sm text-gray-700">
                  Display name
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm"
                  />
                </label>
                <label className="flex items-center justify-between text-sm text-gray-700">
                  Compact sidebar
                  <input type="checkbox" className="h-4 w-4 text-green-700" />
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSettingsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-xs font-semibold text-white">
          {profileName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)}
        </div>
      </div>
    </header>
  )
}
