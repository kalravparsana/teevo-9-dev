import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { TasksProvider } from './context/TasksProvider'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import { SettingsPage } from './pages/SettingsPage'
import { TasksPage } from './pages/TasksPage'

export default function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TasksProvider>
    </BrowserRouter>
  )
}
