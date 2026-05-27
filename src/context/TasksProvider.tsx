import type { ReactNode } from 'react'
import { useTasks } from '../hooks/useTasks'
import { TasksContext } from './tasks-context'

export function TasksProvider({ children }: { children: ReactNode }) {
  const value = useTasks()
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
