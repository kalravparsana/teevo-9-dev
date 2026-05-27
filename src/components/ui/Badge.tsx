import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import type { TaskPriority } from '../../types/task'

const priorityStyles: Record<TaskPriority, string> = {
  low: 'bg-stone-100 text-stone-600',
  medium: 'bg-amber-50 text-warning',
  high: 'bg-red-50 text-error',
}

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | TaskPriority
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize',
        variant === 'default' ? 'bg-primary-muted text-primary' : priorityStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
