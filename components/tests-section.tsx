'use client'

import { useState } from 'react'
import { Test, QuestionResult, TestAttempt } from '@/lib/types'
import { TestGrid } from './test-grid'
import { TestDetail } from './test-detail'
import { TestRunner } from './test-runner'
import { TestResults } from './test-results'
import { getRandomQuestions } from '@/lib/questions'
import { calculateWeightedScore } from '@/lib/scoring'
import { dataStore } from '@/lib/store'

export interface TestsSectionProps {
  tests: Test[]
  onTestsChange: (tests: Test[]) => void
}

type ViewMode = 'grid' | 'detail' | 'running' | 'results'

export function TestsSection({ tests, onTestsChange }: TestsSectionProps) {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null)
  const [filter, setFilter] = useState<'all' | 'IELTS' | 'SAT'>('all')
  const [skillFilter, setSkillFilter] = useState<string | undefined>(undefined)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [currentSection, setCurrentSection] = useState<string>('')
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([])
  const [currentAttempt, setCurrentAttempt] = useState<TestAttempt | null>(null)

  const handleStartTest = (testType: 'IELTS' | 'SAT', section: string) => {
    const questions = getRandomQuestions(testType, section, testType === 'IELTS' ? 10 : 15)
    setCurrentSection(section)
    setCurrentQuestions(questions)
    setViewMode('running')
  }

  const handleTestComplete = (results: QuestionResult[]) => {
    const testType = selectedTest?.testType || 'IELTS'
    const score = calculateWeightedScore(currentQuestions, results, testType as any)
    
    const attempt: TestAttempt = {
      id: Math.random().toString(),
      testType: testType as any,
      date: new Date(),
      skill: currentSection as any,
      score: score.score,
      maxScore: score.maxScore,
      accuracy: score.accuracy,
      questions: results,
      timeSpentSeconds: results.reduce((sum, r) => sum + r.timeSpentSeconds, 0),
    }

    setCurrentAttempt(attempt)
    
    // Save to store
    if (selectedTest) {
      const updatedTests = tests.map((t) =>
        t.id === selectedTest.id
          ? { ...t, attempts: [...t.attempts, attempt] }
          : t
      )
      onTestsChange(updatedTests)
      dataStore.saveTests(updatedTests)
    }
    
    setViewMode('results')
  }

  const handleRetakeTest = () => {
    const questions = getRandomQuestions(selectedTest?.testType || 'IELTS', currentSection, selectedTest?.testType === 'IELTS' ? 10 : 15)
    setCurrentQuestions(questions)
    setViewMode('running')
  }

  const handleDoneResults = () => {
    setViewMode('grid')
    setSelectedTest(null)
    setCurrentAttempt(null)
  }

  if (viewMode === 'running') {
    return (
      <TestRunner
        testType={selectedTest?.testType || 'IELTS'}
        section={currentSection}
        questions={currentQuestions}
        onComplete={handleTestComplete}
        onCancel={() => {
          setViewMode('grid')
          setSelectedTest(null)
        }}
      />
    )
  }

  if (viewMode === 'results' && currentAttempt) {
    return (
      <TestResults
        attempt={currentAttempt}
        questions={currentQuestions}
        onRetake={handleRetakeTest}
        onDone={handleDoneResults}
      />
    )
  }

  if (selectedTest) {
    return (
      <TestDetail
        test={selectedTest}
        onBack={() => setSelectedTest(null)}
        onStartTest={handleStartTest}
      />
    )
  }

  // Get unique skills
  const skills = Array.from(new Set(tests.map((t) => t.skill)))

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Test Type</label>
            <div className="mt-2 flex gap-2">
              {['all', 'IELTS', 'SAT'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    filter === type
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-card text-foreground hover:bg-secondary'
                  }`}
                >
                  {type === 'all' ? 'All Tests' : type}
                </button>
              ))}
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground">Skill</label>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setSkillFilter(undefined)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    skillFilter === undefined
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-card text-foreground hover:bg-secondary'
                  }`}
                >
                  All Skills
                </button>
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSkillFilter(skill)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      skillFilter === skill
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-card text-foreground hover:bg-secondary'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Test Grid */}
      <TestGrid
        tests={tests}
        onTestSelect={setSelectedTest}
        filter={filter}
        skillFilter={skillFilter}
      />
    </div>
  )
}
