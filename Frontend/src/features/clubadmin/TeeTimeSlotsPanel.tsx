import { useState } from 'react'
import type { TeeTimeSlot } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SelectField, TextField } from '../../components/ui/FormControls'

interface TeeTimeSlotsPanelProps {
  slots: TeeTimeSlot[]
  onUpdateSlots: (slots: TeeTimeSlot[]) => void
}

export function TeeTimeSlotsPanel({ slots, onUpdateSlots }: TeeTimeSlotsPanelProps) {
  const [interval, setInterval] = useState('10')
  const [startTime, setStartTime] = useState('07:00')

  const toggleAvailability = (id: string) => {
    onUpdateSlots(
      slots.map((s) => (s.id === id ? { ...s, available: !s.available } : s)),
    )
  }

  const generateSlots = () => {
    const mins = Number(interval)
    const [h, m] = startTime.split(':').map(Number)
    const newSlots: TeeTimeSlot[] = []
    for (let i = 0; i < 6; i++) {
      const total = h * 60 + m + i * mins
      const hh = String(Math.floor(total / 60)).padStart(2, '0')
      const mm = String(total % 60).padStart(2, '0')
      newSlots.push({
        id: `gen-${i}-${Date.now()}`,
        time: `${hh}:${mm}`,
        intervalMinutes: mins,
        available: true,
      })
    }
    onUpdateSlots(newSlots)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Tee Time Configuration"
        description="Set slot intervals and generate tee times for the day."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <TextField
            id="start-time"
            label="First tee time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <SelectField
            id="interval"
            label="Interval (minutes)"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          >
            <option value="8">8 minutes</option>
            <option value="10">10 minutes</option>
            <option value="12">12 minutes</option>
            <option value="15">15 minutes</option>
          </SelectField>
          <div className="flex items-end">
            <Button type="button" onClick={generateSlots}>
              Generate Slots
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Today's Tee Times">
        <ul className="flex flex-col gap-2">
          {slots.map((slot) => (
            <li
              key={slot.id}
              className="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3"
            >
              <div>
                <p className="font-medium text-gray-900">{slot.time}</p>
                <p className="text-sm text-gray-500">Every {slot.intervalMinutes} min</p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-medium ${slot.available ? 'text-green-700' : 'text-gray-400'}`}
                >
                  {slot.available ? 'Available' : 'Booked'}
                </span>
                <Button variant="secondary" size="sm" onClick={() => toggleAvailability(slot.id)}>
                  Toggle
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
