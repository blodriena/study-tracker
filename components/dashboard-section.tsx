'use client'

import { Test } from '@/lib/types'
import { dataStore } from '@/lib/store'
import { ScoreCard } from './score-card'
import { TrendChart, TrendDataPoint } from './trend-chart'
import { AccuracyBreakdown } from './accuracy-breakdown'
import { WeakAreas } from './weak-areas'

export interface DashboardSectionProps {
  tests: Test[]
}

export function DashboardSection({ tests }: DashboardSectionProps) {
  // Calculate overall stats
  const allAttempts = tests.flatMap((t) => t.attempts)
  const latestScores = tests.reduce(
    (acc, test) => {
      if (test.attempts.length > 0) {
        const latest = test.attempts[test.attempts.length - 1]
        acc[test.testType] = {
          score: latest.score,
          maxScore: latest.maxScore,
          accuracy: latest.accuracy,
        }
      }
      return acc
    },
    {} as Record<string, { score: number; maxScore: number; accuracy: number }>,
  )

  // Calculate trend data for charts
  const trendData: TrendDataPoint[] = allAttempts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((attempt, index) => ({
      date: new Date(attempt.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      score: attempt.score,
      accuracy: attempt.accuracy,
    }))

  // Calculate accuracy by skill
  const skillAccuracy = tests.reduce(
    (acc, test) => {
      if (!acc[test.skill]) {
        acc[test.skill] = { correct: 0, total: 0 }
      }
      test.attempts.forEach((attempt) => {
        attempt.questions.forEach((q) => {
          acc[test.skill].total++
          if (q.correct) acc[test.skill].correct++
        })
      })
      return acc
    },
    {} as Record<string, { correct: number; total: number }>,
  )

  const accuracyData = Object.entries(skillAccuracy).map(([skill, stats]) => ({
    name: skill,
    accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
  }))

  // Get weak areas
  const weakAreas = dataStore.calculateWeakAreas(tests)

  // Calculate trending
  const ieltsScores = latestScores['IELTS']
  const satScores = latestScores['SAT']

  // Calculate average accuracy
  const avgAccuracy =
    allAttempts.length > 0 ? allAttempts.reduce((sum, a) => sum + a.accuracy, 0) / allAttempts.length : 0

  // Calculate total questions answered
  const totalQuestions = allAttempts.reduce((sum, a) => sum + a.questions.length, 0)

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ScoreCard
          title="Average Accuracy"
          score={avgAccuracy.toFixed(1)}
          maxScore={100}
          subtitle="All tests"
        />
        <ScoreCard
          title="Total Attempts"
          score={allAttempts.length}
          subtitle="Practice sessions"
        />
        <ScoreCard
          title="Questions Answered"
          score={totalQuestions}
          subtitle="Total questions"
        />
        <ScoreCard
          title="Active Tests"
          score={tests.length}
          subtitle="Different test types"
        />
      </div>

      {/* Latest Scores */}
      <div className="grid gap-4 md:grid-cols-2">
        {ieltsScores && (
          <ScoreCard
            title="Latest IELTS Score"
            score={ieltsScores.score}
            maxScore={ieltsScores.maxScore}
            subtitle={`${ieltsScores.accuracy.toFixed(1)}% accuracy`}
            trend="up"
            trendValue={5}
          />
        )}
        {satScores && (
          <ScoreCard
            title="Latest SAT Score"
            score={satScores.score}
            maxScore={satScores.maxScore}
            subtitle={`${satScores.accuracy.toFixed(1)}% accuracy`}
            trend="up"
            trendValue={3}
          />
        )}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TrendChart data={trendData} title="Score & Accuracy Trend" />
        <AccuracyBreakdown data={accuracyData} title="Accuracy by Skill" />
      </div>

      {/* Weak Areas */}
      <WeakAreas areas={weakAreas} />
    </div>
  )
}
