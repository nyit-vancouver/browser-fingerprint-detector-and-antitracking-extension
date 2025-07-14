import { Checkbox, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import { COLOR_DEPTHS } from '@/constants/colorDepths'
import { CORES } from '@/constants/cores'
import { DEVICE_MEMORIES } from '@/constants/deviceMemories'
import { SCREEN_SIZES } from '@/constants/screenSizes'
import { TIMEZONES } from '@/constants/timezones'
import { tabStorage } from '@/utils/TabStorage'
import {
  getRandomizedAudioConfigs,
  getRandomizedCanvasOffsets,
  getRandomizedWebglConfigs,
} from '@/utils/getRandomizedConfigs'

import type { Setting, Settings } from './type'

export default function OtherSetting() {
  const [settings, setSettings] = useState<Settings>({
    spoofCanvas: false,
    spoofWebgl: false,
    spoofAudioContext: false,
    disableWebRTC: false,
    screenSize: undefined,
    timeZone: undefined,
    colorDepth: undefined,
    hardwareConcurrency: undefined,
    deviceMemory: undefined,
  })

  const updateStorage = useCallback(async (newSettings: Settings) => {
    console.log('updateStorage', newSettings)
    // delete keys that are not enabled
    const deletedKeys =
      Object.entries(newSettings)
        .filter(([, value]) => !value)
        .map(([key]) => key) || []
    if (deletedKeys.length > 0) {
      await tabStorage.delete(deletedKeys)
    }
    // set keys that are enabled
    const storageData: Record<string, any> = {}
    if (newSettings.spoofCanvas) {
      storageData.spoofCanvas = getRandomizedCanvasOffsets()
    }
    if (newSettings.spoofWebgl) {
      storageData.spoofWebgl = getRandomizedWebglConfigs()
    }
    if (newSettings.spoofAudioContext) {
      storageData.spoofAudioContext = getRandomizedAudioConfigs()
    }
    if (newSettings.disableWebRTC) {
      storageData.disableWebRTC = newSettings.disableWebRTC
    }
    if (newSettings.screenSize) {
      const [width, height] = newSettings.screenSize.split('x')
      storageData.width = Number(width)
      storageData.height = Number(height)
    }
    if (newSettings.timeZone) {
      storageData.timezone = newSettings.timeZone
    }
    if (newSettings.colorDepth) {
      storageData.colorDepth = newSettings.colorDepth
    }
    if (newSettings.hardwareConcurrency) {
      storageData.hardwareConcurrency = newSettings.hardwareConcurrency
    }
    if (newSettings.deviceMemory) {
      storageData.deviceMemory = newSettings.deviceMemory
    }
    await tabStorage.set(storageData)
  }, [])

  const updateSetting = useCallback(
    (newSetting: Setting) => {
      const newSettings = { ...settings, ...newSetting }
      setSettings(newSettings)

      updateStorage(newSettings)
    },
    [settings, updateStorage],
  )

  const init = useCallback(async () => {
    const settings = await tabStorage.get([
      'spoofCanvas',
      'spoofWebgl',
      'spoofAudioContext',
      'disableWebRTC',
      'width',
      'height',
      'timezone',
      'colorDepth',
      'hardwareConcurrency',
      'deviceMemory',
    ])
    console.log('init settings', settings)
    setSettings({
      spoofCanvas: !!settings.spoofCanvas,
      spoofWebgl: !!settings.spoofWebgl,
      spoofAudioContext: !!settings.spoofAudioContext,
      disableWebRTC: !!settings.disableWebRTC,
      screenSize:
        settings.width && settings.height
          ? `${settings.width}x${settings.height}`
          : undefined,
      timeZone: settings.timezone,
      colorDepth: settings.colorDepth,
      hardwareConcurrency: settings.hardwareConcurrency,
      deviceMemory: settings.deviceMemory,
    })
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return (
    <div className="settings-content">
      <h1 className="tab-title mb-0">Other Settings</h1>
      <div className="flex">
        <div className="flex-1">
          <div className="flex flex-col my-4">
            <div>Screen Size</div>
            <Select
              allowClear
              placeholder="Please select"
              className="w-48"
              value={settings.screenSize}
              onChange={(value) => updateSetting({ screenSize: value })}
            >
              {SCREEN_SIZES.map((size) => (
                <Select.Option key={size} value={size}>
                  {size}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col my-4">
            <div>Timezone</div>
            <Select
              allowClear
              placeholder="Please select"
              className="w-48"
              value={settings.timeZone}
              onChange={(value) => updateSetting({ timeZone: value })}
            >
              {TIMEZONES.map((tz) => (
                <Select.Option key={tz.zone} value={tz.zone}>
                  {`${tz.zone} (${tz.offset}) `}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col my-4">
            <div>Device Memory</div>
            <Select
              allowClear
              placeholder="Please select"
              className="w-48"
              value={settings.deviceMemory}
              onChange={(value) => updateSetting({ deviceMemory: value })}
            >
              {DEVICE_MEMORIES.map((dm) => (
                <Select.Option key={dm} value={dm}>
                  {`${dm} GB`}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex-1 ml-3">
          <div className="flex flex-col my-4">
            <div>Color Depth</div>
            <Select
              allowClear
              placeholder="Please select"
              className="w-48"
              value={settings.colorDepth}
              onChange={(value) => updateSetting({ colorDepth: value })}
            >
              {COLOR_DEPTHS.map((cd) => (
                <Select.Option key={cd} value={cd}>
                  {`${cd} bits`}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col my-4">
            <div>CPU Cores</div>
            <Select
              allowClear
              placeholder="Please select"
              className="w-48"
              value={settings.hardwareConcurrency}
              onChange={(value) =>
                updateSetting({ hardwareConcurrency: value })
              }
            >
              {CORES.map((core) => (
                <Select.Option key={core} value={core}>
                  {core}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <Checkbox
          checked={settings.spoofCanvas}
          onChange={(e) =>
            updateSetting({
              spoofCanvas: e.target.checked,
            })
          }
        >
          Spoof Canvas fingerprint
        </Checkbox>
      </div>
      <div className="flex items-center mb-2">
        <Checkbox
          checked={settings.spoofWebgl}
          onChange={(e) =>
            updateSetting({
              spoofWebgl: e.target.checked,
            })
          }
        >
          Spoof WebGL fingerprint
        </Checkbox>
      </div>
      <div className="flex items-center mb-2">
        <Checkbox
          checked={settings.spoofAudioContext}
          onChange={(e) =>
            updateSetting({
              spoofAudioContext: e.target.checked,
            })
          }
        >
          Spoof Audio fingerprint
        </Checkbox>
      </div>
      <div className="flex items-center mb-2">
        <Checkbox
          checked={settings.disableWebRTC}
          onChange={(e) => updateSetting({ disableWebRTC: e.target.checked })}
        >
          Disable WebRTC
        </Checkbox>
      </div>
    </div>
  )
}
