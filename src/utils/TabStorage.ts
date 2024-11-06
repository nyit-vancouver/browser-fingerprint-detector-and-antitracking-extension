import { sendMessage } from './sendMessage'
import { storage } from './storage'
import {
  MODIFIED_REQ_HEADERS,
  ALL_MODIFIED_FINGERPRINTS
} from '@/config/constants'

// TabStorage 用来处理header/其他fingerprint数据的存储
// call background.js来处理header的设置/删除，其他数据直接存储在localStorage

export class TabStorage {
  async set(
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
    if (JSON.stringify(res) !== '{}') {
      // call background.js
      sendMessage('setHeader', currentTabId, res)
    }
    await storage.set(currentTabId, data)
  }

  async get(
    currentTabId: number,
    key: (typeof ALL_MODIFIED_FINGERPRINTS)[number]
  ) {
    console.log('get', key)
    return await storage.get(currentTabId, key)
  }

  async delete(
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
    sendMessage('deleteHeader', currentTabId, res)
    await storage.delete(currentTabId, keys)
  }

  async deleteAll(currentTabId: number) {
    console.log('delete all')
    // call background.js
    sendMessage('deleteAll', currentTabId)
    await storage.deleteAll(currentTabId)
  }
  // TODO: random数据
}
export const tabStorage = new TabStorage()
