import React, { useState } from 'react'
import { List, Switch, Tooltip } from 'antd'
import {
  ShieldCheckIcon,
  FingerPrintIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/solid'

import './index.scss'
import Layout from '../Layout'
import _isDev from '@/utils/getEnv'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

function PopupList() {
  const [showDetail, setShowDetail] = useState(false)
  const handleClick = (page: string) => {
    const isDev = _isDev()
    if (!isDev) {
      chrome.storage.sync.set({ page }, function () {
        console.log('set page.')
      })
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage()
      } else {
        window.open(chrome.runtime.getURL('options.html'))
      }
      return
    }
    setShowDetail(true)
  }

  const handleSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }

  return showDetail ? (
    <Layout />
  ) : (
    <div className="popup-content">
      <List>
        <List.Item>
          <div className="popup-list-item">
            <ShieldCheckIcon className="icon !text-blue-600" />
            <h1 className="font-bold flex items-center text-xl cursor-default">
              Anti-Tracking
            </h1>
          </div>
        </List.Item>
        <List.Item>
          <div className="popup-list-item">
            <FingerPrintIcon className="icon" />
            <div className="flex justify-between items-center cursor-default">
              <span className="flex items-center">
                Hide Digital Fingerprint
                <Tooltip
                  placement="top"
                  title="Enable to randomize your fingerprint"
                >
                  <InformationCircleIcon className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" />
                </Tooltip>
              </span>
              <Switch onChange={handleSwitch} />
            </div>
          </div>
        </List.Item>
        <List.Item
          className="cursor-pointer"
          onClick={() => handleClick('info')}
        >
          <div className="popup-list-item--clickable">
            <DocumentTextIcon className="icon" />
            <span>View Fingerprint Details</span>
          </div>
        </List.Item>
        <List.Item
          className="cursor-pointer"
          onClick={() => handleClick('config')}
        >
          <div className="popup-list-item--clickable">
            <Cog6ToothIcon className="icon" />
            <span>Configure your Fingerprint</span>
          </div>
        </List.Item>
        <List.Item
          className="cursor-pointer"
          onClick={() => handleClick('dashboard')}
        >
          <div className="popup-list-item--clickable">
            <PresentationChartLineIcon className="icon" />
            <span>Tracking Dashboard</span>
          </div>
        </List.Item>
      </List>
    </div>
  )
}

export default PopupList
