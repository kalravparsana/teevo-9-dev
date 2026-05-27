import { createContext } from 'react'
import type { useTasks } from '../hooks/useTasks'

export type TasksContextValue = ReturnType<typeof useTasks>

export const TasksContext = createContext<TasksContextValue | null>(null)
