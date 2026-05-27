import type { Task } from '../types/task'

const now = new Date()
const daysAgo = (n: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() - n)
  return d.toISOString()
}
const daysAhead = (n: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Review quarterly goals',
    description: 'Align team objectives with company priorities for Q2.',
    priority: 'high',
    status: 'active',
    dueDate: daysAhead(2),
    createdAt: daysAgo(5),
    updatedAt: daysAgo(1),
  },
  {
    id: '2',
    title: 'Prepare client presentation',
    description: 'Finalize slides and talking points for Thursday meeting.',
    priority: 'high',
    status: 'active',
    dueDate: daysAhead(4),
    createdAt: daysAgo(3),
    updatedAt: daysAgo(0),
  },
  {
    id: '3',
    title: 'Update project documentation',
    description: 'Refresh onboarding guides and workflow diagrams.',
    priority: 'medium',
    status: 'active',
    dueDate: daysAhead(7),
    createdAt: daysAgo(10),
    updatedAt: daysAgo(2),
  },
  {
    id: '4',
    title: 'Schedule team sync',
    description: 'Book recurring weekly standup for the product group.',
    priority: 'low',
    status: 'completed',
    dueDate: daysAhead(-1),
    createdAt: daysAgo(14),
    updatedAt: daysAgo(3),
  },
  {
    id: '5',
    title: 'Organize shared drive',
    description: 'Archive outdated files and standardize folder structure.',
    priority: 'medium',
    status: 'completed',
    dueDate: null,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(7),
  },
]
