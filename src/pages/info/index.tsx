import React from 'react'
import Browser from './Browser'
import Device from './Device'
import OS from './OS'
import Location from './Location'
import Hardware from './Hardware'
import Software from './Software'
import Plugins from './Plugins'

function Info() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          System Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto">
          <Browser />
          <Device />
          <OS />
          <Location />
          <Hardware />
          <Software />
        </div>

        <Plugins />
      </div>
    </div>
  )
}

export default Info
