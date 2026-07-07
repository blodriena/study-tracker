'use client'

import { WeakArea } from '@/lib/types'
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface WeakAreasProps {
  areas: WeakArea[]
}

export function WeakAreas({ areas }: WeakAreasProps) {
  const weakAreas = areas.filter((a) => a.accuracy < 75).sort((a, b) => a.accuracy - b.accuracy)

  if (weakAreas.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <AlertCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          Weak Areas
        </h3>
        <p className="text-center text-muted-foreground">
          Great job! No significant weak areas detected.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        Areas for Improvement
      </h3>

      <div className="space-y-3">
        {weakAreas.map((area) => (
          <div key={area.skill} className="flex items-center justify-between rounded-lg bg-secondary/30 p-4">
            <div className="flex-1">
              <p className="font-medium text-foreground">{area.skill}</p>
              <p className="text-sm text-muted-foreground">
                {area.correctQuestions}/{area.totalQuestions} correct
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{area.accuracy.toFixed(1)}%</p>
                <div
                  className={`mt-1 flex items-center gap-1 text-sm font-semibold ${
                    area.trend === 'improving'
                      ? 'text-green-600 dark:text-green-400'
                      : area.trend === 'declining'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {area.trend === 'improving' ? (
                    <>
                      <TrendingUp size={16} />
                      Improving
                    </>
                  ) : area.trend === 'declining' ? (
                    <>
                      <TrendingDown size={16} />
                      Declining
                    </>
                  ) : (
                    <>
                      <Minus size={16} />
                      Stable
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
