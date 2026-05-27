import { Search } from 'lucide-react'
import type { TaskFilter, TaskSort } from '../../types/task'
import { cn } from '../../lib/utils'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

const filterTabs: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

const sortOptions = [
  { value: 'updated', label: 'Recently updated' },
  { value: 'dueDate', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
]

interface TaskFiltersProps {
  filter: TaskFilter
  sort: TaskSort
  query: string
  counts: { all: number; active: number; completed: number }
  onFilterChange: (filter: TaskFilter) => void
  onSortChange: (sort: TaskSort) => void
  onQueryChange: (query: string) => void
}

export function TaskFilters({
  filter,
  sort,
  query,
  counts,
  onFilterChange,
  onSortChange,
  onQueryChange,
}: TaskFiltersProps) {
  const countMap = {
    all: counts.all,
    active: counts.active,
    completed: counts.completed,
  }

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Filter tasks"
        className="flex gap-1 rounded-xl border border-border bg-surface-elevated p-1"
      >
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={filter === tab.value}
            type="button"
            onClick={() => onFilterChange(tab.value)}
            className={cn(
              'flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:flex-none sm:px-4',
              filter === tab.value
                ? 'bg-primary text-white shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-stone-50',
            )}
          >
            {tab.label}
            <span
              className={cn(
                'ml-1.5 tabular-nums',
                filter === tab.value ? 'text-teal-100' : 'text-ink-subtle',
              )}
            >
              {countMap[tab.value]}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle"
            aria-hidden
          />
          <Input
            aria-label="Search tasks"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search tasks..."
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            aria-label="Sort tasks"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as TaskSort)}
            options={sortOptions}
          />
        </div>
      </div>
    </div>
  )
}
