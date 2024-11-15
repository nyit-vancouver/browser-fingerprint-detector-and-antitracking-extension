import React, { useState } from 'react'
import { Checkbox, Select, Input } from 'antd'
import { languages } from '@/constants/languages'

export default function HeadersSetting() {
  const [headers, setHeaders] = useState<any>({
    blockEtag: false,
    enableDNT: false,
    disableReferer: false,
    spoofAcceptLang: {
      enabled: false,
      value: 'default'
    },
    spoofIP: {
      enabled: false,
      value: 'random'
    }
  })
  const updateHeaders = (newHeaders: any) => {
    setHeaders(newHeaders)
    // tabStorage.set(0, {
    //   blockEtag: newHeaders.blockEtag,
    //   enableDNT: newHeaders.enableDNT,
    //   disableReferer: newHeaders.disableReferer,
    //   spoofAcceptLangEnabled: newHeaders.spoofAcceptLang.enabled,
    //   spoofAcceptLangValue: newHeaders.spoofAcceptLang.value,
    //   spoofIPEnabled: newHeaders.spoofIP.enabled,
    //   spoofIPValue: newHeaders.spoofIP.value
    // })
  }

  return (
    <div className="headers-content p-4">
      <h2 className="text-lg font-bold mb-4">Headers</h2>

      <div className="space-y-4">
        <div className="flex items-center">
          <Checkbox
            checked={headers.enableDNT}
            onChange={(e) =>
              updateHeaders({ ...headers, enableDNT: e.target.checked })
            }
          >
            Enable DNT (Do Not Track)
          </Checkbox>
        </div>

        <div className="flex items-center">
          <Checkbox
            checked={headers.blockEtag}
            onChange={(e) =>
              updateHeaders({ ...headers, blockEtag: e.target.checked })
            }
          >
            Prevent Etag tracking
          </Checkbox>
        </div>

        <div className="flex flex-col space-y-2">
          <Checkbox
            checked={headers.spoofAcceptLang.enabled}
            onChange={(e) =>
              updateHeaders({
                ...headers,
                spoofAcceptLang: {
                  ...headers.spoofAcceptLang,
                  enabled: e.target.checked
                }
              })
            }
          >
            Spoof Accept Language
          </Checkbox>

          {headers.spoofAcceptLang.enabled && (
            <div className="ml-6">
              <Select
                className="w-48"
                value={headers.spoofAcceptLang.value}
                onChange={(value) =>
                  updateHeaders({
                    ...headers,
                    spoofAcceptLang: { ...headers.spoofAcceptLang, value }
                  })
                }
              >
                <Select.Option value="default">Default</Select.Option>
                {languages.map((lang) => (
                  <Select.Option key={lang.code} value={lang.value}>
                    {lang.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Checkbox
            checked={headers.spoofIP.enabled}
            onChange={(e) =>
              updateHeaders({
                ...headers,
                spoofIP: {
                  ...headers.spoofIP,
                  enabled: e.target.checked,
                  // 如果取消选中，重置为默认值
                  value: e.target.checked ? headers.spoofIP.value : 'random'
                }
              })
            }
          >
            Spoof X-Forwarded-For/Via IP
          </Checkbox>

          {headers.spoofIP.enabled && (
            <div className="ml-6 flex flex-col space-y-2">
              <Select
                className="w-48"
                value={headers.spoofIP.value === 'random' ? 'random' : 'custom'}
                onChange={(value) =>
                  updateHeaders({
                    ...headers,
                    spoofIP: {
                      ...headers.spoofIP,
                      value:
                        value === 'random'
                          ? 'random'
                          : headers.spoofIP.value === 'random'
                            ? ''
                            : headers.spoofIP.value
                    }
                  })
                }
              >
                <Select.Option value="random">Random IP</Select.Option>
                <Select.Option value="custom">Custom IP</Select.Option>
              </Select>

              {headers.spoofIP.value !== 'random' && (
                <Input
                  className="w-48"
                  placeholder="Enter IP address"
                  value={
                    headers.spoofIP.value === 'random'
                      ? ''
                      : headers.spoofIP.value
                  }
                  onChange={() =>
                    updateHeaders({
                      ...headers
                      // spoofIP: { ...headers.spoofIP, value: e.target.value }
                    })
                  }
                />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <Checkbox
            checked={headers.disableReferer}
            onChange={(e) =>
              updateHeaders({ ...headers, disableReferer: e.target.checked })
            }
          >
            Disable referer
          </Checkbox>
        </div>
      </div>
    </div>
  )
}
