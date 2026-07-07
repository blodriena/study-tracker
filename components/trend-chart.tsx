'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export interface TrendDataPoint {
  date: string
  score: number
  accuracy: number
}

export interface TrendChartProps {
  data: TrendDataPoint[]
  title?: string
}

export function TrendChart({ data, title = 'Score Trend' }: TrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground">
        No data available
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            stroke="var(--muted-foreground)"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: `1px solid var(--border)`,
              borderRadius: '6px',
            }}
            labelStyle={{ color: 'var(--foreground)' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={{ fill: 'var(--chart-1)', r: 4 }}
            activeDot={{ r: 6 }}
            name="Score"
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="var(--chart-3)"
            strokeWidth={2}
            dot={{ fill: 'var(--chart-3)', r: 4 }}
            activeDot={{ r: 6 }}
            name="Accuracy %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
