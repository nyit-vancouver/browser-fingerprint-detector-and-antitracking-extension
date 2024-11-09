export default async function sendStorageToContent(tabId: number) {
  async function writeLog(paramName: string) {
    console.log('writeLog', paramName)
    const domain = new URL(window.location.href).hostname
    const logs =
      (await chrome.storage.local.get('__antiTracking_log'))[
        '__antiTracking_log'
      ] || {}
    const urlLogs = logs[domain] || {}
    console.log('write log', domain, logs, urlLogs)
    await chrome.storage.local.set({
      __antiTracking_log: {
        ...logs,
        [domain]: {
          ...urlLogs,
          [paramName]: urlLogs[paramName] ? urlLogs[paramName] + 1 : 1
        }
      }
    })
  }

  // 获取当前存储的数据
  const res = (await chrome.storage.local.get()) || {}
  console.log('Storage get res', res)
  const data = res[`__antiTracking_config_${tabId}`]
  if (!data || JSON.stringify(data) === '{}') {
    return
  }
  const event = new CustomEvent('tabStorage', {
    detail: {
      data
    }
  })
  // 派发自定义事件，使 content.js 可以接收到存储数据
  window.dispatchEvent(event)

  // 监听 `writeLog` 事件, 并写入日志
  window.addEventListener('writeLog', (event: Event) => {
    const customEvent = event as CustomEvent
    console.log('Received data in writeLog:', customEvent.detail)
    const { paramName } = customEvent.detail
    writeLog(paramName)
  })
}
