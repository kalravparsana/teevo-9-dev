import { useState } from 'react'
import type { Club } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SelectField, TextAreaField, TextField } from '../../components/ui/FormControls'

interface AddClubFormProps {
  onAddClub: (club: Club) => void
}

export function AddClubForm({ onAddClub }: AddClubFormProps) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [holes, setHoles] = useState('18')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !location.trim()) {
      setMessage('Club name and location are required.')
      return
    }
    onAddClub({
      id: `club-${Date.now()}`,
      name: name.trim(),
      location: location.trim(),
      holes: Number(holes),
      memberCount: 0,
    })
    setName('')
    setLocation('')
    setHoles('18')
    setMessage('Club added successfully.')
  }

  return (
    <Card title="Add New Club" description="Register a golf club on the platform.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-testid="add-club-form">
        <TextField
          id="club-name"
          label="Club name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Pine Valley Golf Club"
          required
        />
        <TextField
          id="club-location"
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, Country"
          required
        />
        <SelectField
          id="club-holes"
          label="Number of holes"
          value={holes}
          onChange={(e) => setHoles(e.target.value)}
        >
          <option value="9">9 holes</option>
          <option value="18">18 holes</option>
          <option value="27">27 holes</option>
        </SelectField>
        <TextAreaField
          id="club-notes"
          label="Notes (optional)"
          placeholder="Course description, amenities..."
        />
        {message && (
          <p
            role="status"
            data-testid="add-club-message"
            className={`text-sm ${message.includes('success') ? 'text-green-700' : 'text-red-600'}`}
          >
            {message}
          </p>
        )}
        <Button type="submit">Add Club</Button>
      </form>
    </Card>
  )
}
