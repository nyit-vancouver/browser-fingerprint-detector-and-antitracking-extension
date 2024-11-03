import { sendMessage } from './sendMessage'
import { storage } from './storage'
import {
  MODIFIED_REQ_HEADERS,
  ALL_MODIFIED_FINGERPRINTS
} from '@/config/constants'

// TabStorage 用来处理header/其他fingerprint数据的存储
// call background.js来处理header的设置/删除，其他数据直接存储在localStorage

export class TabStorage {
  constructor() {}

  set(
    currentTabId: number,
    data: Record<(typeof ALL_MODIFIED_FINGERPRINTS)[number], any>
  ) {
    console.log('set', data)
    const res: Record<(typeof MODIFIED_REQ_HEADERS)[number], any> = {}
    Object.entries(data).forEach(([key, value]) => {
      if (MODIFIED_REQ_HEADERS.includes(key)) {
        // call background.js
        res[key] = value
      }
    })
    storage.set(currentTabId, data)
    if (JSON.stringify(res) !== '{}') {
      // call background.js
      sendMessage('setHeader', currentTabId, res)
    }
  }

  get(currentTabId: number, key: (typeof ALL_MODIFIED_FINGERPRINTS)[number]) {
    console.log('get', key)
    return storage.get(currentTabId, key)
  }

  delete(
    currentTabId: number,
    keys: (typeof ALL_MODIFIED_FINGERPRINTS)[number][]
  ) {
    console.log('delete', keys)
    const res: (typeof MODIFIED_REQ_HEADERS)[number][] = []
    keys.forEach((key) => {
      if (MODIFIED_REQ_HEADERS.includes(key)) {
        // call background.js
        res.push(key)
      }
    })
    storage.delete(currentTabId, keys)
    sendMessage('deleteHeader', currentTabId, res)
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
