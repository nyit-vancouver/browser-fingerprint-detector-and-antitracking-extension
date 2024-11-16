import React, { useState } from 'react'

import { PLATFORMS } from '@/constants/platforms'
import { UA } from '@/constants/ua'
import { tabStorage } from '@/utils/TabStorage'
import { getName } from '@/utils/getName'

export type Platform = 'macos' | 'ios' | 'windows' | 'linux' | 'android'

export default function PlatformSetting() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('windows')
  const [selectedBrowser, setSelectedBrowser] = useState<string>('')

  // 修改 getBrowserList 函数
  const getBrowserList = (platformKey: Platform) => {
    console.log('Current platform:', platformKey)
    const platformProfiles = PLATFORMS[platformKey]
    console.log('Platform profiles:', platformProfiles)

    if (!platformProfiles) {
      console.log('No profiles found for platform:', platformKey)
      return []
    }

    const browserList = platformProfiles
      .flatMap((profile) => {
        console.log('Processing profile:', profile.name)
        console.log('Available browsers:', profile.browsers)

        return profile.browsers.map((browser: string) => {
          const name = getName(profile.name, browser)
          const configId = `${profile.id}_${browser}`
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

  const handleBrowserSelect = (platformKey: Platform, configId: string) => {
    setSelectedBrowser(configId)
    const platformProfiles = PLATFORMS[platformKey]

    // 获取 userAgent
    const [osId, browserId] = configId.split('_')
    const os = platformProfiles.find((p) => p.id === osId)

    let userAgent = ''
    if (os && browserId) {
      userAgent = UA.getUA(browserId, os)
    }

    // 存储选中的平台、浏览器和 userAgent
    tabStorage.set({
      // selectedPlatform: platform,
      selectedBrowser: configId,
      userAgent: userAgent
    })
  }

  return (
    <div className="platform-content">
      <div className="platform-selection">
        <div className="platform-buttons">
          {(Object.keys(PLATFORMS) as Platform[]).map((platform) => (
            <button
              key={platform}
              className={`platform-button ${selectedPlatform === platform ? 'active' : ''}`}
              onClick={() => {
                setSelectedPlatform(platform)
                // 切换平台时清除已选择的浏览器
                setSelectedBrowser('')
                // 更新存储
                tabStorage.set({
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
                onChange={() => handleBrowserSelect(selectedPlatform, configId)}
              />
              <label htmlFor={configId}>{name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
