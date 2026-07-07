'use client'

import { Question, QuestionResult, TestAttempt } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, TrendingUp, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { analyzeByDifficulty, identifyWeakAreas } from '@/lib/scoring'

interface TestResultsProps {
  attempt: TestAttempt
  questions: Question[]
  onRetake: () => void
  onDone: () => void
}

export function TestResults({ attempt, questions, onRetake, onDone }: TestResultsProps) {
  const correctCount = attempt.questions.filter((r) => r.correct).length
  const difficultyAnalysis = analyzeByDifficulty(attempt.questions)
  const weakAreas = identifyWeakAreas(attempt.questions)

  const difficultyData = [
    { name: 'Easy', value: Math.round(difficultyAnalysis.easy.accuracy), count: difficultyAnalysis.easy.count },
    { name: 'Medium', value: Math.round(difficultyAnalysis.medium.accuracy), count: difficultyAnalysis.medium.count },
    { name: 'Hard', value: Math.round(difficultyAnalysis.hard.accuracy), count: difficultyAnalysis.hard.count },
  ]

  const accuracyData = [
    { name: 'Correct', value: correctCount, fill: '#22c55e' },
    { name: 'Incorrect', value: attempt.questions.length - correctCount, fill: '#ef4444' },
  ]

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Test Complete!</CardTitle>
          <CardDescription className="text-center mt-2">Your detailed results are below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-2xl font-bold text-primary">
                {attempt.score}/{attempt.maxScore}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-2xl font-bold text-green-600">{attempt.accuracy}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Correct</p>
              <p className="text-2xl font-bold">{correctCount}/{attempt.questions.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-2xl font-bold">{Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accuracy Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Accuracy by Difficulty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={difficultyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {difficultyData.map((d) => (
              <div key={d.name} className="text-center">
                <p className="text-sm text-muted-foreground">{d.name}</p>
                <p className="text-lg font-bold">{d.value}%</p>
                <p className="text-xs text-muted-foreground">{d.count} questions</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Results Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie data={accuracyData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                  {accuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-green-500" />
                <span className="font-medium">Correct: {correctCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-red-500" />
                <span className="font-medium">Incorrect: {attempt.questions.length - correctCount}</span>
              </div>
              <div className="pt-4 border-t">
                <p className="font-semibold">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{attempt.accuracy}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weak Areas */}
      {weakAreas.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
              <TrendingUp className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weakAreas.map((area) => (
                <div key={area.skill} className="flex items-center justify-between p-3 rounded-lg bg-card border border-yellow-200">
                  <div>
                    <p className="font-medium">{area.skill}</p>
                    <p className="text-sm text-muted-foreground">
                      {area.correct}/{area.total} correct
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-600 dark:text-yellow-400">{Math.round(area.accuracy)}%</p>
                    <p className="text-xs text-muted-foreground">accuracy</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Question Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Question Breakdown</CardTitle>
          <CardDescription>Review each question and your answers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {attempt.questions.map((result, idx) => {
              const question = questions.find((q) => q.id === result.questionId)
              if (!question) return null

              return (
                <div key={result.id} className="p-3 rounded-lg border border-border bg-card">
                  <div className="flex items-start gap-3">
                    {result.correct ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        Question {idx + 1} {result.correct ? '(Correct)' : '(Incorrect)'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{question.question}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Your answer: </span>
                          <span className={result.correct ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{result.userAnswer}</span>
                        </p>
                        {!result.correct && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">Correct answer: </span>
                            <span className="text-green-600 font-medium">{result.correctAnswer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={onRetake} className="flex-1" variant="default">
          Retake Test
        </Button>
        <Button onClick={onDone} className="flex-1" variant="outline">
          Done
        </Button>
      </div>
    </div>
  )
}
