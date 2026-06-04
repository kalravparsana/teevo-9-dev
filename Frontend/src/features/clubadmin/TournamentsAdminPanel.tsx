import { useState } from 'react'
import type { Tournament } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SelectField, TextField } from '../../components/ui/FormControls'

interface TournamentsAdminPanelProps {
  tournaments: Tournament[]
  onAddTournament: (t: Tournament) => void
  onRemoveTournament: (id: string) => void
}

export function TournamentsAdminPanel({
  tournaments,
  onAddTournament,
  onRemoveTournament,
}: TournamentsAdminPanelProps) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [format, setFormat] = useState('Stroke Play')
  const [maxPlayers, setMaxPlayers] = useState('32')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !date) return
    onAddTournament({
      id: `t-${Date.now()}`,
      name: name.trim(),
      clubName: 'Pine Valley Golf Club',
      date,
      format,
      spotsLeft: Number(maxPlayers),
      maxPlayers: Number(maxPlayers),
    })
    setName('')
    setDate('')
  }

  return (
    <div className="flex flex-col gap-4">
      <Card title="Create Tournament">
        <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
          <TextField id="t-name" label="Tournament name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField id="t-date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <SelectField id="t-format" label="Format" value={format} onChange={(e) => setFormat(e.target.value)}>
            <option>Stroke Play</option>
            <option>Scramble</option>
            <option>Match Play</option>
          </SelectField>
          <TextField
            id="t-max"
            label="Max players"
            type="number"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
          />
          <div className="flex items-end md:col-span-2">
            <Button type="submit">Create Tournament</Button>
          </div>
        </form>
      </Card>

      <Card title="Managed Tournaments">
        <ul className="flex flex-col gap-2">
          {tournaments.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3"
            >
              <div>
                <p className="font-medium text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">
                  {t.date} · {t.format} · {t.maxPlayers - t.spotsLeft}/{t.maxPlayers} registered
                </p>
              </div>
              <Button variant="danger" size="sm" onClick={() => onRemoveTournament(t.id)}>
                Cancel
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
