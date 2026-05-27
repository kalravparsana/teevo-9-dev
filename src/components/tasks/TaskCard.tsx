import { Calendar, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { formatDate, isOverdue } from '../../lib/utils'
import type { Task } from '../../types/task'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const overdue = isOverdue(task.dueDate, task.status)
  const completed = task.status === 'completed'

  return (
    <article
      className={`group relative rounded-xl border bg-surface-elevated p-4 shadow-sm transition-shadow hover:shadow-md ${
        completed ? 'border-border opacity-75' : 'border-border'
      }`}
    >
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            completed
              ? 'border-primary bg-primary text-white'
              : 'border-border-strong hover:border-primary'
          }`}
          aria-label={completed ? 'Mark as active' : 'Mark as complete'}
        >
          {completed && (
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M2.5 6l2.5 2.5 4.5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-medium text-ink ${
                completed ? 'line-through text-ink-muted' : ''
              }`}
            >
              {task.title}
            </h3>
            <div className="relative shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="!p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Task actions"
                aria-expanded={menuOpen}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden
                  />
                  <div
                    role="menu"
                    className="absolute right-0 z-20 mt-1 w-36 rounded-lg border border-border bg-surface-elevated py-1 shadow-lg"
                  >
                    <button
                      role="menuitem"
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-stone-50"
                      onClick={() => {
                        setMenuOpen(false)
                        onEdit(task)
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      role="menuitem"
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error hover:bg-red-50"
                      onClick={() => {
                        setMenuOpen(false)
                        onDelete(task.id)
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {task.description && (
            <p
              className={`mt-1 text-sm text-ink-muted line-clamp-2 ${
                completed ? 'line-through' : ''
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant={task.priority}>{task.priority}</Badge>
            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 text-xs ${
                  overdue ? 'font-medium text-error' : 'text-ink-muted'
                }`}
              >
                <Calendar className="h-3 w-3" />
                {formatDate(task.dueDate)}
                {overdue && ' · Overdue'}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
