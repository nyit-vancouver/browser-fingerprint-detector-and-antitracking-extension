import {
  acceptLanguage,
  dnt,
  etag,
  ifNoneMatch,
  referer,
  userAgent,
  xForwardedFor
} from '@/config/responseHeaders'

const MAP: Record<string, chrome.declarativeNetRequest.ModifyHeaderInfo> = {
  etag: etag,
  'user-agent': userAgent,
  'accept-language': acceptLanguage,
  referer: referer,
  dnt: dnt,
  'x-forwarded-for': xForwardedFor,
  'if-none-match': ifNoneMatch
}

const getRequestHeaders = (
  data: Record<string, any>
  // preRequestHeaders?: chrome.declarativeNetRequest.ModifyHeaderInfo[]
) => {
  console.log('getRequestHeaders', data)
  const headers: chrome.declarativeNetRequest.ModifyHeaderInfo[] = []

  Object.entries(data).forEach(([key, value]) => {
    // 从MAP中获取对应的header配置
    const rule = {
      ...MAP[key]
    }
    // 如果value存在，则将value赋值给header
    if (rule.operation === 'set' && value) {
      rule.value = value
    }
    console.log('rules', rule)

    headers.push(rule)
  })
  console.log('new headers', headers)

  // if (preRequestHeaders) {
  //   preRequestHeaders.forEach((item) => {
  //     // 如果preRequestHeaders中的header在headers中不存在，则push到headers中
  //     if (!headers.some((i) => i.header === item.header)) {
  //       headers.push({ ...item })
  //     }
  //   })
  // }
  console.log('headers', headers)
  return headers
}

export const getRule = (
  data: Record<string, any>,
  tabIds: number[]
  // preRule?: chrome.declarativeNetRequest.Rule
) => {
  console.log('getRule', data, tabIds)
  const requestHeaders = getRequestHeaders(
    data
    // preRule?.action?.requestHeaders
  )
  return {
    id: Math.floor(Math.random() * Math.pow(10, 9)),
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS, // 参考：https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RuleActionType
      requestHeaders
    },
    condition: {
      tabIds,
      urlFilter: '*://*/*',
      resourceTypes: [
        chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
        chrome.declarativeNetRequest.ResourceType.WEBSOCKET,
        chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
        chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
        chrome.declarativeNetRequest.ResourceType.IMAGE,
        chrome.declarativeNetRequest.ResourceType.STYLESHEET,
        chrome.declarativeNetRequest.ResourceType.SCRIPT,
        chrome.declarativeNetRequest.ResourceType.FONT,
        chrome.declarativeNetRequest.ResourceType.OBJECT,
        chrome.declarativeNetRequest.ResourceType.MEDIA,
        chrome.declarativeNetRequest.ResourceType.PING,
        chrome.declarativeNetRequest.ResourceType.CSP_REPORT,
        chrome.declarativeNetRequest.ResourceType.OTHER,
        'webbundle',
        'webtransport'
      ] as chrome.declarativeNetRequest.ResourceType[]
    }
  }
}
