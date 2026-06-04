import type { LeaderboardEntry } from '../../data/mockData'
import { Card } from '../../components/ui/Card'

interface LeaderboardPanelProps {
  entries: LeaderboardEntry[]
}

export function LeaderboardPanel({ entries }: LeaderboardPanelProps) {
  const sorted = [...entries].sort((a, b) => a.rank - b.rank)

  return (
    <Card title="Tournament Leaderboard" description="Top scores across recent tournaments.">
      <ol className="flex flex-col gap-2">
        {sorted.map((entry) => (
          <li
            key={`${entry.rank}-${entry.playerName}`}
            className="flex items-center gap-4 rounded-lg border border-gray-300 bg-white px-4 py-3"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                entry.rank === 1
                  ? 'bg-green-700 text-white'
                  : entry.rank <= 3
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              {entry.rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900">{entry.playerName}</p>
              <p className="text-sm text-gray-500">{entry.tournamentName}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-green-700">{entry.score}</p>
              <p className="text-xs text-gray-500">Par {entry.par}</p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  )
}
