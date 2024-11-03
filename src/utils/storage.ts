export class Storage {
  constructor() {}

  async set(currentTabId: number, data: Record<string, any>) {
    // TODO：key设置类型
    console.log('Storage set', data)
    const res =
      (await chrome.storage.local.get(`antiTracking_${currentTabId}`)) || {}
    console.log('Storage set get1', res)
    await chrome.storage.local.set({
      [`antiTracking_${currentTabId}`]: {
        ...(res[`antiTracking_${currentTabId}`] || {}),
        ...data
      }
    })
  }

  async get(currentTabId: number, key: string) {
    console.log('Storage get', key)
    const res = (await chrome.storage.local.get()) || {}
    console.log('Storage get res', res)
    return res[`antiTracking_${currentTabId}`]?.[key]
  }

  async delete(currentTabId: number, keys: string[]) {
    console.log('Storage delete', keys)
    const res = {
      ...((await chrome.storage.local.get(`antiTracking_${currentTabId}`)) ||
        {})
    }
    keys.forEach((key) => {
      delete res[`antiTracking_${currentTabId}`]?.[key]
    })
    console.log('Storage delete res', res)
    await chrome.storage.local.set({
      [`antiTracking_${currentTabId}`]: {
        ...res[`antiTracking_${currentTabId}`]
      }
    })
  }

  async deleteAll(currentTabId: number) {
    console.log('Storage delete all')
    await chrome.storage.local.remove(`antiTracking_${currentTabId}`)
  }
}

export const storage = new Storage()
