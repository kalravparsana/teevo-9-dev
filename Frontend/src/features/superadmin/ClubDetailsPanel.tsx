import { useState } from 'react'
import type { Club } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SelectField, TextField } from '../../components/ui/FormControls'

interface ClubDetailsPanelProps {
  clubs: Club[]
  onUpdateClub: (club: Club) => void
}

export function ClubDetailsPanel({ clubs, onUpdateClub }: ClubDetailsPanelProps) {
  const [selectedId, setSelectedId] = useState(clubs[0]?.id ?? '')
  const selected = clubs.find((c) => c.id === selectedId)

  const [name, setName] = useState(selected?.name ?? '')
  const [location, setLocation] = useState(selected?.location ?? '')
  const [holes, setHoles] = useState(String(selected?.holes ?? 18))
  const [saved, setSaved] = useState(false)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    const club = clubs.find((c) => c.id === id)
    if (club) {
      setName(club.name)
      setLocation(club.location)
      setHoles(String(club.holes))
      setSaved(false)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected) return
    onUpdateClub({
      ...selected,
      name: name.trim(),
      location: location.trim(),
      holes: Number(holes),
    })
    setSaved(true)
  }

  if (clubs.length === 0) {
    return (
      <Card title="Club Details">
        <p className="text-sm text-gray-600">No clubs yet. Add a club first.</p>
      </Card>
    )
  }

  return (
    <Card title="Configure Club Details" description="Edit settings for an existing club.">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <SelectField
          id="select-club"
          label="Select club"
          value={selectedId}
          onChange={(e) => handleSelect(e.target.value)}
        >
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </SelectField>
        <TextField id="edit-name" label="Club name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
          id="edit-location"
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <SelectField
          id="edit-holes"
          label="Holes"
          value={holes}
          onChange={(e) => setHoles(e.target.value)}
        >
          <option value="9">9</option>
          <option value="18">18</option>
          <option value="27">27</option>
        </SelectField>
        {selected && (
          <p className="text-sm text-gray-500">Members: {selected.memberCount}</p>
        )}
        {saved && <p className="text-sm text-green-700">Club details saved.</p>}
        <Button type="submit">Save Changes</Button>
      </form>
    </Card>
  )
}
