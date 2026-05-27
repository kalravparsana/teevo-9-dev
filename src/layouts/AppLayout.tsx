import { Outlet } from 'react-router-dom'
import { MobileNav } from '../components/layout/MobileNav'
import { Sidebar } from '../components/layout/Sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
