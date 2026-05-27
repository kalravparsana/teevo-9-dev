import { ClipboardList } from 'lucide-react'
import type { Task } from '../../types/task'
import { EmptyState } from '../ui/EmptyState'
import { Button } from '../ui/Button'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onCreateClick: () => void
  hasFilters: boolean
}

export function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onCreateClick,
  hasFilters,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<ClipboardList className="h-6 w-6" />}
        title={hasFilters ? 'No matching tasks' : 'No tasks yet'}
        description={
          hasFilters
            ? 'Try adjusting your search or filters to find what you need.'
            : 'Create your first task to start organizing your work.'
        }
        action={
          !hasFilters ? (
            <Button onClick={onCreateClick}>Create task</Button>
          ) : undefined
        }
      />
    )
  }

  return (
    <ul className="space-y-3" aria-label="Task list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  )
}
