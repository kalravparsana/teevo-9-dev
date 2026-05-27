import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DeleteConfirmModal } from '../components/tasks/DeleteConfirmModal'
import { TaskFilters } from '../components/tasks/TaskFilters'
import { TaskForm } from '../components/tasks/TaskForm'
import { TaskList } from '../components/tasks/TaskList'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { useTasksContext } from '../hooks/useTasksContext'
import type { Task, TaskFilter, TaskFormData, TaskSort } from '../types/task'

export function TasksPage() {
  const { tasks, stats, createTask, updateTask, deleteTask, toggleTaskStatus, getFilteredTasks } =
    useTasksContext()

  const [filter, setFilter] = useState<TaskFilter>('all')
  const [sort, setSort] = useState<TaskSort>('updated')
  const [query, setQuery] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  const filteredTasks = useMemo(
    () => getFilteredTasks(filter, sort, query),
    [getFilteredTasks, filter, sort, query],
  )

  const counts = {
    all: tasks.length,
    active: stats.active,
    completed: stats.completed,
  }

  const hasFilters = filter !== 'all' || query.trim().length > 0

  const handleCreate = (data: TaskFormData) => {
    createTask(data)
    setCreateOpen(false)
  }

  const handleUpdate = (data: TaskFormData) => {
    if (!editingTask) return
    updateTask(editingTask.id, data)
    setEditingTask(null)
  }

  const handleDelete = () => {
    if (!deletingTask) return
    deleteTask(deletingTask.id)
    setDeletingTask(null)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Tasks</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Create, update, and track everything in your workspace.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          New task
        </Button>
      </div>

      <div className="mt-8">
        <TaskFilters
          filter={filter}
          sort={sort}
          query={query}
          counts={counts}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onQueryChange={setQuery}
        />
      </div>

      <div className="mt-6">
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTaskStatus}
          onEdit={setEditingTask}
          onDelete={(id) => {
            const task = tasks.find((t) => t.id === id)
            if (task) setDeletingTask(task)
          }}
          onCreateClick={() => setCreateOpen(true)}
          hasFilters={hasFilters}
        />
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create task">
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          submitLabel="Create task"
        />
      </Modal>

      <Modal
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit task"
      >
        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={handleUpdate}
            onCancel={() => setEditingTask(null)}
            submitLabel="Save changes"
          />
        )}
      </Modal>

      <DeleteConfirmModal
        open={!!deletingTask}
        taskTitle={deletingTask?.title ?? ''}
        onConfirm={handleDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  )
}
