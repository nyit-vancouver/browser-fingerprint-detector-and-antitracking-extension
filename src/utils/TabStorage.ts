import { REQEST_HEADERS } from '@/constants/requestHeaders'
import { getCurrentTabId } from '@/utils/getCurrentTabId'

import { sendMessage } from './sendMessage'
import { storage } from './storage'

// TabStorage is used to handle the storage of header/other fingerprint data
// Call background.js to handle header setting/deletion, other data is stored directly in localStorage

export class TabStorage {
  async set(data: Record<string, any>) {
    console.log('set', data)
    const currentTabId = await getCurrentTabId()
    if (!currentTabId) {
      console.error('tab id is undefined')
      return
    }
    const res: Record<(typeof REQEST_HEADERS)[number], any> = {}
    Object.entries(data).forEach(([key, value]) => {
      if (REQEST_HEADERS.includes(key)) {
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

  async get(key?: string | string[]) {
    console.log('get', key)
    const currentTabId = await getCurrentTabId()
    if (!currentTabId) {
      console.error('tab id is undefined')
      return
    }
    return await storage.get(currentTabId, key)
  }

  async delete(keys: string[]) {
    console.log('delete', keys)
    const currentTabId = await getCurrentTabId()
    if (!currentTabId) {
      console.error('tab id is undefined')
      return
    }
    const res: (typeof REQEST_HEADERS)[number][] = []
    keys.forEach((key) => {
      if (REQEST_HEADERS.includes(key)) {
        // call background.js
        res.push(key)
      }
    })
    // TODO: don't always call background.js
    sendMessage('deleteHeader', currentTabId, res)
    await storage.delete(currentTabId, keys)
  }

  async deleteAll() {
    console.log('delete all')
    const currentTabId = await getCurrentTabId()
    if (!currentTabId) {
      console.error('tab id is undefined')
      return
    }
    // call background.js
    // TODO: don't always call background.js
    sendMessage('deleteAll', currentTabId)
    await storage.deleteAll(currentTabId)
  }
}
export const tabStorage = new TabStorage()
