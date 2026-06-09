import { NAV_SECTIONS, isSameView, viewKey } from '../../config/navigation'
import type { AppView } from '../../types/navigation'

interface SidebarProps {
  activeView: AppView
  onNavigate: (view: AppView) => void
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside
      data-testid="app-sidebar"
      className="flex h-full w-64 shrink-0 flex-col border-r border-gray-200 bg-white"
    >
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-700 text-sm font-bold text-white">
            T
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">Teevo</p>
            <p className="text-xs text-gray-500">Golf Club Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.role}>
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-green-700">
                {section.title}
              </p>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const active = isSameView(activeView, item.view)
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        data-testid={`nav-${item.id}`}
                        onClick={() => onNavigate(item.view)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          active
                            ? 'bg-green-700 font-medium text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <p className="text-xs text-gray-500">
          Active: <span className="font-medium text-gray-700">{viewKey(activeView)}</span>
        </p>
      </div>
    </aside>
  )
}
