import { runtime, webRequest, storage } from 'webextension-polyfill'

runtime.onInstalled.addListener(() => {
  console.log('[background] loaded ')
})

webRequest.onSendHeaders.addListener(
  (details) => {
    const uaHeader = details.requestHeaders?.find(
      (h) => h.name.toLowerCase() === 'user-agent'
    )
    if (uaHeader) {
      storage.local.set({ headerUA: uaHeader.value })
    }
  },
  { urls: ['<all_urls>'] },
  ['requestHeaders']
)

export {}
