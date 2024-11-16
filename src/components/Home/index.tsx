import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { List, Switch, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'

import { tabStorage } from '@/utils/TabStorage'

// import { getCurrentTabId } from '@/utils/getCurrentTabId'

export default function Home() {
  const [switchValue, setSwitchValue] = useState(false)

  const handleSwitch = async (checked: boolean) => {
    console.log(`switch to ${checked}`)
    setSwitchValue(checked)
    // const currentTabId = await getCurrentTabId()
    // if (!currentTabId) {
    //   console.error('tab id is undefined')
    //   return
    // }
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
      tabStorage.set(data)
    } else
      tabStorage.delete([
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
    // const currentTabId = await getCurrentTabId()
    // if (!currentTabId) {
    //   console.error('tab id is undefined')
    //   return
    // }
    // TODO: 如果有SessionStorage，读取SessionStorage中的数据
    const header = await tabStorage.get('user-agent')
    console.log('init header', header)
    setSwitchValue(!!header)
  }

  useEffect(() => {
    init()
  }, [])

  return (
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
}
