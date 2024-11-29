import {
  acceptLanguage,
  dnt,
  etag,
  ifNoneMatch,
  referer,
  userAgent,
  xForwardedFor,
} from '@/config/responseHeaders'

const MAP: Record<string, chrome.declarativeNetRequest.ModifyHeaderInfo> = {
  etag: etag,
  'user-agent': userAgent,
  'accept-language': acceptLanguage,
  referer: referer,
  dnt: dnt,
  'x-forwarded-for': xForwardedFor,
  'if-none-match': ifNoneMatch,
}

const getRequestHeaders = (data: Record<string, any>) => {
  console.log('getRequestHeaders', data)
  const headers: chrome.declarativeNetRequest.ModifyHeaderInfo[] = []

  Object.entries(data).forEach(([key, value]) => {
    // get rule by key
    const rule = {
      ...MAP[key],
    }
    // If value exists, assign value to header
    if (rule.operation === 'set' && value) {
      rule.value = value
    }
    console.log('rules', rule)

    headers.push(rule)
  })
  console.log('new headers', headers)
  return headers
}

export const getRule = (data: Record<string, any>, tabIds: number[]) => {
  console.log('getRule', data, tabIds)
  const requestHeaders = getRequestHeaders(data)
  return {
    id: Math.floor(Math.random() * Math.pow(10, 9)),
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS, // reference：https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RuleActionType
      requestHeaders,
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
        'webtransport',
      ] as chrome.declarativeNetRequest.ResourceType[],
    },
  }
}
