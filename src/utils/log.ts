class Log {
  constructor() {}

  async write(paramName: string) {
    console.log('write log')
    const url = window.location.href // TODO: domain
    const logs =
      (await chrome.storage.local.get('__antiTracking_log'))[
        '__antiTracking_log'
      ] || {}
    const urlLogs = logs[url] || {}
    await chrome.storage.local.set({
      __antiTracking_log: {
        ...logs,
        [url]: {
          ...urlLogs,
          [paramName]: urlLogs[paramName] ? urlLogs[paramName] + 1 : 1
        }
      }
    })
  }
}

export const log = new Log()
