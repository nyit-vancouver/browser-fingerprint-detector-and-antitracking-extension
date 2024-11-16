import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { List, Switch, Tooltip } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import { tabStorage } from '@/utils/TabStorage'

export default function Home() {
  const [switchValue, setSwitchValue] = useState(false)

  const handleSwitch = useCallback(async (checked: boolean) => {
    console.log(`switch to ${checked}`)
    setSwitchValue(checked)

    if (checked) {
      // TODO: randomize
      // canvas/webgl/audiocontext 必设置
      // user-agent
      // hardwareConcurrency/deviceMemory
      // window.screen.width, window.screen.height 和 window.devicePixelRatio
      // new Date().getTimezoneOffset() 获取的时区偏移量
      //navigator.language 和 navigator.languages
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
  }, [])

  const init = useCallback(async () => {
    const header = (await tabStorage.get()) || {}
    console.log('init header', header)
    setSwitchValue(JSON.stringify(header) !== '{}')
  }, [])

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
