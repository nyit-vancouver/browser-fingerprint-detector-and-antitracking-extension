import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { List, Switch, Tooltip } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import { tabStorage } from '@/utils/TabStorage'
import { getRandomizedConfigs } from '@/utils/getRandomizedConfigs'

export default function Home() {
  const [switchValue, setSwitchValue] = useState(false)

  const handleSwitch = useCallback(async (checked: boolean) => {
    console.log(`switch to ${checked}`)
    setSwitchValue(checked)

    if (checked) {
      getRandomizedConfigs()
    } else tabStorage.deleteAll()
  }, [])

  const init = useCallback(async () => {
    const header = (await tabStorage.get()) || {}
    console.log('init header', header)
    setSwitchValue(JSON.stringify(header) !== '{}')
  }, [])

  // 处理原有功能的点击事件
  const handleClick = useCallback((page: string) => {
    window.open(`http://localhost:3000#${page}`) //chrome.runtime.getURL('options.html'))
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return (
    <>
      <List>
        <List.Item className="!pt-0">
          <div className="flex">
            <ShieldCheckIcon className="icon home-shield-icon" />
            <h1 className="tab-title ml-2 mb-0">Anti-Tracking</h1>
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
      <div className="instructions-text">
        <span className="font-bold">Instructions for Use</span>
        <br />
        The switch above has been pre-configured with an optimal default setup
        to help you mitigate digital fingerprint tracking effectively. Manual
        adjustments are not necessary under typical circumstances. However, if
        you choose to modify any settings in other tabs, please ensure you fully
        understand the implications of the changes made.
      </div>
      <div className="link-text">
        You can check your{' '}
        <span className="clickable-link" onClick={() => handleClick('info')}>
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
    </>
  )
}
