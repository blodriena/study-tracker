'use client'

import { Test, TestAttempt, StudyGoal, WeakArea, Skill } from './types'

const STORAGE_KEYS = {
  TESTS: 'study_hub_tests',
  GOALS: 'study_hub_goals',
}

class DataStore {
  // Initialize with sample data for demo
  private getSampleData(): Test[] {
    const now = new Date()
    return [
      {
        id: '1',
        name: 'IELTS Practice Test 1',
        testType: 'IELTS',
        skill: 'Reading',
        description: 'Full practice test focusing on reading comprehension',
        createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        attempts: [
          {
            id: '1-1',
            testType: 'IELTS',
            date: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
            skill: 'Reading',
            score: 28,
            maxScore: 40,
            accuracy: 70,
            questions: Array.from({ length: 40 }, (_, i) => ({
              id: `q${i}`,
              skill: 'Reading',
              correct: Math.random() > 0.3,
              difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
            })),
            timeSpentSeconds: 3600,
          },
          {
            id: '1-2',
            testType: 'IELTS',
            date: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
            skill: 'Reading',
            score: 32,
            maxScore: 40,
            accuracy: 80,
            questions: Array.from({ length: 40 }, (_, i) => ({
              id: `q${i}`,
              skill: 'Reading',
              correct: Math.random() > 0.2,
              difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
            })),
            timeSpentSeconds: 3300,
          },
          {
            id: '1-3',
            testType: 'IELTS',
            date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
            skill: 'Reading',
            score: 35,
            maxScore: 40,
            accuracy: 87.5,
            questions: Array.from({ length: 40 }, (_, i) => ({
              id: `q${i}`,
              skill: 'Reading',
              correct: Math.random() > 0.125,
              difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
            })),
            timeSpentSeconds: 3100,
          },
        ],
      },
      {
        id: '2',
        name: 'IELTS Practice Test 2',
        testType: 'IELTS',
        skill: 'Writing',
        description: 'Writing task practice and evaluation',
        createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
        attempts: [
          {
            id: '2-1',
            testType: 'IELTS',
            date: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000),
            skill: 'Writing',
            score: 6,
            maxScore: 9,
            accuracy: 66.7,
            questions: Array.from({ length: 2 }, (_, i) => ({
              id: `q${i}`,
              skill: 'Writing',
              correct: i === 0,
              difficulty: 'hard' as const,
            })),
            timeSpentSeconds: 3600,
          },
        ],
      },
      {
        id: '3',
        name: 'SAT Math Practice',
        testType: 'SAT',
        skill: 'Math',
        description: 'SAT Math section practice',
        createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        attempts: [
          {
            id: '3-1',
            testType: 'SAT',
            date: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
            skill: 'Math',
            score: 750,
            maxScore: 800,
            accuracy: 93.75,
            questions: Array.from({ length: 58 }, (_, i) => ({
              id: `q${i}`,
              skill: 'Math',
              correct: Math.random() > 0.0625,
              difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
            })),
            timeSpentSeconds: 3300,
          },
          {
            id: '3-2',
            testType: 'SAT',
            date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
            skill: 'Math',
            score: 770,
            maxScore: 800,
            accuracy: 96.55,
            questions: Array.from({ length: 58 }, (_, i) => ({
              id: `q${i}`,
              skill: 'Math',
              correct: Math.random() > 0.03,
              difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
            })),
            timeSpentSeconds: 3200,
          },
        ],
      },
    ]
  }

  getTests(): Test[] {
    if (typeof window === 'undefined') return this.getSampleData()
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TESTS)
      return stored ? JSON.parse(stored) : this.getSampleData()
    } catch {
      return this.getSampleData()
    }
  }

  saveTests(tests: Test[]): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(tests))
    } catch {
      console.error('Failed to save tests')
    }
  }

  addTest(test: Test): void {
    const tests = this.getTests()
    tests.push(test)
    this.saveTests(tests)
  }

  updateTest(testId: string, updates: Partial<Test>): void {
    const tests = this.getTests()
    const index = tests.findIndex((t) => t.id === testId)
    if (index !== -1) {
      tests[index] = { ...tests[index], ...updates }
      this.saveTests(tests)
    }
  }

  addAttempt(testId: string, attempt: TestAttempt): void {
    const tests = this.getTests()
    const test = tests.find((t) => t.id === testId)
    if (test) {
      test.attempts.push(attempt)
      this.saveTests(tests)
    }
  }

  getGoals(): StudyGoal[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GOALS)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  addGoal(goal: StudyGoal): void {
    const goals = this.getGoals()
    goals.push(goal)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals))
    }
  }

  calculateWeakAreas(tests: Test[]): WeakArea[] {
    const skillStats: Record<Skill, { correct: number; total: number }> = {
      Reading: { correct: 0, total: 0 },
      Writing: { correct: 0, total: 0 },
      Listening: { correct: 0, total: 0 },
      Speaking: { correct: 0, total: 0 },
      Math: { correct: 0, total: 0 },
      Evidence: { correct: 0, total: 0 },
    }

    tests.forEach((test) => {
      test.attempts.forEach((attempt) => {
        attempt.questions.forEach((q) => {
          skillStats[q.skill].total++
          if (q.correct) skillStats[q.skill].correct++
        })
      })
    })

    const now = new Date()
    const recentTests = tests.filter((t) => {
      const testDate = new Date(t.createdAt)
      return now.getTime() - testDate.getTime() < 30 * 24 * 60 * 60 * 1000
    })

    const skillTrend: Record<Skill, number[]> = {
      Reading: [],
      Writing: [],
      Listening: [],
      Speaking: [],
      Math: [],
      Evidence: [],
    }

    recentTests.forEach((test) => {
      test.attempts.forEach((attempt) => {
        skillTrend[attempt.skill].push(attempt.accuracy)
      })
    })

    return Object.entries(skillStats).map(([skill, stats]) => {
      const accuracies = skillTrend[skill as Skill]
      const trend =
        accuracies.length > 1
          ? accuracies[accuracies.length - 1] > accuracies[0]
            ? 'improving'
            : 'declining'
          : 'stable'

      return {
        skill: skill as Skill,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        totalQuestions: stats.total,
        correctQuestions: stats.correct,
        trend,
      }
    })
  }
}

export const dataStore = new DataStore()
