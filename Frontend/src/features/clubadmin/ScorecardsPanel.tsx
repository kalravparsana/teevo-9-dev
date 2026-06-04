import type { Scorecard } from '../../data/mockData'
import { Card } from '../../components/ui/Card'

interface ScorecardsPanelProps {
  scorecards: Scorecard[]
}

export function ScorecardsPanel({ scorecards }: ScorecardsPanelProps) {
  return (
    <Card title="Scorecards" description="View submitted scorecards for club rounds and tournaments.">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600">
              <th className="pb-2 pr-4 font-medium">Player</th>
              <th className="pb-2 pr-4 font-medium">Course</th>
              <th className="pb-2 pr-4 font-medium">Date</th>
              <th className="pb-2 pr-4 font-medium">Gross</th>
              <th className="pb-2 font-medium">Net</th>
            </tr>
          </thead>
          <tbody>
            {scorecards.map((sc) => (
              <tr key={sc.id} className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium text-gray-900">{sc.playerName}</td>
                <td className="py-3 pr-4 text-gray-600">{sc.course}</td>
                <td className="py-3 pr-4 text-gray-600">{sc.date}</td>
                <td className="py-3 pr-4 text-gray-900">{sc.gross}</td>
                <td className="py-3 font-semibold text-green-700">{sc.net}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
