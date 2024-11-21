export default async function sendStorageToContent(tabId: number) {
  async function getStorageData() {
    // 获取当前存储的数据
    try {
      const res = (await chrome.storage.session.get()) || {}
      console.log('Storage get res', res)
      const data = res[`__antiTracking_config_${tabId}`]
      console.log('Storage get data', data)
      if (!data || JSON.stringify(data) === '{}') {
        return
      }
      return data
    } catch (e) {
      console.error('error', e)
    }
  }
  async function initLog() {
    const domain = new URL(window.location.href).hostname
    const logs =
      (await chrome.storage.local.get('__antiTracking_log'))[
        '__antiTracking_log'
      ] || {}
    // 只记录当前访问的次数
    await chrome.storage.local.set({
      __antiTracking_log: {
        ...logs,
        [domain]: {
          _timestamp: Date.now()
        }
      }
    })
  }
  async function writeLogs(paramNames: string[]) {
    console.log('writeLogs', paramNames)
    const domain = new URL(window.location.href).hostname
    const logs =
      (await chrome.storage.local.get('__antiTracking_log'))[
        '__antiTracking_log'
      ] || {}
    const urlLogs = { ...logs[domain] }
    console.log('write log', domain, logs, urlLogs)
    for (const paramName of paramNames) {
      urlLogs[paramName] = urlLogs[paramName] ? urlLogs[paramName] + 1 : 1
    }
    await chrome.storage.local.set({
      __antiTracking_log: {
        ...logs,
        [domain]: {
          ...urlLogs
        }
      }
    })
  }

  async function handleGetLogs() {
    const logs =
      (await chrome.storage.local.get('__antiTracking_log'))[
        '__antiTracking_log'
      ] || {}
    const event = new CustomEvent('dashboardLogs', {
      detail: {
        data: logs
      }
    })
    window.dispatchEvent(event)
  }

  // 获取当前存储的数据
  const data = await getStorageData()
  // 初始化日志
  initLog()
  const event = new CustomEvent('tabStorage', {
    detail: {
      data
    }
  })
  // 派发自定义事件，使 content.js 可以接收到存储数据
  window.dispatchEvent(event)

  // 监听 `writeLogs` 事件, 并写入日志
  window.addEventListener('writeLogs', (event: Event) => {
    const customEvent = event as CustomEvent
    console.log('Received data in writeLog:', customEvent.detail)
    const { paramNames } = customEvent.detail
    writeLogs(paramNames)
  })

  window.addEventListener('getLogs', handleGetLogs)
}
