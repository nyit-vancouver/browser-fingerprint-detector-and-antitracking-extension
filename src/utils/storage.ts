export class Storage {
  constructor() {}
  async set(currentTabId: number, key: string, value: any) {
    // TODO：key设置类型
    console.log('Storage set', key, value)
    const res =
      (await chrome.storage.local.get(`antiTracking_${currentTabId}`)) || {}
    console.log('Storage set get1', res)
    await chrome.storage.local.set({
      [`antiTracking_${currentTabId}`]: {
        ...res,
        [key]: value
      }
    })
  }
  async get(currentTabId: number, key: string) {
    console.log('Storage get', key)
    const res = (await chrome.storage.local.get()) || {}
    console.log('Storage get res', res)
    return res[`antiTracking_${currentTabId}`]?.[key]
  }
  async delete(currentTabId: number, key: string) {
    console.log('Storage delete', key)
    const res =
      (await chrome.storage.local.get(`antiTracking_${currentTabId}`)) || {}
    delete res[key]
    await chrome.storage.local.set({
      [`antiTracking_${currentTabId}`]: {
        ...res
      }
    })
  }
  async deleteAll(currentTabId: number) {
    console.log('Storage delete all')
    await chrome.storage.local.remove(`antiTracking_${currentTabId}`)
  }
}
export const storage = new Storage()
