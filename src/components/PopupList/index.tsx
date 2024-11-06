import React, { useEffect, useState } from 'react'
import { List, Switch, Tooltip } from 'antd'
import {
  ShieldCheckIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/solid'
import { tabStorage } from '@/utils/TabStorage'

import './index.scss'
import Layout from '../Layout'
import _isDev from '@/utils/getEnv'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { getCurrentTabId } from '@/utils/getCurrentTabId'

function PopupList() {
  const [showDetail, setShowDetail] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)
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

  const handleSwitch = async (checked: boolean) => {
    console.log(`switch to ${checked}`)
    setSwitchValue(checked)
    const currentTabId = await getCurrentTabId()
    if (!currentTabId) {
      console.error('tab id is undefined')
      return
    }
    if (checked) {
      const data = {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit',
        'accept-language': 'en-US,en;q=0.1',
        'x-forwarded-for': '111.8.203.1',
        referer: false,
        dnt: '1',
        etag: false,
        'if-none-match': false
      }
      tabStorage.set(currentTabId, data)
    } else
      tabStorage.delete(currentTabId, [
        'user-agent',
        'x-forwarded-for',
        'accept-language',
        'referer',
        'dnt',
        'etag',
        'if-none-match'
      ])
  }

  const init = async () => {
    const currentTabId = await getCurrentTabId()
    if (!currentTabId) {
      console.error('tab id is undefined')
      return
    }
    // TODO: 如果有SessionStorage，读取SessionStorage中的数据
    const header = await tabStorage.get(currentTabId, 'user-agent')
    console.log('init header', header)
    setSwitchValue(!!header)
  }

  useEffect(() => {
    init()
  }, [])

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
          <div className="flex justify-between items-center cursor-default px-5 w-full">
            <span className="flex items-center">
              Hide Digital Fingerprint
              <Tooltip
                placement="top"
                title="Enable to randomize your fingerprint"
              >
                <InformationCircleIcon className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" />
              </Tooltip>
            </span>
            <Switch size="small" value={switchValue} onChange={handleSwitch} />
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
