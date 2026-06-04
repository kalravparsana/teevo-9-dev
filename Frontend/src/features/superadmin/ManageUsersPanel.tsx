import { useState } from 'react'
import type { AppUser } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SelectField, TextField } from '../../components/ui/FormControls'

interface ManageUsersPanelProps {
  users: AppUser[]
  onAddUser: (user: AppUser) => void
  onRemoveUser: (id: string) => void
}

export function ManageUsersPanel({ users, onAddUser, onRemoveUser }: ManageUsersPanelProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<AppUser['role']>('player')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    onAddUser({
      id: `u-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
    })
    setName('')
    setEmail('')
    setRole('player')
  }

  return (
    <div className="flex flex-col gap-4">
      <Card title="Add User" description="Create accounts for club admins and players.">
        <form onSubmit={handleAdd} className="grid gap-4 md:grid-cols-2">
          <TextField
            id="user-name"
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            id="user-email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SelectField
            id="user-role"
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value as AppUser['role'])}
          >
            <option value="superadmin">Superadmin</option>
            <option value="clubadmin">Club Admin</option>
            <option value="player">Player</option>
          </SelectField>
          <div className="flex items-end">
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </Card>

      <Card title="All Users" description={`${users.length} users on the platform.`}>
        <ul className="flex flex-col gap-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3"
            >
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {user.role}
                </span>
                <Button variant="danger" size="sm" onClick={() => onRemoveUser(user.id)}>
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
