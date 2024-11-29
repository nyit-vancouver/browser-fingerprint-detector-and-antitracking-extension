import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { List, Switch, Tooltip } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import { tabStorage } from '@/utils/TabStorage'
import { getRandomizedConfigs } from '@/utils/getRandomizedConfigs'

export default function Home() {
  const [switchValue, setSwitchValue] = useState(false)

  const handleSwitch = useCallback((checked: boolean) => {
    setSwitchValue(checked)

    if (checked) {
      const config = getRandomizedConfigs()
      tabStorage.set(config)
    } else tabStorage.deleteAll()
  }, [])

  const init = useCallback(async () => {
    const header = (await tabStorage.get()) || {}
    console.log('init header', header)
    setSwitchValue(JSON.stringify(header) !== '{}')
  }, [])

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
          <h1 className="tab-title ml-2 mb-0">Anti-Tracking</h1>
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
