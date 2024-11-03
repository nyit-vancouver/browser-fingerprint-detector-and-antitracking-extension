import { MODIFIED_REQ_HEADERS } from '@/config/constants'

export function sendMessage(
  msgType: string,
  tabId: number,
  data?: Record<string, any> | (typeof MODIFIED_REQ_HEADERS)[number][][]
) {
  console.log('sendMessage', msgType, tabId, data)
  chrome.runtime.sendMessage({
    type: msgType,
    tabId,
    data
  })
}
