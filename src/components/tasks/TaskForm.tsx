import { useState, type FormEvent } from 'react'
import type { Task, TaskFormData, TaskPriority } from '../../types/task'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

function taskToForm(task?: Task): TaskFormData {
  if (!task) {
    return { title: '', description: '', priority: 'medium', dueDate: '' }
  }
  return {
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate ?? '',
  }
}

interface TaskFormProps {
  task?: Task
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  submitLabel?: string
}

export function TaskForm({
  task,
  onSubmit,
  onCancel,
  submitLabel = 'Save task',
}: TaskFormProps) {
  return (
    <TaskFormInner
      key={task?.id ?? 'new'}
      initialForm={taskToForm(task)}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
    />
  )
}

function TaskFormInner({
  initialForm,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  initialForm: TaskFormData
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  submitLabel: string
}) {
  const [form, setForm] = useState<TaskFormData>(initialForm)
  const [titleError, setTitleError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setTitleError('Title is required')
      return
    }
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={form.title}
        onChange={(e) => {
          setForm((f) => ({ ...f, title: e.target.value }))
          if (titleError) setTitleError('')
        }}
        placeholder="What needs to be done?"
        error={titleError}
        autoFocus
      />
      <Textarea
        label="Description"
        value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        placeholder="Add details, links, or context..."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Priority"
          value={form.priority}
          onChange={(e) =>
            setForm((f) => ({ ...f, priority: e.target.value as TaskPriority }))
          }
          options={priorityOptions}
        />
        <Input
          label="Due date"
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
