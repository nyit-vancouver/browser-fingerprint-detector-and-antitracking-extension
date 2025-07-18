import { Empty } from 'antd'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { TrackingLog } from './type'

interface TrackingChartProps {
  data: TrackingLog[]
  selectedDomain: string | null
}

// Format labels and handle line breaks
const formatXAxisLabel = (value: string) => {
  // Convert camelCase to space-separated words
  const formatted = value.replace(/([A-Z])/g, ' $1').trim()
  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)

  // If the text length exceeds 12 characters, break the line at spaces
  if (capitalized.length > 12 && capitalized.includes(' ')) {
    const words = capitalized.split(' ')
    const midPoint = Math.ceil(words.length / 2)
    return [words.slice(0, midPoint).join(' '), words.slice(midPoint).join(' ')]
  }

  return [capitalized]
}

const TrackingChart: React.FC<TrackingChartProps> = ({
  data,
  selectedDomain,
}) => {
  if (!selectedDomain) {
    return (
      <Empty
        description="Please select a url to view tracking data"
        className="my-8"
      />
    )
  }

  const latestRecord = data
    .filter((item) => item.url === selectedDomain)
    .sort((a, b) => b.timestamp - a.timestamp)[0]

  if (!latestRecord) {
    return <Empty description="No data available" className="my-8" />
  }

  const chartData = Object.entries(latestRecord.logs).map(([key, value]) => ({
    name: key,
    value: value || 0,
  }))

  return (
    <div className="bg-white p-4 rounded-lg shadow" style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            tick={({ x, y, payload }) => {
              const lines = formatXAxisLabel(payload.value)
              return (
                <g transform={`translate(${x},${y})`}>
                  {lines.map((line, i) => (
                    <text
                      key={i}
                      x={0}
                      y={0}
                      dy={16 + i * 12} // Increase line spacing
                      textAnchor="end"
                      fill="#666"
                      transform="rotate(-45)"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              )
            }}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => [
              value,
              formatXAxisLabel(name).join(' '),
            ]}
          />
          <Bar dataKey="value" fill="#1890ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TrackingChart
