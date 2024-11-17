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

  useEffect(() => {
    init()
  }, [init])

  return (
    <List>
      <List.Item>
        <div className="popup-list-item">
          <ShieldCheckIcon className="icon home-shield-icon" />
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
}
