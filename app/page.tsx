'use client'

import { useState, useEffect } from 'react'
import { dataStore } from '@/lib/store'
import { Test } from '@/lib/types'
import { Sidebar } from '@/components/sidebar'
import { DashboardSection } from '@/components/dashboard-section'
import { TestsSection } from '@/components/tests-section'
import { AnalyticsSection } from '@/components/analytics-section'
import { GoalsSection } from '@/components/goals-section'

export default function Page() {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'tests' | 'analytics' | 'goals'>('dashboard')
  const [tests, setTests] = useState<Test[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load data from store
    const loadedTests = dataStore.getTests()
    setTests(loadedTests)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />
          <p className="text-muted-foreground">Loading Study Hub...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 md:ml-64">
        <div className="border-b border-border bg-card/50 p-4 md:p-6">
          <h1 className="text-3xl font-bold text-foreground">Study Hub</h1>
          <p className="mt-1 text-muted-foreground">Track your IELTS and SAT test preparation progress</p>
        </div>

        <div className="p-4 md:p-6">
          {activeSection === 'dashboard' && <DashboardSection tests={tests} />}
          {activeSection === 'tests' && <TestsSection tests={tests} onTestsChange={setTests} />}
          {activeSection === 'analytics' && <AnalyticsSection tests={tests} />}
          {activeSection === 'goals' && <GoalsSection />}
        </div>
      </main>
    </div>
  )
}
