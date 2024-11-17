import { Checkbox, Input, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

// import { debounce } from 'throttle-debounce'
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/constants/languages'
import { tabStorage } from '@/utils/TabStorage'
import { getLanguage } from '@/utils/getLanguage'

import { Headers, NewHeader } from './type'

const DEFAULT_IP = '111.8.203.1'

export default function HeadersSetting() {
  const [headers, setHeaders] = useState<Headers>({
    blockEtag: false,
    enableDNT: false,
    disableReferer: false,
    spoofAcceptLang: {
      enabled: false,
      value: DEFAULT_LANGUAGE.value
    },
    spoofIP: {
      enabled: false,
      value: DEFAULT_IP
    }
  })
  const updateStorage = useCallback(async (res: Headers) => {
    console.log('updateStorage', res)
    // 删除相关的设置
    const deletedKeys =
      Object.entries(res)
        .filter(([, value]) =>
          typeof value === 'boolean' ? !value : !value.enabled
        )
        .map(([key]) => key) || []
    if (deletedKeys.length > 0) {
      await tabStorage.delete(deletedKeys)
    }
    // 只存储需要的数据
    const storageData: Record<string, any> = {}
    if (res.disableReferer) {
      storageData.referer = res.disableReferer
    }
    if (res.enableDNT) {
      storageData.dnt = '1'
    }
    if (res.blockEtag) {
      storageData.etag = res.blockEtag
      storageData['if-none-match'] = res.blockEtag
    }
    if (res.spoofIP.enabled) {
      storageData['x-forwarded-for'] = res.spoofIP.value
    }
    if (res.spoofAcceptLang.enabled) {
      storageData['accept-language'] = res.spoofAcceptLang.value

      const language = getLanguage(res.spoofAcceptLang.value)

      storageData.language = language.code
      storageData.languages = language.nav
    }
    tabStorage.set(storageData)
  }, [])

  // const debouncedStoreData = useCallback(debounce(1000, updateStorage), [])

  const updateHeaders = useCallback(
    (newHeaders: NewHeader) => {
      const res = {
        ...headers,
        ...newHeaders
      }
      setHeaders(res)
      console.log('updateHeaders', newHeaders, res)
      updateStorage(res) // TODO：debounce
    },
    [headers]
  )

  const init = useCallback(async () => {
    const headers = await tabStorage.get([
      'referer',
      'dnt',
      'etag',
      'if-none-match',
      'x-forwarded-for',
      'accept-language',
      'language'
    ])
    console.log('init headers', headers)
    setHeaders({
      blockEtag: !!headers.etag,
      enableDNT: headers.dnt === '1',
      disableReferer: !!headers.referer,
      spoofAcceptLang: {
        enabled: !!headers['accept-language'],
        value: getLanguage(headers['accept-language']).value
      },
      spoofIP: {
        enabled: !!headers['x-forwarded-for'],
        value: headers['x-forwarded-for'] || DEFAULT_IP
      }
    })
  }, [])

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="headers-content p-4">
      <h2 className="text-lg font-bold mb-4">Request Headers Settings</h2>
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
            onChange={(e) => updateHeaders({ blockEtag: e.target.checked })}
          >
            Prevent Etag tracking
          </Checkbox>
        </div>

        <div className="flex items-center">
          <Checkbox
            checked={headers.disableReferer}
            onChange={(e) =>
              updateHeaders({ disableReferer: e.target.checked })
            }
          >
            Disable referer
          </Checkbox>
        </div>

        <div className="flex flex-col space-y-2">
          <Checkbox
            checked={headers.spoofAcceptLang.enabled}
            onChange={(e) =>
              updateHeaders({
                spoofAcceptLang: {
                  enabled: e.target.checked,
                  value: e.target.checked
                    ? DEFAULT_LANGUAGE.value
                    : headers.spoofAcceptLang.value
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
                    spoofAcceptLang: { ...headers.spoofAcceptLang, value }
                  })
                }
              >
                {LANGUAGES.map((lang) => (
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
                spoofIP: {
                  enabled: e.target.checked,
                  value: e.target.checked ? DEFAULT_IP : headers.spoofIP.value
                }
              })
            }
          >
            Spoof X-Forwarded-For/Via IP
          </Checkbox>

          {headers.spoofIP.enabled && (
            <Input
              className="w-48"
              placeholder="Enter IP address"
              value={headers.spoofIP.value}
              onChange={(e) =>
                updateHeaders({
                  spoofIP: { ...headers.spoofIP, value: e.target.value }
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
