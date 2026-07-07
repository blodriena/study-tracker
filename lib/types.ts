// Test types
export type TestType = 'IELTS' | 'SAT'
export type Skill = 'Reading' | 'Writing' | 'Listening' | 'Speaking' | 'Math' | 'Evidence'

export interface Question {
  id: string
  testType: TestType
  section: Skill
  number: number
  passage: string
  question: string
  type: 'multiple-choice' | 'short-answer'
  options?: string[]
  correctAnswer: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface QuestionResult {
  id: string
  questionId: string
  skill: Skill
  userAnswer: string
  correctAnswer: string
  correct: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  timeSpentSeconds: number
}

export interface TestAttempt {
  id: string
  testType: TestType
  date: Date
  skill: Skill
  score: number
  maxScore: number
  accuracy: number // percentage
  questions: QuestionResult[]
  timeSpentSeconds: number
}

export interface Test {
  id: string
  name: string
  testType: TestType
  skill: Skill
  description: string
  createdAt: Date
  attempts: TestAttempt[]
}

export interface StudyGoal {
  id: string
  testType: TestType
  targetScore: number
  skill: Skill
  deadline: Date
  createdAt: Date
}

export interface WeakArea {
  skill: Skill
  accuracy: number
  totalQuestions: number
  correctQuestions: number
  trend: 'improving' | 'declining' | 'stable'
}
