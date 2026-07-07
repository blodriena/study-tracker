'use client'

import { useState } from 'react'
import { Plus, Target, Trash2 } from 'lucide-react'
import { dataStore } from '@/lib/store'
import { StudyGoal } from '@/lib/types'

export function GoalsSection() {
  const [goals, setGoals] = useState<StudyGoal[]>(dataStore.getGoals())
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    testType: 'IELTS' as const,
    skill: 'Reading' as const,
    targetScore: 7,
  })

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()

    const newGoal: StudyGoal = {
      id: Math.random().toString(36).substr(2, 9),
      testType: formData.testType,
      skill: formData.skill,
      targetScore: formData.targetScore,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      createdAt: new Date(),
    }

    dataStore.addGoal(newGoal)
    setGoals([...goals, newGoal])
    setShowForm(false)
    setFormData({ testType: 'IELTS', skill: 'Reading', targetScore: 7 })
  }

  const handleDeleteGoal = (id: string) => {
    const updatedGoals = goals.filter((g) => g.id !== id)
    setGoals(updatedGoals)
    // Note: You'd need to add a deleteGoal method to the dataStore to persist this
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Study Goals</h2>
          <p className="mt-1 text-muted-foreground">Set and track your test preparation targets</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus size={20} />
          Add Goal
        </button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <form
          onSubmit={handleAddGoal}
          className="rounded-lg border border-border bg-card p-6"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-foreground">Test Type</label>
              <select
                value={formData.testType}
                onChange={(e) => setFormData({ ...formData, testType: e.target.value as any })}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              >
                <option value="IELTS">IELTS</option>
                <option value="SAT">SAT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Skill</label>
              <select
                value={formData.skill}
                onChange={(e) => setFormData({ ...formData, skill: e.target.value as any })}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              >
                <option value="Reading">Reading</option>
                <option value="Writing">Writing</option>
                <option value="Listening">Listening</option>
                <option value="Speaking">Speaking</option>
                <option value="Math">Math</option>
                <option value="Evidence">Evidence</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Target Score</label>
              <input
                type="number"
                value={formData.targetScore}
                onChange={(e) => setFormData({ ...formData, targetScore: parseInt(e.target.value) })}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Create Goal
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12">
          <Target className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-center text-muted-foreground">
            {showForm ? 'No goals yet. Create your first one!' : 'No study goals set yet.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <div key={goal.id} className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{goal.skill}</p>
                    <p className="text-sm text-muted-foreground">{goal.testType}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Delete goal"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Target Score</p>
                  <p className="text-2xl font-bold text-primary">{goal.targetScore}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(goal.deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {Math.max(0, Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (24 * 60 * 60 * 1000)))} days left
                  </p>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width: `${Math.min(((Date.now() - new Date(goal.createdAt).getTime()) / (new Date(goal.deadline).getTime() - new Date(goal.createdAt).getTime())) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
