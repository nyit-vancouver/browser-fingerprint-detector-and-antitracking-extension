import React from 'react'
import './index.css'
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  FingerPrintIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid'

function App() {
  const handlerDetailsClick = () => {
    window.location.href = '/info'
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('options.html'))
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-80">
      {' '}
      {/* 增加宽度到 w-80 (320px) */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
          <ShieldCheckIcon className="w-7 h-7 mr-3 text-blue-600" />{' '}
          {/* 稍微增大图标 */}
          Anti-Tracking
        </h1>
      </header>
      <div className="bg-yellow-50 rounded-md p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="w-6 h-6 mr-3 text-yellow-600" />{' '}
          {/* 稍微增大图标 */}
          <span className="text-yellow-800 text-sm">Tracking risk: 90%</span>
        </div>
        <a
          href="#"
          className="text-blue-600 hover:text-blue-800 text-sm"
          onClick={handlerDetailsClick}
        >
          Details
        </a>
      </div>
      <div className="mb-5">
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div className="flex items-center">
            <FingerPrintIcon className="w-6 h-6 mr-3 text-gray-600" />{' '}
            {/* 稍微增大图标 */}
            <span className="text-sm">Digital Fingerprint Hiding</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <div className="mb-5">
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div className="flex items-center">
            <Cog6ToothIcon className="w-6 h-6 mr-3 text-gray-600" />{' '}
            {/* 稍微增大图标 */}
            <span className="text-sm">Custom Configuration</span>
          </div>
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
            Configure
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
