import React, { useEffect, useState } from 'react'
import { List, Switch, Tabs, Tooltip, Checkbox, Select, Input } from 'antd'
import {
  ShieldCheckIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  ComputerDesktopIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/solid'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { tabStorage } from '@/utils/TabStorage'
import { getCurrentTabId } from '@/utils/getCurrentTabId'
import Layout from '../Layout'
import _isDev from '@/utils/getEnv'
import { languages } from '@/constants/languages'
import { timezones } from '@/constants/timezones'

import './index.scss'

const { TabPane } = Tabs

// 添加 BrowserVersions 常量
const BrowserVersions: any = {
  edg: {
    desktop: '129.0.0.0',
    desktopChrome: '129.0.0.0',
    deprecated: '109.0.1518.55',
    deprecatedChrome: '109.0.0.0',
    android: '129.0.0.0',
    androidChrome: '129.0.0.0'
  },
  esr: { desktop: '128' },
  esr2: { desktop: '115' },
  ff: { desktop: '131', mobile: '131' },
  gcr: {
    desktop: '129.0.0.0',
    deprecated: '109.0.0.0',
    ios: '129.0.6668.69',
    android: '129.0.0.0'
  },
  sf: { desktop: '18', ios1: '15.6', ios2: '16.5', ios3: '18' }
}

// 添加 profiles 常量
const profiles = {
  windows: [
    {
      id: 'win1',
      name: 'Win 7',
      nav: {
        version: '5.0 (Windows)',
        oscpu: 'Windows NT 6.1; Win64; x64',
        platform: 'Win32'
      },
      screenOffset: -40,
      browsers: ['edg', 'esr2', 'gcr', 'ie']
    },
    {
      id: 'win2',
      name: 'Win 8',
      nav: {
        version: '5.0 (Windows)',
        oscpu: 'Windows NT 6.2; Win64; x64',
        platform: 'Win32'
      },
      screenOffset: -40,
      browsers: ['edg', 'esr2', 'gcr', 'ie']
    },
    {
      id: 'win3',
      name: 'Win 8.1',
      nav: {
        version: '5.0 (Windows)',
        oscpu: 'Windows NT 6.3; Win64; x64',
        platform: 'Win32'
      },
      screenOffset: -40,
      browsers: ['edg', 'esr2', 'gcr', 'ie']
    },
    {
      id: 'win4',
      name: 'Win 10',
      nav: {
        version: '5.0 (Windows)',
        oscpu: 'Windows NT 10.0; Win64; x64',
        platform: 'Win32'
      },
      screenOffset: -30,
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr', 'ie']
    }
  ],
  macOS: [
    //  Use last 3 versions of macOS
    {
      id: 'mac1',
      name: 'macOS 12',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr', 'sf'],
      nav: {
        version: '',
        oscpu: 'Intel Mac OS X 10.15',
        platform: 'MacIntel'
      },
      screenOffset: -23,
      uaPlatform: 'Macintosh; Intel Mac OS X 10_15_7'
    },
    {
      id: 'mac2',
      name: 'macOS 13',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr', 'sf'],
      nav: {
        version: '',
        oscpu: 'Intel Mac OS X 10.15',
        platform: 'MacIntel'
      },
      screenOffset: -23,
      uaPlatform: 'Macintosh; Intel Mac OS X 10_15_7'
    },
    {
      id: 'mac3',
      name: 'macOS 14',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr', 'sf'],
      nav: {
        version: '',
        oscpu: 'Intel Mac OS X 10.15',
        platform: 'MacIntel'
      },
      screenOffset: -23,
      uaPlatform: 'Macintosh; Intel Mac OS X 10_15_7'
    }
  ],
  linux: [
    {
      id: 'lin1',
      name: 'Linux',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr'],
      nav: {
        version: '5.0 (X11)',
        oscpu: 'Linux x86_64',
        platform: 'Linux x86_64'
      },
      screenOffset: -45, // kde + maia panel
      uaPlatform: 'X11; Linux x86_64'
    },
    {
      id: 'lin2',
      name: 'Fedora Linux',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr'],
      nav: {
        version: '5.0 (X11)',
        oscpu: 'Linux x86_64',
        platform: 'Linux x86_64'
      },
      screenOffset: -27, // gnome
      uaPlatform: 'X11; Fedora; Linux x86_64'
    },
    {
      id: 'lin3',
      name: 'Ubuntu Linux',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr'],
      nav: {
        version: '5.0 (X11)',
        oscpu: 'Linux x86_64',
        platform: 'Linux x86_64'
      },
      screenOffset: -27, // gnome
      uaPlatform: 'X11; Linux x86_64'
    }
  ],
  iOS: [
    {
      id: 'ios1',
      name: 'iOS 16',
      browsers: ['gcrm', 'gcrt', 'sfm', 'sft'],
      uaPlatform: '16_7_2'
    },
    {
      id: 'ios2',
      name: 'iOS 17',
      browsers: ['gcrm', 'gcrt', 'sfm', 'sft'],
      uaPlatform: '17_7'
    },
    {
      id: 'ios3',
      name: 'iOS 18',
      browsers: ['gcrm', 'gcrt', 'sfm', 'sft'],
      uaPlatform: '18_1'
    }
  ],
  android: [
    {
      id: 'and1',
      name: 'Android 11',
      browsers: ['edgm', 'ffm', 'fft', 'gcrm', 'gcrt'],
      uaPlatform: 'Android 11'
    },
    {
      id: 'and2',
      name: 'Android 12',
      browsers: ['edgm', 'ffm', 'fft', 'gcrm', 'gcrt'],
      uaPlatform: 'Android 12'
    },
    {
      id: 'and3',
      name: 'Android 13',
      browsers: ['edgm', 'ffm', 'fft', 'gcrm', 'gcrt'],
      uaPlatform: 'Android 13'
    },
    {
      id: 'and4',
      name: 'Android 14',
      browsers: ['edgm', 'ffm', 'fft', 'gcrm', 'gcrt'],
      uaPlatform: 'Android 14'
    }
  ]
}

// 添加 getName 函数
const getName = (os: string, browser: string) => {
  let osId: string

  if (browser === 'edg') {
    switch (os) {
      case 'Win 7':
      case 'Win 8':
      case 'Win 8.1':
        return `${os} - Edge ${BrowserVersions.edg.deprecated.split('.')[0]}`
      default:
        return `${os} - Edge ${BrowserVersions.edg.desktop.split('.')[0]}`
    }
  } else if (browser === 'edgm') {
    return `${os} - Edge ${BrowserVersions.edg.android.split('.')[0]} (Phone)`
  } else if (browser === 'esr') {
    return `${os} - Firefox ${BrowserVersions.esr.desktop} ESR`
  } else if (browser === 'esr2') {
    return `${os} - Firefox ${BrowserVersions.esr2.desktop} ESR`
  } else if (browser === 'ff') {
    return `${os} - Firefox ${BrowserVersions.ff.desktop}`
  } else if (browser === 'ffm') {
    return `${os} - Firefox ${BrowserVersions.ff.mobile} (Phone)`
  } else if (browser === 'fft') {
    return `${os} - Firefox ${BrowserVersions.ff.mobile} (Tablet)`
  } else if (browser === 'gcr') {
    switch (os) {
      case 'Win 7':
      case 'Win 8':
      case 'Win 8.1':
        return `${os} - Chrome ${BrowserVersions.gcr.deprecated.split('.')[0]}`
      default:
        return `${os} - Chrome ${BrowserVersions.gcr.desktop.split('.')[0]}`
    }
  } else if (browser === 'gcrm') {
    let key = os.charAt(0) === 'i' ? 'ios' : 'android'
    return `${os} - Chrome ${BrowserVersions.gcr[key].split('.')[0]} (Phone)`
  } else if (browser === 'gcrt') {
    let key = os.charAt(0) === 'i' ? 'ios' : 'android'
    return `${os} - Chrome ${BrowserVersions.gcr[key].split('.')[0]} (Tablet)`
  } else if (browser === 'ie') {
    return `${os} - Internet Explorer 11`
  } else if (browser === 'sf') {
    return `${os} - Safari ${BrowserVersions.sf.desktop.split('.')[0]}`
  } else if (browser === 'sfm') {
    switch (os) {
      case 'iOS 16':
        osId = 'ios1'
        break
      case 'iOS 17':
        osId = 'ios2'
        break
      case 'iOS 18':
        osId = 'ios3'
        break
      default:
        osId = 'ios1'
        break
    }
    return `${os} - Safari ${BrowserVersions.sf[osId].split('.')[0]} (iPhone)`
  } else if (browser === 'sft') {
    switch (os) {
      case 'iOS 16':
        osId = 'ios1'
        break
      case 'iOS 17':
        osId = 'ios2'
        break
      case 'iOS 18':
        osId = 'ios3'
        break
      default:
        osId = 'ios1'
        break
    }
    return `${os} - Safari ${BrowserVersions.sf[osId].split('.')[0]} (iPad)`
  }
}

// 定
interface StorageConfig {
  browserConfig: {
    platform: string
    configId: string
  }
  headers: HeadersConfig
  privacy: PrivacyConfig
}

// 在 PopupList 组件中添加状态
interface HeadersConfig {
  blockEtag: boolean
  enableDNT: boolean
  disableReferer: boolean
  spoofAcceptLang: {
    enabled: boolean
    value: string
  }
  spoofIP: {
    enabled: boolean
    value: string
  }
}

// 添加隐私配置接口
interface PrivacyConfig {
  spoofMediaDevices: boolean
  blockCSSExfil: boolean
  limitHistory: boolean
  protectWinName: boolean
  spoofAudioContext: boolean
  spoofClientRects: boolean
  spoofFontFingerprint: boolean
  disableWebRTC: boolean
  screenSize: string
  timeZone: string
}

function PopupList() {
  const [showDetail, setShowDetail] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)
  const [activeTab, setActiveTab] = useState('1')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('windows')
  const [selectedBrowser, setSelectedBrowser] = useState<string>('')
  const [headers, setHeaders] = useState<HeadersConfig>({
    blockEtag: false,
    enableDNT: false,
    disableReferer: false,
    spoofAcceptLang: {
      enabled: false,
      value: 'default'
    },
    spoofIP: {
      enabled: false,
      value: 'random'
    }
  })
  const [privacy, setPrivacy] = useState<PrivacyConfig>({
    spoofMediaDevices: false,
    blockCSSExfil: false,
    limitHistory: false,
    protectWinName: false,
    spoofAudioContext: false,
    spoofClientRects: false,
    spoofFontFingerprint: false,
    disableWebRTC: false,
    screenSize: 'default',
    timeZone: 'default'
  })

  const updateHeaders = (newHeaders: HeadersConfig) => {
    setHeaders(newHeaders)
    tabStorage.set(0, {
      blockEtag: newHeaders.blockEtag,
      enableDNT: newHeaders.enableDNT,
      disableReferer: newHeaders.disableReferer,
      spoofAcceptLangEnabled: newHeaders.spoofAcceptLang.enabled,
      spoofAcceptLangValue: newHeaders.spoofAcceptLang.value,
      spoofIPEnabled: newHeaders.spoofIP.enabled,
      spoofIPValue: newHeaders.spoofIP.value
    })
  }

  // 生成配置ID
  const generateConfigId = (profileId: string, browser: string) => {
    return `${profileId}_${browser}`
  }

  // 从localStorage读取选中的配置
  const loadSelectedConfig = () => {
    const savedConfig = localStorage.getItem('antiConfig')
    if (savedConfig) {
      const config: StorageConfig = JSON.parse(savedConfig)
      if (config.browserConfig) {
        const { platform, configId } = config.browserConfig
        setSelectedPlatform(platform)
        setSelectedBrowser(configId)
      }
    }
  }

  // 处理浏览器配置选择
  const handleBrowserSelect = (platform: string, configId: string) => {
    setSelectedBrowser(configId)
    tabStorage.set(0, {
      selectedPlatform: platform,
      selectedBrowser: configId
    })
  }

  // 在组件加载时读取保存的配置
  useEffect(() => {
    loadSelectedConfig()
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
        'if-none-match': false,
        height: 2855,
        width: 5120,
        language: 'en-US',
        colorDepth: 48,
        hardwareConcurrency: 18,
        deviceMemory: 1,
        timezone: 'Asia/Shanghai'
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
        'if-none-match',
        'height',
        'width',
        'language',
        'colorDepth',
        'hardwareConcurrency',
        'deviceMemory',
        'timezone'
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

  // 更新隐私设置
  const updatePrivacy = (newPrivacy: PrivacyConfig) => {
    setPrivacy(newPrivacy)
    tabStorage.set(0, {
      spoofMediaDevices: newPrivacy.spoofMediaDevices,
      blockCSSExfil: newPrivacy.blockCSSExfil,
      limitHistory: newPrivacy.limitHistory,
      protectWinName: newPrivacy.protectWinName,
      spoofAudioContext: newPrivacy.spoofAudioContext,
      spoofClientRects: newPrivacy.spoofClientRects,
      spoofFontFingerprint: newPrivacy.spoofFontFingerprint,
      disableWebRTC: newPrivacy.disableWebRTC,
      screenSize: newPrivacy.screenSize,
      timeZone: newPrivacy.timeZone
    })
  }

  // 添加隐私设置渲染函数
  const renderPrivacyContent = () => {
    return (
      <div className="privacy-content p-4">
        <h2 className="text-lg font-bold mb-4">Privacy Settings</h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <Checkbox
              checked={privacy.spoofMediaDevices}
              onChange={(e) =>
                updatePrivacy({
                  ...privacy,
                  spoofMediaDevices: e.target.checked
                })
              }
            >
              Block media devices
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={privacy.blockCSSExfil}
              onChange={(e) =>
                updatePrivacy({ ...privacy, blockCSSExfil: e.target.checked })
              }
            >
              Block CSS Exfil
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={privacy.limitHistory}
              onChange={(e) =>
                updatePrivacy({ ...privacy, limitHistory: e.target.checked })
              }
            >
              Limit tab history
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={privacy.protectWinName}
              onChange={(e) =>
                updatePrivacy({ ...privacy, protectWinName: e.target.checked })
              }
            >
              Protect window name
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={privacy.spoofAudioContext}
              onChange={(e) =>
                updatePrivacy({
                  ...privacy,
                  spoofAudioContext: e.target.checked
                })
              }
            >
              Spoof audio context
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={privacy.spoofClientRects}
              onChange={(e) =>
                updatePrivacy({
                  ...privacy,
                  spoofClientRects: e.target.checked
                })
              }
            >
              Spoof client rects
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={privacy.spoofFontFingerprint}
              onChange={(e) =>
                updatePrivacy({
                  ...privacy,
                  spoofFontFingerprint: e.target.checked
                })
              }
            >
              Spoof font fingerprint
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={privacy.disableWebRTC}
              onChange={(e) =>
                updatePrivacy({ ...privacy, disableWebRTC: e.target.checked })
              }
            >
              Disable WebRTC
            </Checkbox>
          </div>

          <div className="flex flex-col space-y-2">
            <div>Screen Size</div>
            <Select
              className="w-48"
              value={privacy.screenSize}
              onChange={(value) =>
                updatePrivacy({ ...privacy, screenSize: value })
              }
            >
              <Select.Option value="default">Default</Select.Option>
              {[
                '1366x768',
                '1440x900',
                '1600x900',
                '1920x1080',
                '1920x1200',
                '2560x1440',
                '2560x1600',
                '3840x2160',
                '4096x2304',
                '5120x2880'
              ].map((size) => (
                <Select.Option key={size} value={size}>
                  {size}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col space-y-2">
            <div>Timezone</div>
            <Select
              className="w-48"
              value={privacy.timeZone}
              onChange={(value) =>
                updatePrivacy({ ...privacy, timeZone: value })
              }
            >
              <Select.Option value="default">Default</Select.Option>
              {timezones.map((tz) => (
                <Select.Option key={tz.zone} value={tz.zone}>
                  {`(${tz.offset}) ${tz.zone}`}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    )
  }

  // 使用 useEffect 加载保存的值
  useEffect(() => {
    const initializeStates = async () => {
      try {
        // 初始化 headers
        const [
          blockEtag,
          enableDNT,
          disableReferer,
          spoofAcceptLangEnabled,
          spoofAcceptLangValue,
          spoofIPEnabled,
          spoofIPValue
        ] = await Promise.all([
          tabStorage.get(0, 'blockEtag'),
          tabStorage.get(0, 'enableDNT'),
          tabStorage.get(0, 'disableReferer'),
          tabStorage.get(0, 'spoofAcceptLangEnabled'),
          tabStorage.get(0, 'spoofAcceptLangValue'),
          tabStorage.get(0, 'spoofIPEnabled'),
          tabStorage.get(0, 'spoofIPValue')
        ])

        setHeaders({
          blockEtag: !!blockEtag,
          enableDNT: !!enableDNT,
          disableReferer: !!disableReferer,
          spoofAcceptLang: {
            enabled: !!spoofAcceptLangEnabled,
            value: spoofAcceptLangValue || 'default'
          },
          spoofIP: {
            enabled: !!spoofIPEnabled,
            value: spoofIPValue || 'random'
          }
        })

        // 初始化 privacy
        const [
          spoofMediaDevices,
          blockCSSExfil,
          limitHistory,
          protectWinName,
          spoofAudioContext,
          spoofClientRects,
          spoofFontFingerprint,
          disableWebRTC,
          screenSize,
          timeZone
        ] = await Promise.all([
          tabStorage.get(0, 'spoofMediaDevices'),
          tabStorage.get(0, 'blockCSSExfil'),
          tabStorage.get(0, 'limitHistory'),
          tabStorage.get(0, 'protectWinName'),
          tabStorage.get(0, 'spoofAudioContext'),
          tabStorage.get(0, 'spoofClientRects'),
          tabStorage.get(0, 'spoofFontFingerprint'),
          tabStorage.get(0, 'disableWebRTC'),
          tabStorage.get(0, 'screenSize'),
          tabStorage.get(0, 'timeZone')
        ])

        setPrivacy({
          spoofMediaDevices: !!spoofMediaDevices,
          blockCSSExfil: !!blockCSSExfil,
          limitHistory: !!limitHistory,
          protectWinName: !!protectWinName,
          spoofAudioContext: !!spoofAudioContext,
          spoofClientRects: !!spoofClientRects,
          spoofFontFingerprint: !!spoofFontFingerprint,
          disableWebRTC: !!disableWebRTC,
          screenSize: screenSize || 'default',
          timeZone: timeZone || 'default'
        })

        // 初始化平台和浏览器选择
        const [platform, browser] = await Promise.all([
          tabStorage.get(0, 'selectedPlatform'),
          tabStorage.get(0, 'selectedBrowser')
        ])

        setSelectedPlatform(platform || 'windows')
        setSelectedBrowser(browser || '')
      } catch (e) {
        console.error('Error initializing states:', e)
      }
    }

    initializeStates()
  }, [])

  if (showDetail) {
    return <Layout />
  }

  const renderAntiTrackingContent = () => (
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
    </List>
  )

  const renderPlatformContent = () => {
    // 修改 getBrowserList 函数
    const getBrowserList = (platform: string) => {
      console.log('Current platform:', platform)
      const platformMap: { [key: string]: string } = {
        macos: 'macOS',
        ios: 'iOS',
        windows: 'windows',
        linux: 'linux',
        android: 'android'
      }

      const platformKey = platformMap[platform.toLowerCase()]
      const platformProfiles = profiles[platformKey as keyof typeof profiles]
      console.log('Platform profiles:', platformProfiles)

      if (!platformProfiles) {
        console.log('No profiles found for platform:', platform)
        return []
      }

      const browserList = platformProfiles
        .flatMap((profile) => {
          console.log('Processing profile:', profile.name)
          console.log('Available browsers:', profile.browsers)

          return profile.browsers.map((browser) => {
            const name = getName(profile.name, browser)
            const configId = generateConfigId(profile.id, browser)
            return {
              name,
              configId,
              profile
            }
          })
        })
        .filter(Boolean)

      console.log('Final browser list:', browserList)
      return browserList
    }

    return (
      <div className="platform-content">
        <div className="platform-selection">
          <div className="platform-buttons">
            {Object.keys(profiles).map((platform) => (
              <button
                key={platform}
                className={`platform-button ${selectedPlatform === platform ? 'active' : ''}`}
                onClick={() => {
                  setSelectedPlatform(platform)
                  // 切换平台时清除已选择的浏览器
                  setSelectedBrowser('')
                  // 更新存储
                  tabStorage.set(0, {
                    selectedPlatform: platform,
                    selectedBrowser: ''
                  })
                }}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </button>
            ))}
          </div>

          <div className="browser-list">
            {getBrowserList(selectedPlatform).map(({ name, configId }) => (
              <div key={configId} className="browser-item">
                <input
                  type="radio"
                  id={configId}
                  name="browser"
                  value={configId}
                  checked={selectedBrowser === configId}
                  onChange={() =>
                    handleBrowserSelect(selectedPlatform, configId)
                  }
                />
                <label htmlFor={configId}>{name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderSettingsContent = () => {
    return (
      <div className="headers-content p-4">
        <h2 className="text-lg font-bold mb-4">Headers</h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <Checkbox
              checked={headers.enableDNT}
              onChange={(e) =>
                updateHeaders({ ...headers, enableDNT: e.target.checked })
              }
            >
              Enable DNT (Do Not Track)
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={headers.blockEtag}
              onChange={(e) =>
                updateHeaders({ ...headers, blockEtag: e.target.checked })
              }
            >
              Prevent Etag tracking
            </Checkbox>
          </div>

          <div className="flex flex-col space-y-2">
            <Checkbox
              checked={headers.spoofAcceptLang.enabled}
              onChange={(e) =>
                updateHeaders({
                  ...headers,
                  spoofAcceptLang: {
                    ...headers.spoofAcceptLang,
                    enabled: e.target.checked
                  }
                })
              }
            >
              Spoof Accept Language
            </Checkbox>

            {headers.spoofAcceptLang.enabled && (
              <div className="ml-6">
                <Select
                  className="w-48"
                  value={headers.spoofAcceptLang.value}
                  onChange={(value) =>
                    updateHeaders({
                      ...headers,
                      spoofAcceptLang: { ...headers.spoofAcceptLang, value }
                    })
                  }
                >
                  <Select.Option value="default">Default</Select.Option>
                  {languages.map((lang) => (
                    <Select.Option key={lang.code} value={lang.value}>
                      {lang.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Checkbox
              checked={headers.spoofIP.enabled}
              onChange={(e) =>
                updateHeaders({
                  ...headers,
                  spoofIP: {
                    ...headers.spoofIP,
                    enabled: e.target.checked,
                    // 如果取消选中，重置为默认值
                    value: e.target.checked ? headers.spoofIP.value : 'random'
                  }
                })
              }
            >
              Spoof X-Forwarded-For/Via IP
            </Checkbox>

            {headers.spoofIP.enabled && (
              <div className="ml-6 flex flex-col space-y-2">
                <Select
                  className="w-48"
                  value={
                    headers.spoofIP.value === 'random' ? 'random' : 'custom'
                  }
                  onChange={(value) =>
                    updateHeaders({
                      ...headers,
                      spoofIP: {
                        ...headers.spoofIP,
                        value:
                          value === 'random'
                            ? 'random'
                            : headers.spoofIP.value === 'random'
                              ? ''
                              : headers.spoofIP.value
                      }
                    })
                  }
                >
                  <Select.Option value="random">Random IP</Select.Option>
                  <Select.Option value="custom">Custom IP</Select.Option>
                </Select>

                {headers.spoofIP.value !== 'random' && (
                  <Input
                    className="w-48"
                    placeholder="Enter IP address"
                    value={
                      headers.spoofIP.value === 'random'
                        ? ''
                        : headers.spoofIP.value
                    }
                    onChange={(e) =>
                      updateHeaders({
                        ...headers,
                        spoofIP: { ...headers.spoofIP, value: e.target.value }
                      })
                    }
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={headers.disableReferer}
              onChange={(e) =>
                updateHeaders({ ...headers, disableReferer: e.target.checked })
              }
            >
              Disable referer
            </Checkbox>
          </div>
        </div>
      </div>
    )
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
          <div className="tab-content">{renderAntiTrackingContent()}</div>
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
          <div className="tab-content">{renderPlatformContent()}</div>
        </TabPane>
        <TabPane
          tab={
            <div className="tab-icon">
              <AdjustmentsHorizontalIcon className="icon" />
            </div>
          }
          key="6"
        >
          <div className="tab-content">{renderSettingsContent()}</div>
        </TabPane>
        <TabPane
          tab={
            <div className="tab-icon">
              <Cog6ToothIcon className="icon" />
            </div>
          }
          key="7"
        >
          <div className="tab-content">{renderPrivacyContent()}</div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PopupList
