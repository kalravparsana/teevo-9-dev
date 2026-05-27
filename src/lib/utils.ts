import { clsx, type ClassValue } from 'clsx'
import type { Task, TaskPriority, TaskSort } from '../types/task'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function generateId(): string {
  return crypto.randomUUID()
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isOverdue(dueDate: string | null, status: Task['status']): boolean {
  if (!dueDate || status === 'completed') return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate) < today
}

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export function sortTasks(tasks: Task[], sort: TaskSort): Task[] {
  return [...tasks].sort((a, b) => {
    switch (sort) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'dueDate': {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
      case 'priority':
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      case 'updated':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
  })
}

export function filterTasksByQuery(tasks: Task[], query: string): Task[] {
  const q = query.trim().toLowerCase()
  if (!q) return tasks
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q),
  )
}
