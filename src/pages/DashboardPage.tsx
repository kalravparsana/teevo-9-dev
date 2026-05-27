import { AlertCircle, CheckCircle2, Circle, ListTodo } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTasksContext } from '../hooks/useTasksContext'
import { Button } from '../components/ui/Button'
import { formatDate } from '../lib/utils'

export function DashboardPage() {
  const { stats, tasks } = useTasksContext()
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const statCards = [
    {
      label: 'Total tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'text-primary bg-primary-muted',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: Circle,
      color: 'text-info bg-sky-50',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-success bg-emerald-50',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      color: 'text-error bg-red-50',
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Here&apos;s an overview of your workspace today.
          </p>
        </div>
        <Link to="/app/tasks">
          <Button>Manage tasks</Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-surface-elevated p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink-muted">{label}</p>
              <div className={`rounded-lg p-2 ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-ink">{value}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Recent activity</h2>
          <Link
            to="/app/tasks"
            className="text-sm font-medium text-primary hover:text-primary-hover"
          >
            View all
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-ink-muted">No tasks yet.</p>
            <Link to="/app/tasks" className="mt-4 inline-block">
              <Button size="sm">Create your first task</Button>
            </Link>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface-elevated">
            {recentTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p
                    className={`truncate font-medium ${
                      task.status === 'completed'
                        ? 'text-ink-muted line-through'
                        : 'text-ink'
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <p className="mt-0.5 text-xs text-ink-muted">
                      Due {formatDate(task.dueDate)}
                    </p>
                  )}
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                    task.status === 'completed'
                      ? 'bg-emerald-50 text-success'
                      : 'bg-primary-muted text-primary'
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
