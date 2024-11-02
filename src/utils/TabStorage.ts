import { sendMessage } from './sendMessage'
import { storage } from './storage'

// TabStorage 用来处理header/其他fingerprint数据的存储
// call background.js来处理header的设置/删除，其他数据直接存储在localStorage

export class TabStorage {
  constructor() {}
  set(currentTabId: number, key: string, value: any) {
    // TODO：key设置类型
    console.log('set', key, value)

    if (key === 'user-agent') {
      // TODO
      // call background.js
      sendMessage('setHeader', currentTabId, key, value)
    }
    storage.set(currentTabId, key, value)
  }
  get(currentTabId: number, key: string) {
    console.log('get', key)
    return storage.get(currentTabId, key)
  }
  delete(currentTabId: number, key: string) {
    console.log('delete', key)

    storage.delete(currentTabId, key)
    if (key === 'user-agent') {
      // TODO
      // call background.js
      sendMessage('deleteHeader', currentTabId, key)
    }
  }
  deleteAll(currentTabId: number) {
    console.log('delete all')
    storage.deleteAll(currentTabId)
    // call background.js
    sendMessage('deleteAll', currentTabId)
  }
  // TODO: random数据
}
export const tabStorage = new TabStorage()
