export class Storage {
  async set(currentTabId: number, data: Record<string, any>) {
    // TODO：key设置类型
    console.log('Storage set', data)
    const res =
      (await chrome.storage.local.get(
        `__antiTracking_config_${currentTabId}`
      )) || {}
    console.log('Storage set get1', res)
    await chrome.storage.local.set({
      [`__antiTracking_config_${currentTabId}`]: {
        ...(res[`__antiTracking_config_${currentTabId}`] || {}),
        ...data
      }
    })
  }

  async get(currentTabId: number, key?: string) {
    console.log('Storage get', key, currentTabId)
    const res = (await chrome.storage.local.get()) || {}
    console.log('Storage get res', res)
    return key
      ? res[`__antiTracking_config_${currentTabId}`]?.[key]
      : res[`__antiTracking_config_${currentTabId}`]
  }

  async delete(currentTabId: number, keys: string[]) {
    console.log('Storage delete', keys, currentTabId)
    const res = {
      ...((await chrome.storage.local.get(
        `__antiTracking_config_${currentTabId}`
      )) || {})
    }
    keys.forEach((key) => {
      delete res[`__antiTracking_config_${currentTabId}`]?.[key]
    })
    console.log('Storage delete res', res)
    await chrome.storage.local.set({
      [`__antiTracking_config_${currentTabId}`]: {
        ...res[`__antiTracking_config_${currentTabId}`]
      }
    })
  }

  async deleteAll(currentTabId: number) {
    console.log('Storage delete all', currentTabId)
    await chrome.storage.local.remove(`__antiTracking_config`)
  }
}

export const storage = new Storage()
