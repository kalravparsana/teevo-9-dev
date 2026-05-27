import { useCallback, useMemo } from 'react'
import { initialTasks } from '../data/initialTasks'
import { filterTasksByQuery, generateId, sortTasks } from '../lib/utils'
import type {
  Task,
  TaskFilter,
  TaskFormData,
  TaskSort,
  TaskStatus,
} from '../types/task'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'clearboard-tasks'

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, initialTasks)

  const createTask = useCallback(
    (data: TaskFormData) => {
      const now = new Date().toISOString()
      const task: Task = {
        id: generateId(),
        title: data.title.trim(),
        description: data.description.trim(),
        priority: data.priority,
        status: 'active',
        dueDate: data.dueDate || null,
        createdAt: now,
        updatedAt: now,
      }
      setTasks((prev) => [task, ...prev])
      return task
    },
    [setTasks],
  )

  const updateTask = useCallback(
    (id: string, data: Partial<TaskFormData> & { status?: TaskStatus }) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t
          return {
            ...t,
            ...(data.title !== undefined && { title: data.title.trim() }),
            ...(data.description !== undefined && {
              description: data.description.trim(),
            }),
            ...(data.priority !== undefined && { priority: data.priority }),
            ...(data.dueDate !== undefined && {
              dueDate: data.dueDate || null,
            }),
            ...(data.status !== undefined && { status: data.status }),
            updatedAt: new Date().toISOString(),
          }
        }),
      )
    },
    [setTasks],
  )

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id))
    },
    [setTasks],
  )

  const toggleTaskStatus = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t
          const status: TaskStatus = t.status === 'active' ? 'completed' : 'active'
          return { ...t, status, updatedAt: new Date().toISOString() }
        }),
      )
    },
    [setTasks],
  )

  const stats = useMemo(() => {
    const active = tasks.filter((t) => t.status === 'active').length
    const completed = tasks.filter((t) => t.status === 'completed').length
    const overdue = tasks.filter(
      (t) =>
        t.status === 'active' &&
        t.dueDate &&
        new Date(t.dueDate) < new Date(new Date().toDateString()),
    ).length
    return { total: tasks.length, active, completed, overdue }
  }, [tasks])

  const getFilteredTasks = useCallback(
    (filter: TaskFilter, sort: TaskSort, query: string) => {
      let result = tasks
      if (filter === 'active') result = result.filter((t) => t.status === 'active')
      if (filter === 'completed')
        result = result.filter((t) => t.status === 'completed')
      result = filterTasksByQuery(result, query)
      return sortTasks(result, sort)
    },
    [tasks],
  )

  return {
    tasks,
    stats,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getFilteredTasks,
  }
}
