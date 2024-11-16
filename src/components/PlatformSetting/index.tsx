import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { PLATFORMS, USER_AGENTS } from '@/constants/userAgents'
import type { Platform, UserAgent } from '@/constants/userAgents'
import { tabStorage } from '@/utils/TabStorage'

export default function PlatformSetting() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('windows')
  const [selectedBrowser, setSelectedBrowser] = useState<string>('')

  const handleBrowserSelect = useCallback(({ userAgent, id }: UserAgent) => {
    setSelectedBrowser(id)
    tabStorage.set({
      'user-agent': userAgent
    })
  }, [])

  const platformList = useMemo(
    () => USER_AGENTS.filter((ua) => ua.type === selectedPlatform),
    [selectedPlatform]
  )

  const handlePlatformClick = useCallback(
    (platform: Platform) => {
      setSelectedPlatform(platform)
    },
    [platformList]
  )

  const init = useCallback(async () => {
    const ua = await tabStorage.get('user-agent')
    console.log('init ua', ua)

    const info = USER_AGENTS.find((item) => item.userAgent === ua)

    setSelectedPlatform(info?.type || 'windows')
    setSelectedBrowser(info?.id || '')
  }, [])

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="platform-content">
      <div className="platform-selection">
        <div className="platform-buttons">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              className={`platform-button ${selectedPlatform === platform ? 'active' : ''}`}
              onClick={() => handlePlatformClick(platform)}
            >
              {platform}
            </button>
          ))}
        </div>
        <div className="browser-list">
          {platformList.map((item) => {
            const { id, name } = item
            return (
              <div
                key={id}
                className="browser-item"
                onChange={() => handleBrowserSelect(item)}
              >
                <input
                  type="radio"
                  name="browser"
                  value={id}
                  checked={selectedBrowser === id}
                />
                <label>{name}</label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
