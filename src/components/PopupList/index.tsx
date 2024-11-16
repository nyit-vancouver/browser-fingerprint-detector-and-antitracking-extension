import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid'
import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'

import _isDev from '@/utils/getEnv'

import HeadersSetting from '../HeadersSetting'
import Home from '../Home'
import Layout from '../Layout'
import OtherSetting from '../OtherSetting'
import PlatformSetting from '../PlatformSetting'
import './index.scss'

const { TabPane } = Tabs

function PopupList() {
  const [showDetail, setShowDetail] = useState(_isDev())
  const [activeTab, setActiveTab] = useState('1')

  // 在组件加载时读取保存的配置
  useEffect(() => {
    // loadSelectedConfig()
  }, [])

  // 处理原有功能的点击事件
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

  // Switch开关处理逻辑保持不变

  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey)
    // 根据 activeKey 处理页面跳转
    switch (activeKey) {
      case '2':
        handleClick('info')
        break
      case '4':
        handleClick('dashboard')
        break
      default:
        break
    }
  }

  if (showDetail) {
    return <Layout />
  }

  return (
    <div className="popup-content">
      <Tabs
        className="sidebar"
        tabPosition="left"
        activeKey={activeTab}
        onChange={handleTabChange}
      >
        <TabPane
          tab={
            <div className="tab-icon">
              <ShieldCheckIcon className="icon" />
            </div>
          }
          key="1"
        >
          <div className="tab-content">{Home()}</div>
        </TabPane>
        <TabPane
          tab={
            <div className="tab-icon">
              <DocumentTextIcon className="icon" />
            </div>
          }
          key="2"
        >
          <div className="tab-content">
            <div className="content-area">Fingerprint Details</div>
          </div>
        </TabPane>
        <TabPane
          tab={
            <div className="tab-icon">
              <PresentationChartLineIcon className="icon" />
            </div>
          }
          key="4"
        >
          <div className="tab-content">
            <div className="content-area">Tracking Dashboard</div>
          </div>
        </TabPane>
        <TabPane
          tab={
            <div className="tab-icon">
              <ComputerDesktopIcon className="icon" />
            </div>
          }
          key="5"
        >
          <div className="tab-content">{PlatformSetting()}</div>
        </TabPane>
        <TabPane
          tab={
            <div className="tab-icon">
              <AdjustmentsHorizontalIcon className="icon" />
            </div>
          }
          key="6"
        >
          <div className="tab-content">{HeadersSetting()}</div>
        </TabPane>
        <TabPane
          tab={
            <div className="tab-icon">
              <Cog6ToothIcon className="icon" />
            </div>
          }
          key="7"
        >
          <div className="tab-content">{OtherSetting()}</div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PopupList
