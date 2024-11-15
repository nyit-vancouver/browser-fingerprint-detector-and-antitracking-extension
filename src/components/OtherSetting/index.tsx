import { Checkbox, Select } from 'antd'
import React, { useState } from 'react'

import { timezones } from '@/constants/timezones'
import { tabStorage } from '@/utils/TabStorage'

import { PrivacyConfig } from './type'

export default function OtherSetting() {
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
            onChange={(value) => updatePrivacy({ ...privacy, timeZone: value })}
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
