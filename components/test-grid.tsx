'use client'

import { Test } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { BookOpen, ChevronRight } from 'lucide-react'

export interface TestGridProps {
  tests: Test[]
  onTestSelect: (test: Test) => void
  filter?: 'all' | 'IELTS' | 'SAT'
  skillFilter?: string
}

export function TestGrid({ tests, onTestSelect, filter = 'all', skillFilter }: TestGridProps) {
  const filteredTests = tests.filter((test) => {
    if (filter !== 'all' && test.testType !== filter) return false
    if (skillFilter && test.skill !== skillFilter) return false
    return true
  })

  if (filteredTests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12">
        <BookOpen className="h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-center text-muted-foreground">
          {filter === 'all' ? 'No tests available' : `No ${filter} tests found`}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredTests.map((test) => (
        <Card
          key={test.id}
          className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
          onClick={() => onTestSelect(test)}
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
            {/* Test type badge */}
            <div className="mb-3 inline-block">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  test.testType === 'IELTS'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                }`}
              >
                {test.testType}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-foreground">{test.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{test.description}</p>

            {/* Skills and attempts */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Skill</p>
                <p className="font-medium text-foreground">{test.skill}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Attempts</p>
                <p className="text-lg font-bold text-primary">{test.attempts.length}</p>
              </div>
            </div>

            {/* Latest score */}
            {test.attempts.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">Latest Score</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-primary">
                    {test.attempts[test.attempts.length - 1].score}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    /{test.attempts[test.attempts.length - 1].maxScore}
                  </p>
                </div>
              </div>
            )}

            {/* Action button */}
            <button className="mt-4 flex w-full items-center justify-between rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              View Details
              <ChevronRight size={16} />
            </button>
          </div>
        </Card>
      ))}
    </div>
  )
}
