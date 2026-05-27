import { useContext } from 'react'
import { TasksContext } from '../context/tasks-context'

export function useTasksContext() {
  const ctx = useContext(TasksContext)
  if (!ctx) throw new Error('useTasksContext must be used within TasksProvider')
  return ctx
}
