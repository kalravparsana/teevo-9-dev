import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { TextField } from '../../components/ui/FormControls'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

interface DayHours {
  open: string
  close: string
  closed: boolean
}

export function OperatingHoursPanel() {
  const [hours, setHours] = useState<Record<string, DayHours>>(
    Object.fromEntries(
      DAYS.map((day) => [
        day,
        {
          open: day === 'Sunday' ? '08:00' : '06:30',
          close: day === 'Sunday' ? '18:00' : '20:00',
          closed: false,
        },
      ]),
    ),
  )
  const [saved, setSaved] = useState(false)

  const updateDay = (day: string, patch: Partial<DayHours>) => {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }))
    setSaved(false)
  }

  const handleSave = () => setSaved(true)

  return (
    <Card title="Club Operating Hours" description="Set open and close times for each day of the week.">
      <ul className="flex flex-col gap-4">
        {DAYS.map((day) => (
          <li
            key={day}
            className="grid items-center gap-4 rounded-lg border border-gray-300 bg-white p-4 md:grid-cols-4"
          >
            <span className="font-medium text-gray-900">{day}</span>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={hours[day].closed}
                onChange={(e) => updateDay(day, { closed: e.target.checked })}
                className="h-4 w-4 text-green-700"
              />
              Closed
            </label>
            <TextField
              id={`${day}-open`}
              label="Opens"
              type="time"
              value={hours[day].open}
              onChange={(e) => updateDay(day, { open: e.target.value })}
              disabled={hours[day].closed}
            />
            <TextField
              id={`${day}-close`}
              label="Closes"
              type="time"
              value={hours[day].close}
              onChange={(e) => updateDay(day, { close: e.target.value })}
              disabled={hours[day].closed}
            />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-4">
        <Button type="button" onClick={handleSave}>
          Save Hours
        </Button>
        {saved && <p className="text-sm text-green-700">Operating hours updated.</p>}
      </div>
    </Card>
  )
}
