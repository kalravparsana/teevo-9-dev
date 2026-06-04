import { useState } from 'react'
import type { Club } from '../../data/mockData'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

interface ClubsListPanelProps {
  clubs: Club[]
  joinedClubIds: Set<string>
  onJoinClub: (clubId: string) => void
}

export function ClubsListPanel({ clubs, joinedClubIds, onJoinClub }: ClubsListPanelProps) {
  const [query, setQuery] = useState('')

  const filtered = clubs.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.location.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Card title="Golf Clubs" description="Browse clubs and join to access tee times and tournaments.">
      <input
        type="search"
        placeholder="Search clubs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
      />
      <ul className="flex flex-col gap-4">
        {filtered.map((club) => {
          const joined = joinedClubIds.has(club.id)
          return (
            <li
              key={club.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4"
            >
              <div>
                <p className="font-semibold text-gray-900">{club.name}</p>
                <p className="text-sm text-gray-500">{club.location}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {club.holes} holes · {club.memberCount} members
                </p>
              </div>
              <Button
                variant={joined ? 'secondary' : 'primary'}
                disabled={joined}
                onClick={() => onJoinClub(club.id)}
              >
                {joined ? 'Joined' : 'Join Club'}
              </Button>
            </li>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">No clubs match your search.</p>
        )}
      </ul>
    </Card>
  )
}
