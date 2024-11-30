export default async function sendStorageToContent(tabId: number) {
  const envIP = process.env.REACT_APP_IP || 'localhost'
  const envPort = process.env.REACT_APP_PORT || '3000'
  const URL_BLACK_LIST = [
    `localhost:${envPort}/dashboard`,
    `${envIP}:${envPort}/dashboard`,
  ]
  // black list: tracking dashboard
  function getLogKeyName() {
    const { host, pathname } = new URL(window.location.href)
    return `${host}${pathname}`
  }
  async function getStorageData() {
    // get current storage data
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
    const url = getLogKeyName()
    if (URL_BLACK_LIST.includes(url)) {
      return
    }
    const logs =
      (await chrome.storage.local.get('__antiTracking_log'))[
        '__antiTracking_log'
      ] || {}
    // Only record the current visit count
    await chrome.storage.local.set({
      __antiTracking_log: {
        ...logs,
        [url]: {
          _timestamp: Date.now(),
        },
      },
    })
  }
  async function writeLogs(paramNames: string[]) {
    console.log('writeLogs', paramNames)
    const url = getLogKeyName()
    if (URL_BLACK_LIST.includes(url)) {
      return
    }
    const logs =
      (await chrome.storage.local.get('__antiTracking_log'))[
        '__antiTracking_log'
      ] || {}
    const urlLogs = { ...logs[url] }
    console.log('write log', url, logs, urlLogs)
    for (const paramName of paramNames) {
      urlLogs[paramName] = urlLogs[paramName] ? urlLogs[paramName] + 1 : 1
    }
    await chrome.storage.local.set({
      __antiTracking_log: {
        ...logs,
        [url]: {
          ...urlLogs,
        },
      },
    })
  }

  async function handleGetLogs() {
    const logs =
      (await chrome.storage.local.get('__antiTracking_log'))[
        '__antiTracking_log'
      ] || {}
    const event = new CustomEvent('dashboardLogs', {
      detail: {
        data: logs,
      },
    })
    window.dispatchEvent(event)
  }

  // Get the current stored data
  const data = await getStorageData()
  // init log
  if (data) {
    initLog()
    const event = new CustomEvent('tabStorage', {
      detail: {
        data,
      },
    })
    // send data to content
    window.dispatchEvent(event)
  }
  // listen for writeLogs event
  window.addEventListener('writeLogs', async (event: Event) => {
    const customEvent = event as CustomEvent
    console.log('Received data in writeLog:', customEvent.detail)
    const { paramNames } = customEvent.detail
    await writeLogs(paramNames)
  })

  window.addEventListener('getLogs', handleGetLogs)
}
