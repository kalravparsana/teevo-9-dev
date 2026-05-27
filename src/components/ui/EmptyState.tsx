import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-elevated/50 px-8 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-muted text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
