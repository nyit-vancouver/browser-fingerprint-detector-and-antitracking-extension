import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid'
import { Tabs, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'

import _isDev from '@/utils/getEnv'

import HeadersSetting from '../HeadersSetting'
import Home from '../Home'
import Layout from '../Layout'
import OtherSetting from '../OtherSetting'
import UserAgentSetting from '../UserAgentSetting'
import './index.scss'

const { TabPane } = Tabs

function PopupList() {
  const [showDetail] = useState(_isDev())
  const [activeTab, setActiveTab] = useState('1')

  // 在组件加载时读取保存的配置
  useEffect(() => {
    // loadSelectedConfig()
  }, [])

  // 处理原有功能的点击事件
  const handleClick = (page: string) => {
    window.open(`http://localhost:3000#${page}`) //chrome.runtime.getURL('options.html'))
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
      <Tabs tabPosition="left" activeKey={activeTab} onChange={handleTabChange}>
        <TabPane
          tab={
            <Tooltip title="Home" placement="right">
              <div className="tab-icon">
                <ShieldCheckIcon className="icon" />
              </div>
            </Tooltip>
          }
          key="1"
        >
          <div className="tab-content">
            <Home />
            <div className="instructions-text">
              <span className="font-bold">Instructions for Use</span>
              <br />
              The following settings have been pre-configured with an optimal
              default setup to help you mitigate digital fingerprint tracking
              effectively. Manual adjustments are not necessary under typical
              circumstances. However, if you choose to modify any settings,
              please ensure you fully understand the implications of the changes
              made.
            </div>
            <div className="link-text">
              You can check your{' '}
              <span
                className="clickable-link"
                onClick={() => handleClick('info')}
              >
                Fingerprint Details
              </span>{' '}
              and{' '}
              <span
                className="clickable-link"
                onClick={() => handleClick('dashboard')}
              >
                Tracking Dashboard
              </span>
              .
            </div>
          </div>
        </TabPane>
        <TabPane
          tab={
            <Tooltip title="UserAgent Settings" placement="right">
              <div className="tab-icon">
                <ComputerDesktopIcon className="icon" />
              </div>
            </Tooltip>
          }
          key="5"
        >
          <div className="tab-content">
            {activeTab === '5' && <UserAgentSetting />}
          </div>
        </TabPane>
        <TabPane
          tab={
            <Tooltip title="Headers Settings" placement="right">
              <div className="tab-icon">
                <AdjustmentsHorizontalIcon className="icon" />
              </div>
            </Tooltip>
          }
          key="6"
        >
          <div className="tab-content">
            {activeTab === '6' && <HeadersSetting />}
          </div>
        </TabPane>
        <TabPane
          tab={
            <Tooltip title="Other Settings" placement="right">
              <div className="tab-icon">
                <Cog6ToothIcon className="icon" />
              </div>
            </Tooltip>
          }
          key="7"
        >
          <div className="tab-content">
            {activeTab === '7' && <OtherSetting />}
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PopupList
