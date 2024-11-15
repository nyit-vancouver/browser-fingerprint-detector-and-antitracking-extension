import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import {
  ShieldCheckIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  ComputerDesktopIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/solid'
import Layout from '../Layout'
import _isDev from '@/utils/getEnv'

import './index.scss'
import Home from '../Home'
import PlatformSetting from '../PlatformSetting'
import HeadersSetting from '../HeadersSetting'
import OtherSetting from '../OtherSetting'

const { TabPane } = Tabs

// 添加类型定义
// interface Profile {
//   id: string
//   name: string
//   nav?: {
//     version: string
//     oscpu: string
//     platform: string
//   }
//   screenOffset?: number
//   browsers: string[]
//   uaPlatform?: string
// }

// interface Profiles {
//   windows: Profile[]
//   macOS: Profile[]
//   linux: Profile[]
//   iOS: Profile[]
//   android: Profile[]
// }

// 修改 profiles 的类型声明

// 添加 getName 函数

// 定
// interface StorageConfig {
//   browserConfig: {
//     platform: string
//     configId: string
//   }
//   headers: HeadersConfig
//   privacy: PrivacyConfig
// }

// 在 PopupList 组件中添加状态
// interface HeadersConfig {
//   blockEtag: boolean
//   enableDNT: boolean
//   disableReferer: boolean
//   spoofAcceptLang: {
//     enabled: boolean
//     value: string
//   }
//   spoofIP: {
//     enabled: boolean
//     value: string
//   }
// }

function PopupList() {
  const [showDetail, setShowDetail] = useState(true)
  const [activeTab, setActiveTab] = useState('1')

  // 从localStorage读取选中的配置
  // const loadSelectedConfig = () => {
  //   const savedConfig = localStorage.getItem('antiConfig')
  //   if (savedConfig) {
  //     const config: StorageConfig = JSON.parse(savedConfig)
  //     if (config.browserConfig) {
  //       const { platform, configId } = config.browserConfig
  //       setSelectedPlatform(platform)
  //       setSelectedBrowser(configId)
  //     }
  //   }
  // }

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

  // 使用 useEffect 加载保存的值
  useEffect(() => {
    //   const initializeStates = async () => {
    //     try {
    //       // 初始化 headers
    //       const [
    //         blockEtag,
    //         enableDNT,
    //         disableReferer,
    //         spoofAcceptLangEnabled,
    //         spoofAcceptLangValue,
    //         spoofIPEnabled,
    //         spoofIPValue
    //       ] = await Promise.all([
    //         tabStorage.get(0, 'blockEtag'),
    //         tabStorage.get(0, 'enableDNT'),
    //         tabStorage.get(0, 'disableReferer'),
    //         tabStorage.get(0, 'spoofAcceptLangEnabled'),
    //         tabStorage.get(0, 'spoofAcceptLangValue'),
    //         tabStorage.get(0, 'spoofIPEnabled'),
    //         tabStorage.get(0, 'spoofIPValue')
    //       ])
    //       setHeaders({
    //         blockEtag: !!blockEtag,
    //         enableDNT: !!enableDNT,
    //         disableReferer: !!disableReferer,
    //         spoofAcceptLang: {
    //           enabled: !!spoofAcceptLangEnabled,
    //           value: spoofAcceptLangValue || 'default'
    //         },
    //         spoofIP: {
    //           enabled: !!spoofIPEnabled,
    //           value: spoofIPValue || 'random'
    //         }
    //       })
    //       // 初始化 privacy
    //       const [
    //         spoofMediaDevices,
    //         blockCSSExfil,
    //         limitHistory,
    //         protectWinName,
    //         spoofAudioContext,
    //         spoofClientRects,
    //         spoofFontFingerprint,
    //         disableWebRTC,
    //         screenSize,
    //         timeZone
    //       ] = await Promise.all([
    //         tabStorage.get(0, 'spoofMediaDevices'),
    //         tabStorage.get(0, 'blockCSSExfil'),
    //         tabStorage.get(0, 'limitHistory'),
    //         tabStorage.get(0, 'protectWinName'),
    //         tabStorage.get(0, 'spoofAudioContext'),
    //         tabStorage.get(0, 'spoofClientRects'),
    //         tabStorage.get(0, 'spoofFontFingerprint'),
    //         tabStorage.get(0, 'disableWebRTC'),
    //         tabStorage.get(0, 'screenSize'),
    //         tabStorage.get(0, 'timeZone')
    //       ])
    //       setPrivacy({
    //         spoofMediaDevices: !!spoofMediaDevices,
    //         blockCSSExfil: !!blockCSSExfil,
    //         limitHistory: !!limitHistory,
    //         protectWinName: !!protectWinName,
    //         spoofAudioContext: !!spoofAudioContext,
    //         spoofClientRects: !!spoofClientRects,
    //         spoofFontFingerprint: !!spoofFontFingerprint,
    //         disableWebRTC: !!disableWebRTC,
    //         screenSize: screenSize || 'default',
    //         timeZone: timeZone || 'default'
    //       })
    //       // 初始化平台和浏览器选择
    //       const [platform, browser, userAgent] = await Promise.all([
    //         tabStorage.get(0, 'selectedPlatform'),
    //         tabStorage.get(0, 'selectedBrowser'),
    //         tabStorage.get(0, 'userAgent')
    //       ])
    //       setSelectedPlatform(platform || 'windows')
    //       setSelectedBrowser(browser || '')
    //       // 如果没有存储的 userAgent，但有选中的浏览器，则重新生成
    //       if (!userAgent && browser) {
    //         const [osId, browserId] = browser.split('_')
    //         const platformProfiles = profiles[
    //           platform as keyof typeof profiles
    //         ] as Profile[]
    //         const os = platformProfiles.find((p: Profile) => p.id === osId)
    //         if (os && browserId) {
    //           const newUserAgent = UA.getUA(browserId, os)
    //           tabStorage.set(0, { userAgent: newUserAgent })
    //         }
    //       }
    //     } catch (e) {
    //       console.error('Error initializing states:', e)
    //     }
    //   }
    //   initializeStates()
  }, [])

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
