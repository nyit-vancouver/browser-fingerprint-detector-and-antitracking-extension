import { MODIFIED_REQ_HEADERS } from '@/config/constants'
import { getCurrentTabId } from '@/utils/getCurrentTabId'

import { sendMessage } from './sendMessage'
import { storage } from './storage'

// TabStorage 用来处理header/其他fingerprint数据的存储
// call background.js来处理header的设置/删除，其他数据直接存储在localStorage

export class TabStorage {
  async set(
    // currentTabId: number,
    data: Record<string, any>
    // overwrite = false
  ) {
    console.log('set', data)
    const currentTabId = await getCurrentTabId()
    if (!currentTabId) {
      console.error('tab id is undefined')
      return
    }
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
    // currentTabId: number,
    key?: string | string[]
  ) {
    console.log('get', key)
    const currentTabId = await getCurrentTabId()
    if (!currentTabId) {
      console.error('tab id is undefined')
      return
    }
    return await storage.get(currentTabId, key)
  }

  async delete(
    // currentTabId: number,
    keys: string[]
  ) {
    console.log('delete', keys)
    const currentTabId = await getCurrentTabId()
    if (!currentTabId) {
      console.error('tab id is undefined')
      return
    }
    const res: (typeof MODIFIED_REQ_HEADERS)[number][] = []
    keys.forEach((key) => {
      if (MODIFIED_REQ_HEADERS.includes(key)) {
        // call background.js
        res.push(key)
      }
    })
    // TODO: 不一定call background.js
    sendMessage('deleteHeader', currentTabId, res)
    await storage.delete(currentTabId, keys)
  }

  async deleteAll(currentTabId: number) {
    console.log('delete all')
    // call background.js
    // TODO: 不一定call background.js
    sendMessage('deleteAll', currentTabId)
    await storage.deleteAll(currentTabId)
  }
  // TODO: random数据
}
export const tabStorage = new TabStorage()
