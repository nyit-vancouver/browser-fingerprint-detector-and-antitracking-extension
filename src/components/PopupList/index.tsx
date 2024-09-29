import React, { useState } from 'react'
import { List, Switch, Button } from 'antd'
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  FingerPrintIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid'

import './index.scss'
import Layout from '../Layout'
import _isDev from '@/utils/getEnv'

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
            <ShieldCheckIcon className="icon text-blue-600" />
            <h1 className="font-bold flex items-center text-xl">
              Anti - Tracking
            </h1>
          </div>
        </List.Item>
        <List.Item className="bg-amber-100">
          <div className="popup-list-item">
            <ExclamationTriangleIcon className="icon text-yellow-600" />
            <div className="flex justify-between items-center">
              <span>Risk of being tracking : 90%</span>
              <Button
                type="link"
                className="px-0"
                onClick={() => handleClick('info')}
              >
                Details
              </Button>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div className="popup-list-item">
            <FingerPrintIcon className="icon text-gray-600" />{' '}
            <div className="flex justify-between items-center">
              <span>Hide Digital Fingerprint</span>
              <Switch onChange={handleSwitch} />
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div className="popup-list-item">
            <Cog6ToothIcon className="icon text-gray-600" />
            <div className="flex justify-between items-center">
              <span>Custom Configuration</span>
              <Button
                type="link"
                className="px-0"
                onClick={() => handleClick('config')}
              >
                Configurate
              </Button>
            </div>
          </div>
        </List.Item>
      </List>
    </div>
  )
}

export default PopupList
