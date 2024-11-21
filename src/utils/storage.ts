export class Storage {
  async set(currentTabId: number, data: Record<string, any>) {
    console.log('Storage set', data)
    const res =
      (await chrome.storage.session.get(
        `__antiTracking_config_${currentTabId}`
      )) || {}
    await chrome.storage.session.set({
      [`__antiTracking_config_${currentTabId}`]: {
        ...(res[`__antiTracking_config_${currentTabId}`] || {}),
        ...data
      }
    })
  }

  async get(currentTabId: number, key?: string | string[]) {
    console.log('Storage get', key, currentTabId)
    const res = (await chrome.storage.session.get()) || {}
    const multiRes: Record<string, any> = {}
    if (Array.isArray(key)) {
      key.forEach((k) => {
        multiRes[k] = res[`__antiTracking_config_${currentTabId}`]?.[k]
      })
      return multiRes
    }
    console.log('Storage get res', res)
    return key
      ? res[`__antiTracking_config_${currentTabId}`]?.[key]
      : res[`__antiTracking_config_${currentTabId}`]
  }

  async delete(currentTabId: number, keys: string[]) {
    console.log('Storage delete', keys, currentTabId)
    const res = {
      ...((await chrome.storage.session.get(
        `__antiTracking_config_${currentTabId}`
      )) || {})
    }
    keys.forEach((key) => {
      delete res[`__antiTracking_config_${currentTabId}`]?.[key]
    })
    console.log('Storage delete res', res)
    // 如果删除后为空，则删除整个对象
    if (JSON.stringify(res[`__antiTracking_config_${currentTabId}`]) === '{}') {
      await chrome.storage.session.remove(
        `__antiTracking_config_${currentTabId}`
      )
      return
    }
    await chrome.storage.session.set({
      [`__antiTracking_config_${currentTabId}`]: {
        ...res[`__antiTracking_config_${currentTabId}`]
      }
    })
  }

  async deleteAll(currentTabId: number) {
    console.log('Storage delete all', currentTabId)
    await chrome.storage.session.remove(`__antiTracking_config_${currentTabId}`)
  }
}

export const storage = new Storage()
