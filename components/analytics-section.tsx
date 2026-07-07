'use client'

import { Test } from '@/lib/types'
import { dataStore } from '@/lib/store'
import { ScoreCard } from './score-card'
import { TrendChart, TrendDataPoint } from './trend-chart'
import { AccuracyBreakdown } from './accuracy-breakdown'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'

export interface AnalyticsSectionProps {
  tests: Test[]
}

export function AnalyticsSection({ tests }: AnalyticsSectionProps) {
  const allAttempts = tests.flatMap((t) => t.attempts)

  // Test type distribution
  const testTypeStats = allAttempts.reduce(
    (acc, attempt) => {
      acc[attempt.testType] = (acc[attempt.testType] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const testTypeData = Object.entries(testTypeStats).map(([name, value]) => ({
    name,
    value,
  }))

  // Difficulty breakdown
  const difficultyStats = allAttempts.reduce(
    (acc, attempt) => {
      attempt.questions.forEach((q) => {
        if (!acc[q.difficulty]) {
          acc[q.difficulty] = { correct: 0, total: 0 }
        }
        acc[q.difficulty].total++
        if (q.correct) {
          acc[q.difficulty].correct++
        }
      })
      return acc
    },
    {} as Record<string, { correct: number; total: number }>,
  )

  const difficultyData = Object.entries(difficultyStats).map(([name, stats]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
  }))

  // Timeline data
  const trendData: TrendDataPoint[] = allAttempts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((attempt) => ({
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

  const skillData = Object.entries(skillAccuracy).map(([skill, stats]) => ({
    name: skill,
    accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
  }))

  const colors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)']

  // Weak areas
  const weakAreas = dataStore.calculateWeakAreas(tests)
  const topWeakAreas = weakAreas.filter((a) => a.accuracy < 75).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3)

  // Statistics
  const totalAttempts = allAttempts.length
  const totalQuestions = allAttempts.reduce((sum, a) => sum + a.questions.length, 0)
  const totalCorrect = allAttempts.reduce((sum, a) => sum + a.questions.filter((q) => q.correct).length, 0)
  const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Key Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ScoreCard title="Total Attempts" score={totalAttempts} subtitle="Practice tests" />
        <ScoreCard
          title="Overall Accuracy"
          score={overallAccuracy.toFixed(1)}
          maxScore={100}
          subtitle="All questions"
        />
        <ScoreCard title="Questions Answered" score={totalQuestions} subtitle="Total questions" />
        <ScoreCard
          title="Correct Answers"
          score={totalCorrect}
          subtitle={`${((totalCorrect / totalQuestions) * 100).toFixed(1)}% correct`}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Score Trend */}
        {trendData.length > 0 && <TrendChart data={trendData} title="Overall Score Trend" />}

        {/* Test Type Distribution */}
        {testTypeData.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Test Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={testTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {testTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Accuracy by Skill */}
      {skillData.length > 0 && <AccuracyBreakdown data={skillData} title="Accuracy by Skill (All Tests)" />}

      {/* Difficulty Breakdown */}
      {difficultyData.length > 0 && (
        <AccuracyBreakdown data={difficultyData} title="Accuracy by Question Difficulty" />
      )}

      {/* Top Weak Areas */}
      {topWeakAreas.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Top Areas for Improvement</h3>
          <div className="space-y-3">
            {topWeakAreas.map((area) => (
              <div key={area.skill} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{area.skill}</p>
                  <p className="text-sm text-muted-foreground">
                    {area.correctQuestions}/{area.totalQuestions} correct ({area.trend})
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {area.accuracy.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
