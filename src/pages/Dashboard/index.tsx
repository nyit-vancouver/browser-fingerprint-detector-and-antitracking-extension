import { Layout } from 'antd'
import React, { useState } from 'react'

import TrackingChart from '@/components/Dashboard/TrackingChart'
import TrackingList from '@/components/Dashboard/TrackingList'
import { trackingData } from '@/constants/trackingData'

const { Content } = Layout

const Dashboard: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<[number, number] | null>(null)

  return (
    <Layout>
      <Content
        style={{
          padding: '24px 40px',
          marginLeft: '220px',
          backgroundColor: '#f0f2f5'
        }}
      >
        <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-900 mb-6">
              Tracking Dashboard
            </h1>

            <div className="space-y-6">
              <TrackingChart
                data={trackingData}
                selectedDomain={selectedDomain}
              />

              <TrackingList
                data={trackingData}
                selectedDomain={selectedDomain}
                onDomainChange={setSelectedDomain}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default Dashboard
