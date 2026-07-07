'use client'

import { Test } from '@/lib/types'
import { ArrowLeft } from 'lucide-react'
import { ScoreCard } from './score-card'
import { TrendChart, TrendDataPoint } from './trend-chart'

export interface TestDetailProps {
  test: Test
  onBack: () => void
  onStartTest?: (testType: 'IELTS' | 'SAT', section: string) => void
}

import { Button } from './ui/button'
import { PlayCircle } from 'lucide-react'

export function TestDetail({ test, onBack, onStartTest }: TestDetailProps) {
  const attempts = test.attempts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const trendData: TrendDataPoint[] = attempts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((attempt) => ({
      date: new Date(attempt.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      score: attempt.score,
      accuracy: attempt.accuracy,
    }))

  const avgScore = attempts.length > 0 ? attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length : 0
  const avgAccuracy = attempts.length > 0 ? attempts.reduce((sum, a) => sum + a.accuracy, 0) / attempts.length : 0
  const maxScore = attempts.reduce((max, a) => Math.max(max, a.score), 0)
  const minScore = attempts.reduce((min, a) => Math.min(min, a.score), Infinity)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="rounded-lg p-2 hover:bg-secondary"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  test.testType === 'IELTS'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                }`}
              >
                {test.testType}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-foreground">
                {test.skill}
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-bold text-foreground">{test.name}</h1>
            <p className="mt-1 text-muted-foreground">{test.description}</p>
          </div>
        </div>
        {onStartTest && (
          <Button
            onClick={() => onStartTest(test.testType, test.skill)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <PlayCircle className="h-4 w-4" />
            Start Test
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ScoreCard title="Average Score" score={avgScore.toFixed(1)} subtitle={`${attempts.length} attempts`} />
        <ScoreCard title="Best Score" score={maxScore} subtitle="Peak performance" />
        <ScoreCard title="Lowest Score" score={minScore} subtitle="Initial attempt" />
        <ScoreCard
          title="Average Accuracy"
          score={avgAccuracy.toFixed(1)}
          maxScore={100}
          subtitle="Across all attempts"
        />
      </div>

      {/* Trend Chart */}
      {trendData.length > 0 && <TrendChart data={trendData} title="Attempt Progress" />}

      {/* Attempts History */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Attempt History</h3>

        {attempts.length === 0 ? (
          <p className="text-muted-foreground">No attempts yet for this test.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Score</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Accuracy</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Duration</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Questions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attempts.map((attempt, index) => (
                  <tr key={attempt.id} className="hover:bg-secondary/30">
                    <td className="px-4 py-3 text-sm text-foreground">
                      {new Date(attempt.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="font-bold text-primary">
                        {attempt.score}/{attempt.maxScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-foreground">
                        {attempt.accuracy.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {Math.round(attempt.timeSpentSeconds / 60)} min
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{attempt.questions.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
