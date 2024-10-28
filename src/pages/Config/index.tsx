import React, { useState, useEffect } from 'react'
import { Card, Select, Checkbox, Layout, Typography, Space, Switch } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

const { Option } = Select
const { Content } = Layout
const { Title } = Typography

// 定义配置类型
interface ConfigState {
  profile: string
  browser: string
  enableDNT: boolean
  preventEtag: boolean
  spoofAcceptLanguage: boolean
  language: string
  spoofXForwardedFor: boolean
  ipSpoofing: string
  disableReferer: boolean
  fingerprintMethod: string
  blockMediaDevices: boolean
  blockCSSExfil: boolean
  limitTabHistory: boolean
  protectKeyboardFingerprint: boolean
  keyboardFingerprintValue: string
  protectWindowName: boolean
  spoofAudioContext: boolean
  spoofClientRects: boolean
  spoofFontFingerprint: boolean
  screenSize: string
  timezone: string
  randomProfile: boolean
  changeInterval: string
  disableWebRTC: boolean
  deleteCookiesOnClose: boolean
}

// 默认配置
const defaultConfig: ConfigState = {
  profile: 'windows',
  browser: 'win7edge109',
  enableDNT: false,
  preventEtag: false,
  spoofAcceptLanguage: false,
  language: 'default',
  spoofXForwardedFor: false,
  ipSpoofing: 'randomIp',
  disableReferer: false,
  fingerprintMethod: 'injection',
  blockMediaDevices: false,
  blockCSSExfil: false,
  limitTabHistory: false,
  protectKeyboardFingerprint: false,
  keyboardFingerprintValue: '1',
  protectWindowName: false,
  spoofAudioContext: false,
  spoofClientRects: false,
  spoofFontFingerprint: false,
  screenSize: 'default',
  timezone: 'default',
  randomProfile: false,
  changeInterval: 'never',
  disableWebRTC: false,
  deleteCookiesOnClose: false
}

// 从 localStorage 获取配置
const getConfig = (): ConfigState => {
  const storedConfig = localStorage.getItem('fingerprintConfig')
  return storedConfig ? JSON.parse(storedConfig) : defaultConfig
}

// 更新 localStorage 中的配置
const updateConfig = (config: ConfigState) => {
  localStorage.setItem('fingerprintConfig', JSON.stringify(config))
}

function Config() {
  const [config, setConfig] = useState<ConfigState>(getConfig())

  useEffect(() => {
    setConfig(getConfig())
  }, [])

  // 处理配置更改的函数
  const handleConfigChange = (key: keyof ConfigState, value: any) => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    updateConfig(newConfig)
    console.log(`Updated ${key}:`, value)
  }

  return (
    <Layout>
      <Content
        style={{
          padding: '24px 40px',
          marginLeft: '220px',
          backgroundColor: '#f0f2f5'
        }}
      >
        <Title level={2} style={{ marginBottom: '24px' }}>
          Fingerprint Configuration
        </Title>

        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          <Card
            title={
              <>
                <SettingOutlined /> Profile
              </>
            }
            hoverable
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>Random Profile</span>
                <Switch
                  checked={config.randomProfile}
                  onChange={(checked) => {
                    handleConfigChange('randomProfile', checked)
                    // try call background.js
                    chrome.runtime.sendMessage({
                      type: 'setHeader',
                      requestHeaders: [
                        {
                          header: 'myheader',
                          operation:
                            chrome.declarativeNetRequest?.HeaderOperation?.SET, //还可以是 append remove 等
                          value: '123456'
                        }
                      ]
                    })
                    // TODO: 第一步，use TabStorage to save the config
                    // TODO: 第二步，random数据
                  }}
                />
              </div>
              {/* <Select 
                defaultValue="1min"
                value={config.changeInterval}
                onChange={(value) => handleConfigChange('changeInterval', value)}
                style={{ width: '100%' }}
              >
                <Option value="1min" >Every minute</Option>
                <Option value="5min">Every 5 minutes</Option>
                <Option value="10min">Every 10 minutes</Option>
                <Option value="20min">Every 20 minutes</Option>
                <Option value="30min">Every 30 minutes</Option>
                <Option value="1hour">Every hour</Option>
              </Select> */}
            </Space>
          </Card>

          <Card
            title={
              <>
                <SettingOutlined /> Headers
              </>
            }
            hoverable
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Checkbox
                checked={config.enableDNT}
                onChange={(e) =>
                  handleConfigChange('enableDNT', e.target.checked)
                }
              >
                Enable DNT (Do Not Track)
              </Checkbox>
              <Checkbox
                checked={config.preventEtag}
                onChange={(e) =>
                  handleConfigChange('preventEtag', e.target.checked)
                }
              >
                Prevent Etag tracking
              </Checkbox>
              <Checkbox
                checked={config.spoofAcceptLanguage}
                onChange={(e) =>
                  handleConfigChange('spoofAcceptLanguage', e.target.checked)
                }
              >
                Spoof Accept Language
              </Checkbox>

              <Checkbox
                checked={config.spoofXForwardedFor}
                onChange={(e) =>
                  handleConfigChange('spoofXForwardedFor', e.target.checked)
                }
              >
                Spoof X-Forwarded-For/Via IP
              </Checkbox>

              <Checkbox
                checked={config.disableReferer}
                onChange={(e) =>
                  handleConfigChange('disableReferer', e.target.checked)
                }
              >
                Disable referer
              </Checkbox>
            </Space>
          </Card>

          <Card
            title={
              <>
                <SettingOutlined /> Options
              </>
            }
            hoverable
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Checkbox
                checked={config.blockMediaDevices}
                onChange={(e) =>
                  handleConfigChange('blockMediaDevices', e.target.checked)
                }
              >
                Block media devices
              </Checkbox>
              <Checkbox
                checked={config.blockCSSExfil}
                onChange={(e) =>
                  handleConfigChange('blockCSSExfil', e.target.checked)
                }
              >
                Block CSS Exfil
              </Checkbox>
              <Checkbox
                checked={config.limitTabHistory}
                onChange={(e) =>
                  handleConfigChange('limitTabHistory', e.target.checked)
                }
              >
                Limit tab history
              </Checkbox>
              <Space>
                <Checkbox
                  checked={config.protectKeyboardFingerprint}
                  onChange={(e) =>
                    handleConfigChange(
                      'protectKeyboardFingerprint',
                      e.target.checked
                    )
                  }
                >
                  Protect keyboard fingerprint
                </Checkbox>
              </Space>
              <Checkbox
                checked={config.protectWindowName}
                onChange={(e) =>
                  handleConfigChange('protectWindowName', e.target.checked)
                }
              >
                Protect window name
              </Checkbox>
              <Checkbox
                checked={config.spoofAudioContext}
                onChange={(e) =>
                  handleConfigChange('spoofAudioContext', e.target.checked)
                }
              >
                Spoof audio context
              </Checkbox>
              <Checkbox
                checked={config.spoofClientRects}
                onChange={(e) =>
                  handleConfigChange('spoofClientRects', e.target.checked)
                }
              >
                Spoof client rects
              </Checkbox>
              <Checkbox
                checked={config.spoofFontFingerprint}
                onChange={(e) =>
                  handleConfigChange('spoofFontFingerprint', e.target.checked)
                }
              >
                Spoof font fingerprint
              </Checkbox>
              <div>
                <Typography.Text strong>Screen Size</Typography.Text>
                <Select
                  value={config.screenSize}
                  onChange={(value) => handleConfigChange('screenSize', value)}
                  style={{ width: '100%' }}
                >
                  <Option value="default">Default</Option>
                  {/* 添加更多屏幕尺寸选项 */}
                </Select>
              </div>
              <div>
                <Typography.Text strong>Timezone</Typography.Text>
                <Select
                  value={config.timezone}
                  onChange={(value) => handleConfigChange('timezone', value)}
                  style={{ width: '100%' }}
                >
                  <Option value="default">Default</Option>
                  {/* 添加更多时区选项 */}
                </Select>
              </div>
              <Checkbox
                checked={config.disableWebRTC}
                onChange={(e) =>
                  handleConfigChange('disableWebRTC', e.target.checked)
                }
              >
                Disable WebRTC
              </Checkbox>
              <Checkbox
                checked={config.deleteCookiesOnClose}
                onChange={(e) =>
                  handleConfigChange('deleteCookiesOnClose', e.target.checked)
                }
              >
                Delete cookies and site data after window is closed
              </Checkbox>
            </Space>
          </Card>
        </Space>
      </Content>
    </Layout>
  )
}

export default Config
