export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'active' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string | null
  createdAt: string
  updatedAt: string
}

export type TaskFilter = 'all' | 'active' | 'completed'
export type TaskSort = 'updated' | 'dueDate' | 'priority' | 'title'

export interface TaskFormData {
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
}
