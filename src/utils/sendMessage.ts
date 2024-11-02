export function sendMessage(
  msgType: string,
  tabId: number,
  header?: string,
  value?: any
) {
  chrome.runtime.sendMessage({
    type: msgType,
    tabId,
    requestHeader: {
      header,
      operation: chrome.declarativeNetRequest?.HeaderOperation?.SET, //还可以是 append remove
      value
    }
  })
}
