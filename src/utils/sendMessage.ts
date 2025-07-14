export function sendMessage(
  msgType: string,
  tabId: number,
  data?: Record<string, any> | string[][],
) {
  console.log('sendMessage', msgType, tabId, data)
  chrome.runtime.sendMessage({
    type: msgType,
    tabId,
    data,
  })
}

export function sendMessageToContent(tabId: number, data: Record<string, any>) {
  console.log('sendMessageToContent', tabId, data)
  chrome.tabs.sendMessage(tabId, {
    tabId,
    data,
  })
}
