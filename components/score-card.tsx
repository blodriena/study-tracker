'use client'

import { ArrowUp, ArrowDown, Minus } from 'lucide-react'

export interface ScoreCardProps {
  title: string
  score: number
  maxScore?: number
  subtitle?: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: number
}

export function ScoreCard({
  title,
  score,
  maxScore,
  subtitle,
  trend = 'stable',
  trendValue = 0,
}: ScoreCardProps) {
  const percentage = maxScore ? (score / maxScore) * 100 : score
  const displayScore = maxScore ? `${score}/${maxScore}` : score

  const trendColors = {
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400',
    stable: 'text-gray-600 dark:text-gray-400',
  }

  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{displayScore}</p>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {trendValue !== 0 && (
          <div className="flex items-center gap-1">
            <TrendIcon className={`h-5 w-5 ${trendColors[trend]}`} />
            <span className={`text-sm font-semibold ${trendColors[trend]}`}>{trendValue}%</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {maxScore && (
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      )}
    </div>
  )
}
