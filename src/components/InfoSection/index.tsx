import React from 'react'
import {
  InformationCircleIcon // 新增
} from '@heroicons/react/24/outline'

function InfoSection({
  title,
  data,
  icon: Icon
}: {
  title: string
  data: Record<string, any>
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <Icon className="w-5 h-5 mr-2 text-blue-500" />
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 flex items-center">
              {key}
              {key.includes('WebRTC') && (
                <span className="relative group ml-1">
                  <InformationCircleIcon className="size-4 text-gray-400 cursor-help" />
                  <span className="absolute bottom-full left-0 w-64 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    When WebRTC IP leaks occur, this information will show your
                    real IP address.
                  </span>
                </span>
              )}
            </span>
            <span className="text-sm text-gray-800 break-words">
              {key === 'canvasFingerprint'
                ? (value as string).substring(0, 16) + '...'
                : typeof value === 'object'
                  ? JSON.stringify(value)
                  : value?.toString() || 'N/A'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoSection
