import { Button, DatePicker, Select, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'

import type { TrackingLog } from '@/constants/trackingData'

const { RangePicker } = DatePicker

interface TrackingListProps {
  data: TrackingLog[]
  selectedDomain: string | null
  onDomainChange: (domain: string) => void
  dateRange: [number, number] | null
  onDateRangeChange: (range: [number, number] | null) => void
}

const TrackingList: React.FC<TrackingListProps> = ({
  data,
  selectedDomain,
  onDomainChange,
  dateRange,
  onDateRangeChange
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const domains = Array.from(new Set(data.map((item) => item.domain)))

  const toggleExpand = (rowKey: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowKey]: !prev[rowKey]
    }))
  }

  const columns: ColumnsType<TrackingLog> = [
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
      width: '20%'
    },
    {
      title: 'Time',
      dataIndex: '_timestamp',
      key: 'timestamp',
      width: '20%',
      render: (timestamp: number) => new Date(timestamp).toLocaleString()
    },
    {
      title: 'Tracking Details',
      dataIndex: 'logs',
      key: 'logs',
      render: (logs: TrackingLog['logs'], record: TrackingLog) => {
        const entries = Object.entries(logs)
        const isExpanded = expandedRows[record._timestamp]
        const displayEntries = isExpanded ? entries : entries.slice(0, 3)

        return (
          <div className="space-y-1">
            {displayEntries.map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
            {entries.length > 3 && (
              <Button
                type="link"
                onClick={() => toggleExpand(record._timestamp.toString())}
                className="p-0"
              >
                {isExpanded
                  ? 'Show Less'
                  : `Show More (${entries.length - 3} items)`}
              </Button>
            )}
          </div>
        )
      }
    }
  ]

  const filteredData = data.filter((item) => {
    const domainMatch = !selectedDomain || item.domain === selectedDomain
    const dateMatch =
      !dateRange ||
      (item._timestamp >= dateRange[0] && item._timestamp <= dateRange[1])
    return domainMatch && dateMatch
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select
          showSearch
          placeholder="Select a domain"
          optionFilterProp="children"
          onChange={onDomainChange}
          value={selectedDomain}
          className="w-64"
          allowClear
        >
          {domains.map((domain) => (
            <Select.Option key={domain} value={domain}>
              {domain}
            </Select.Option>
          ))}
        </Select>
        <RangePicker
          onChange={(dates) => {
            if (dates) {
              onDateRangeChange([dates[0]!.valueOf(), dates[1]!.valueOf()])
            } else {
              onDateRangeChange(null)
            }
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_timestamp"
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}

export default TrackingList
