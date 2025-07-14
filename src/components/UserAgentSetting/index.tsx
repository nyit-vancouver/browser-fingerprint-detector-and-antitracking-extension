import { Button } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { PLATFORM_MAP, USER_AGENTS } from '@/constants/userAgents'
import type { Platform, UserAgent } from '@/constants/userAgents'
import { tabStorage } from '@/utils/TabStorage'
import { getUserAgentDetails } from '@/utils/getUserAgentDetails'

export default function PlatformSetting() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('windows')
  const [selectedBrowser, setSelectedBrowser] = useState<string>('')

  const handleBrowserSelect = useCallback((info: UserAgent) => {
    setSelectedBrowser(info.id)
    const data = getUserAgentDetails(info)
    tabStorage.set(data)
  }, [])

  const platformList = useMemo(
    () => USER_AGENTS.filter((ua) => ua.type === selectedPlatform),
    [selectedPlatform]
  )

  const handlePlatformClick = useCallback((platform: Platform) => {
    setSelectedPlatform(platform)
  }, [])

  const handleClear = useCallback(() => {
    setSelectedBrowser('')
    tabStorage.delete(['user-agent', 'userAgentData'])
  }, [])

  const init = useCallback(async () => {
    const ua = await tabStorage.get('user-agent')
    console.log('init ua', ua)

    const info = USER_AGENTS.find((item) => item.userAgent === ua)

    setSelectedPlatform(info?.type || 'windows')
    setSelectedBrowser(info?.id || '')
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return (
    <div className="platform-content">
      <h1 className="tab-title">UserAgent Settings</h1>
      <div className="platform-selection">
        <div className="platform-buttons">
          {Object.entries(PLATFORM_MAP).map(([key, name]) => (
            <button
              key={key}
              className={`platform-button ${selectedPlatform === key ? 'active' : ''}`}
              onClick={() => handlePlatformClick(key as Platform)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex flex-row-reverse w-full">
          <Button type="link" size={'small'} onClick={handleClear}>
            Clear
          </Button>
        </div>
        <div className="browser-list">
          {platformList.map((item) => {
            const { id, name } = item
            return (
              <div
                key={id}
                className={`browser-item ${selectedBrowser === id ? 'selected' : ''}`}
                onClick={() => handleBrowserSelect(item)}
              >
                <input
                  type="radio"
                  id={id}
                  name="browser"
                  checked={selectedBrowser === id}
                  readOnly
                />
                <label htmlFor={id}>{name}</label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
