import type { GameBooking } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

interface GameBookingsPanelProps {
  bookings: GameBooking[]
  onUpdateStatus: (id: string, status: GameBooking['status']) => void
}

const statusColors: Record<GameBooking['status'], string> = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-gray-100 text-gray-600',
}

export function GameBookingsPanel({ bookings, onUpdateStatus }: GameBookingsPanelProps) {
  return (
    <Card title="Game Bookings" description="Review and manage tee time reservations.">
      <ul className="flex flex-col gap-2">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white px-4 py-3"
          >
            <div>
              <p className="font-medium text-gray-900">{booking.playerName}</p>
              <p className="text-sm text-gray-500">
                {booking.date} at {booking.teeTime} · {booking.players} players
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[booking.status]}`}>
                {booking.status}
              </span>
              {booking.status === 'pending' && (
                <>
                  <Button size="sm" onClick={() => onUpdateStatus(booking.id, 'confirmed')}>
                    Confirm
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => onUpdateStatus(booking.id, 'cancelled')}>
                    Decline
                  </Button>
                </>
              )}
              {booking.status === 'confirmed' && (
                <Button variant="secondary" size="sm" onClick={() => onUpdateStatus(booking.id, 'cancelled')}>
                  Cancel
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
