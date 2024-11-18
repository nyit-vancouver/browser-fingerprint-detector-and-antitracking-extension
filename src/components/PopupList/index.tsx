import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid'
import { Tabs, Tooltip } from 'antd'
import React, { useState } from 'react'

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
  const [activeTab, setActiveTab] = useState('home')

  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey)
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
          key="home"
        >
          <div className="tab-content">
            <Home />
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
          key="userAgent"
        >
          <div className="tab-content">
            {activeTab === 'userAgent' && <UserAgentSetting />}
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
          key="headers"
        >
          <div className="tab-content">
            {activeTab === 'headers' && <HeadersSetting />}
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
          key="other"
        >
          <div className="tab-content">
            {activeTab === 'other' && <OtherSetting />}
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PopupList
