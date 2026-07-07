import { Question, QuestionResult, TestAttempt } from './types'

/**
 * Score Calculator for IELTS and SAT tests
 * Provides instant checking and scoring
 */

interface TestScore {
  score: number
  maxScore: number
  accuracy: number
  results: QuestionResult[]
  bandScore?: number // For IELTS
}

/**
 * Check a single answer instantly
 */
export function checkAnswer(question: Question, userAnswer: string): boolean {
  return userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()
}

/**
 * Calculate score for SAT (out of 400 for each section)
 * Math: 200-800 points
 * Writing: 200-800 points
 */
export function calculateSATScore(
  questions: Question[],
  results: QuestionResult[],
): TestScore {
  const maxScore = 800
  let rawScore = 0

  results.forEach((result) => {
    const question = questions.find((q) => q.id === result.questionId)
    if (!question) return

    // Difficulty multiplier
    const difficultyMultiplier = {
      easy: 1,
      medium: 1.5,
      hard: 2,
    }

    if (result.correct) {
      rawScore += 10 * difficultyMultiplier[question.difficulty]
    }
  })

  // Scale to 200-800 range
  const scaledScore = Math.min(800, Math.max(200, 200 + (rawScore / (questions.length * 20)) * 600))
  const accuracy = (results.filter((r) => r.correct).length / results.length) * 100

  return {
    score: Math.round(scaledScore),
    maxScore: 800,
    accuracy: Math.round(accuracy * 10) / 10,
    results,
  }
}

/**
 * Calculate IELTS band score (0-9 scale)
 * Based on raw score percentage
 */
export function calculateIELTSBandScore(accuracy: number): number {
  if (accuracy >= 88) return 9.0
  if (accuracy >= 83) return 8.5
  if (accuracy >= 78) return 8.0
  if (accuracy >= 73) return 7.5
  if (accuracy >= 68) return 7.0
  if (accuracy >= 63) return 6.5
  if (accuracy >= 58) return 6.0
  if (accuracy >= 53) return 5.5
  if (accuracy >= 48) return 5.0
  if (accuracy >= 43) return 4.5
  if (accuracy >= 38) return 4.0
  if (accuracy >= 33) return 3.5
  if (accuracy >= 25) return 3.0
  return 2.5
}

/**
 * Calculate score for IELTS (0-9 band scale per section)
 * Reading and Listening: 40 questions each
 */
export function calculateIELTSScore(
  questions: Question[],
  results: QuestionResult[],
): TestScore {
  const correctCount = results.filter((r) => r.correct).length
  const accuracy = (correctCount / results.length) * 100
  const bandScore = calculateIELTSBandScore(accuracy)

  return {
    score: Math.round(bandScore * 10) / 10,
    maxScore: 9,
    accuracy: Math.round(accuracy * 10) / 10,
    results,
    bandScore,
  }
}

/**
 * Calculate weighted score considering question distribution
 */
export function calculateWeightedScore(
  questions: Question[],
  results: QuestionResult[],
  testType: 'IELTS' | 'SAT',
): TestScore {
  if (testType === 'SAT') {
    return calculateSATScore(questions, results)
  } else {
    return calculateIELTSScore(questions, results)
  }
}

/**
 * Get instant feedback for user answer
 */
export function getInstantFeedback(question: Question, userAnswer: string): {
  isCorrect: boolean
  feedback: string
  correctAnswer: string
} {
  const isCorrect = checkAnswer(question, userAnswer)

  let feedback = ''
  if (isCorrect) {
    feedback = 'Excellent! That is correct.'
  } else {
    feedback = `Incorrect. The correct answer is: ${question.correctAnswer}`
  }

  return {
    isCorrect,
    feedback,
    correctAnswer: question.correctAnswer,
  }
}

/**
 * Analyze performance by difficulty
 */
export function analyzeByDifficulty(results: QuestionResult[]) {
  const byDifficulty = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  }

  results.forEach((result) => {
    const difficulty = result.difficulty
    byDifficulty[difficulty].total++
    if (result.correct) {
      byDifficulty[difficulty].correct++
    }
  })

  return {
    easy: {
      accuracy: byDifficulty.easy.total > 0 ? (byDifficulty.easy.correct / byDifficulty.easy.total) * 100 : 0,
      count: byDifficulty.easy.total,
    },
    medium: {
      accuracy: byDifficulty.medium.total > 0 ? (byDifficulty.medium.correct / byDifficulty.medium.total) * 100 : 0,
      count: byDifficulty.medium.total,
    },
    hard: {
      accuracy: byDifficulty.hard.total > 0 ? (byDifficulty.hard.correct / byDifficulty.hard.total) * 100 : 0,
      count: byDifficulty.hard.total,
    },
  }
}

/**
 * Identify weak areas based on performance
 */
export function identifyWeakAreas(results: QuestionResult[]) {
  const weakAreas: { [key: string]: { correct: number; total: number; accuracy: number } } = {}

  results.forEach((result) => {
    const skill = result.skill
    if (!weakAreas[skill]) {
      weakAreas[skill] = { correct: 0, total: 0, accuracy: 0 }
    }
    weakAreas[skill].total++
    if (result.correct) {
      weakAreas[skill].correct++
    }
  })

  // Calculate accuracy for each skill
  Object.keys(weakAreas).forEach((skill) => {
    const data = weakAreas[skill]
    data.accuracy = (data.correct / data.total) * 100
  })

  // Return areas where accuracy is below 70%
  return Object.entries(weakAreas)
    .filter(([_, data]) => data.accuracy < 70)
    .map(([skill, data]) => ({
      skill,
      accuracy: Math.round(data.accuracy * 10) / 10,
      total: data.total,
      correct: data.correct,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
}

/**
 * Calculate time efficiency (questions per minute)
 */
export function calculateTimeEfficiency(results: QuestionResult[]): number {
  const totalTime = results.reduce((sum, r) => sum + r.timeSpentSeconds, 0)
  const questionsPerMinute = (results.length / (totalTime / 60)) * 100
  return Math.round(questionsPerMinute * 10) / 10
}
