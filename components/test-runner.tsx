'use client'

import { useState, useEffect } from 'react'
import { Question, QuestionResult } from '@/lib/types'
import { checkAnswer, getInstantFeedback } from '@/lib/scoring'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react'

interface TestRunnerProps {
  testType: 'IELTS' | 'SAT'
  section: string
  questions: Question[]
  onComplete: (results: QuestionResult[]) => void
  onCancel: () => void
}

export function TestRunner({ testType, section, questions, onComplete, onCancel }: TestRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({})
  const [showFeedback, setShowFeedback] = useState<{ [key: string]: boolean }>({})
  const [timeStarted] = useState(Date.now())
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = questions[currentIndex]
  const currentUserAnswer = userAnswers[currentQuestion?.id] || ''
  const hasAnswered = currentQuestion?.id in userAnswers
  const isAnswerCorrect = hasAnswered && checkAnswer(currentQuestion, currentUserAnswer)

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - timeStarted) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [timeStarted])

  const handleAnswerSelect = (answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))
  }

  const handleCheckAnswer = () => {
    setShowFeedback((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Calculate time spent for each question
    const timePerQuestion = Math.max(1, Math.floor(elapsedTime / questions.length))

    const results: QuestionResult[] = questions.map((question) => {
      const userAnswer = userAnswers[question.id] || ''
      const isCorrect = checkAnswer(question, userAnswer)

      return {
        id: Math.random().toString(),
        questionId: question.id,
        skill: question.section,
        userAnswer,
        correctAnswer: question.correctAnswer,
        correct: isCorrect,
        difficulty: question.difficulty,
        timeSpentSeconds: timePerQuestion,
      }
    })

    setTimeout(() => {
      onComplete(results)
      setIsSubmitting(false)
    }, 500)
  }

  const answeredCount = Object.keys(userAnswers).length
  const questionsAnswered = `${answeredCount} / ${questions.length}`
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentQuestion) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No questions available. Please try again.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with progress and timer */}
      <div className="flex items-center justify-between rounded-lg bg-card p-4 border border-border">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span className="font-mono text-lg font-semibold">{formatTime(elapsedTime)}</span>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Progress</p>
          <p className="font-semibold">
            {currentIndex + 1} / {questions.length}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Answered</p>
          <p className="font-semibold">{questionsAnswered}</p>
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-2 border-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">
                Question {currentQuestion.number}
                {currentQuestion.difficulty === 'hard' && <span className="ml-2 text-sm text-red-500">★ Hard</span>}
                {currentQuestion.difficulty === 'medium' && (
                  <span className="ml-2 text-sm text-yellow-500">★ Medium</span>
                )}
              </CardTitle>
              <CardDescription className="mt-2">{currentQuestion.section}</CardDescription>
            </div>
            {hasAnswered && (
              <div>
                {isAnswerCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Passage */}
          {currentQuestion.passage && (
            <div className="rounded-lg bg-muted p-4 text-sm leading-relaxed">{currentQuestion.passage}</div>
          )}

          {/* Question Text */}
          <div className="space-y-2">
            <p className="font-semibold text-foreground">{currentQuestion.question}</p>
          </div>

          {/* Answer Options */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="space-y-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentUserAnswer === option
                const isCorrectOption = option === currentQuestion.correctAnswer
                const showCorrect = showFeedback[currentQuestion.id]

                let bgClass = 'bg-card hover:bg-muted'
                if (isSelected) {
                  if (showCorrect) {
                    bgClass = isCorrectOption ? 'bg-green-100 dark:bg-green-900/20 border-green-500' : 'bg-red-100 dark:bg-red-900/20 border-red-500'
                  } else {
                    bgClass = 'bg-primary/10 border-primary'
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !showFeedback[currentQuestion.id] && handleAnswerSelect(option)}
                    disabled={showFeedback[currentQuestion.id]}
                    className={`w-full rounded-lg border-2 p-3 text-left font-medium transition-all ${bgClass} ${
                      showCorrect && isCorrectOption && !isSelected ? 'border-green-500' : 'border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-full border-2 ${isSelected ? 'border-primary bg-primary' : 'border-border'}`}>
                        {isSelected && showCorrect && (
                          <div className="h-full w-full flex items-center justify-center">
                            {isCorrectOption ? <CheckCircle2 className="h-4 w-4 text-white" /> : <XCircle className="h-4 w-4 text-white" />}
                          </div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Instant Feedback */}
          {showFeedback[currentQuestion.id] && (
            <div className={`rounded-lg p-4 ${isAnswerCorrect ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
              <div className="flex items-start gap-2">
                {isAnswerCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-semibold ${isAnswerCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                    {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-sm mt-1">
                    {isAnswerCorrect
                      ? 'Great job! Your answer is correct.'
                      : `The correct answer is: ${currentQuestion.correctAnswer}`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {!hasAnswered && (
          <Button
            onClick={handleCheckAnswer}
            variant="default"
            className="flex-1"
          >
            Check Answer
          </Button>
        )}

        {hasAnswered && !showFeedback[currentQuestion.id] && (
          <Button
            onClick={handleCheckAnswer}
            variant="default"
            className="flex-1"
          >
            Show Feedback
          </Button>
        )}

        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          variant="outline"
          className="flex-1"
        >
          Previous
        </Button>

        {currentIndex < questions.length - 1 ? (
          <Button
            onClick={handleNext}
            variant="outline"
            className="flex-1"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length || isSubmitting}
            className="flex-1"
            variant="default"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Test'}
          </Button>
        )}
      </div>

      {answeredCount < questions.length && currentIndex === questions.length - 1 && (
        <div className="rounded-lg bg-yellow-100 dark:bg-yellow-900/20 p-4 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-yellow-700 dark:text-yellow-300">Incomplete Test</p>
            <p className="text-sm mt-1">
              You have {questions.length - answeredCount} unanswered question(s). Please answer all questions before submitting.
            </p>
          </div>
        </div>
      )}

      {/* Quick Navigation */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm font-semibold mb-3">Quick Navigation</p>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {questions.map((q, idx) => {
            const answered = q.id in userAnswers
            const correct = answered && checkAnswer(q, userAnswers[q.id])

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`aspect-square rounded-lg border-2 font-semibold text-sm flex items-center justify-center transition-all ${
                  idx === currentIndex
                    ? 'border-primary bg-primary/10'
                    : correct
                      ? 'border-green-500 bg-green-100 dark:bg-green-900/20'
                      : answered
                        ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
                        : 'border-border hover:bg-muted'
                }`}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>
      </div>

      {/* Cancel Button */}
      <Button
        onClick={onCancel}
        variant="ghost"
        className="w-full"
      >
        Cancel Test
      </Button>
    </div>
  )
}
