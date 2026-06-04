import { useState } from 'react'
import type { AppUser, Club } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SelectField, TextField } from '../../components/ui/FormControls'

interface ManageUsersPanelProps {
  users: AppUser[]
  clubs: Club[]
  onAddUser: (user: AppUser) => void
  onRemoveUser: (id: string) => void
}

function clubNameById(clubs: Club[], clubId?: string) {
  if (!clubId) return undefined
  return clubs.find((c) => c.id === clubId)?.name
}

export function ManageUsersPanel({ users, clubs, onAddUser, onRemoveUser }: ManageUsersPanelProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [handicapCount, setHandicapCount] = useState('')
  const [role, setRole] = useState<AppUser['role']>('player')
  const [clubId, setClubId] = useState('')

  const showClubField = role === 'clubadmin' || role === 'player'

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    const parsedHandicap = handicapCount.trim() === '' ? undefined : Number(handicapCount)
    if (parsedHandicap !== undefined && (Number.isNaN(parsedHandicap) || parsedHandicap < 0 || parsedHandicap > 54)) {
      return
    }

    onAddUser({
      id: `u-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
      ...(phone.trim() ? { phone: phone.trim() } : {}),
      ...(parsedHandicap !== undefined ? { handicapCount: parsedHandicap } : {}),
      ...(showClubField && clubId ? { clubId } : {}),
    })
    setName('')
    setEmail('')
    setPhone('')
    setHandicapCount('')
    setRole('player')
    setClubId('')
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
          <TextField
            id="user-phone"
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555-0100"
          />
          <TextField
            id="user-handicap"
            label="Handicap count"
            type="number"
            min={0}
            max={54}
            step={0.1}
            value={handicapCount}
            onChange={(e) => setHandicapCount(e.target.value)}
            hint="WHS handicap index (0–54). Leave blank if not applicable."
          />
          <SelectField
            id="user-role"
            label="Role"
            value={role}
            onChange={(e) => {
              const nextRole = e.target.value as AppUser['role']
              setRole(nextRole)
              if (nextRole === 'superadmin') setClubId('')
            }}
          >
            <option value="superadmin">Superadmin</option>
            <option value="clubadmin">Club Admin</option>
            <option value="player">Player</option>
          </SelectField>
          {showClubField && (
            <SelectField
              id="user-club"
              label="Club"
              value={clubId}
              onChange={(e) => setClubId(e.target.value)}
            >
              <option value="">No club assigned</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </SelectField>
          )}
          <div className="flex items-end md:col-span-2">
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </Card>

      <Card title="All Users" description={`${users.length} users on the platform.`}>
        <ul className="flex flex-col gap-2">
          {users.map((user) => {
            const clubName = clubNameById(clubs, user.clubId)
            return (
              <li
                key={user.id}
                className="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  {[user.phone, user.handicapCount, clubName].some(Boolean) && (
                    <p className="text-xs text-gray-500">
                      {[
                        user.phone,
                        user.handicapCount !== undefined ? `Handicap: ${user.handicapCount}` : null,
                        clubName ? `Club: ${clubName}` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
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
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
