import { Column } from '@ant-design/plots'
import { Empty } from 'antd'
import React from 'react'

import type { TrackingLog } from '@/constants/trackingData'

interface TrackingChartProps {
  data: TrackingLog[]
  selectedDomain: string | null
}

const TrackingChart: React.FC<TrackingChartProps> = ({
  data,
  selectedDomain
}) => {
  if (!selectedDomain) {
    return (
      <Empty
        description="Please select a domain to view tracking data"
        className="my-8"
      />
    )
  }

  const latestRecord = data
    .filter((item) => item.domain === selectedDomain)
    .sort((a, b) => b._timestamp - a._timestamp)[0]

  if (!latestRecord) {
    return <Empty description="No data available" className="my-8" />
  }

  const chartData = Object.entries(latestRecord.logs).map(([key, value]) => ({
    type: key,
    value: value || 0
  }))

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Column
        data={chartData}
        xField="type"
        yField="value"
        label={{
          position: 'top'
        }}
        animation={{
          appear: {
            animation: 'wave-in',
            duration: 1000
          }
        }}
      />
    </div>
  )
}

export default TrackingChart
