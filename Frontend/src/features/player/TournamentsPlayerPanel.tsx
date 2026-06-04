import { useState } from 'react'
import type { Tournament } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

interface TournamentsPlayerPanelProps {
  tournaments: Tournament[]
  bookedIds: Set<string>
  onBook: (id: string) => void
}

export function TournamentsPlayerPanel({
  tournaments,
  bookedIds,
  onBook,
}: TournamentsPlayerPanelProps) {
  const [bookedMessage, setBookedMessage] = useState('')

  const handleBook = (t: Tournament) => {
    if (t.spotsLeft <= 0) return
    onBook(t.id)
    setBookedMessage(`Registered for ${t.name}!`)
    setTimeout(() => setBookedMessage(''), 3000)
  }

  return (
    <div className="flex flex-col gap-4">
      {bookedMessage && (
        <p className="rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm text-green-800">
          {bookedMessage}
        </p>
      )}
      <Card title="Upcoming Tournaments" description="Book your spot in open tournaments.">
        <ul className="flex flex-col gap-4">
          {tournaments.map((t) => {
            const booked = bookedIds.has(t.id)
            const full = t.spotsLeft <= 0
            return (
              <li
                key={t.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.clubName}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {t.date} · {t.format}
                  </p>
                  <p className="mt-1 text-xs font-medium text-green-700">
                    {full ? 'Full' : `${t.spotsLeft} spots left`}
                  </p>
                </div>
                <Button
                  disabled={booked || full}
                  variant={booked ? 'secondary' : 'primary'}
                  onClick={() => handleBook(t)}
                >
                  {booked ? 'Booked' : full ? 'Full' : 'Book Spot'}
                </Button>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
