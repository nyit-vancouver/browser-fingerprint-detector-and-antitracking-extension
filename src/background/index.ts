import { Interceptor, ProfileCache, Settings, TempStore } from '@/lib/intercept'
import { runtime } from 'webextension-polyfill'

const settings: Settings = {
  config: {
    enabled: true
  },
  options: {
    webSockets: 'block'
  },
  profile: {
    selected: 'win1-edg'
  },
  excluded: [],
  headers: {
    spoofAcceptLang: {
      enabled: true,
      value: 'en-US,en;q=0.9'
    },
    blockEtag: true,
    enableDNT: true,
    spoofIP: {
      enabled: true,
      value: '1.2.3.4'
    }
  },
  os: 'win1-edg'
}
const tempStore: TempStore = {
  profile: 'mac3-edg',
  ipInfo: {
    lang: 'en-US'
  },
  spoofIP: '1.2.3.4'
}

const profileCache: ProfileCache = {}

const interceptor = new Interceptor(settings, tempStore, profileCache, true)

runtime.onInstalled.addListener(() => {
  console.log('[background] loaded ')

  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details: chrome.webRequest.WebRequestHeadersDetails) => {
      // if (details.requestHeaders) {
      //   for (let i = 0; i < details.requestHeaders.length; ++i) {
      //     if (details.requestHeaders[i].name === 'User-Agent') {
      //       details.requestHeaders[i].value = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55";

      //       break;
      //     }
      //   }
      // }
      // console.log("result0", details)

      // // console.log(" result headers", details.requestHeaders)
      if (details.requestHeaders) {
        interceptor.modifyRequest(details)
      }
      // console.log("result1", result)
      // console.log("result2", details)
      // if (details.requestHeaders) {
      //   for (let i = 0; i < details.requestHeaders.length; ++i) {
      //     if (details.requestHeaders[i].name === 'User-Agent') {
      //       details.requestHeaders[i].value = "Firefox 123";
      //       break;
      //     }
      //   }
      // }
      // console.log("result2", result)
      return { requestHeaders: details.requestHeaders }
    },
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders']
  )

  // chrome.webRequest.onSendHeaders.addListener(
  //   (details) => {
  //     const uaHeader = details.requestHeaders?.find(
  //       (h) => h.name.toLowerCase() === 'user-agent'
  //     )
  //     console.log("ua header", uaHeader)
  //     if (uaHeader) {
  //       storage.local.set({ headerUA: uaHeader.value })
  //     }
  //   },
  //   { urls: ['<all_urls>'] },
  //   ['requestHeaders']
  // )
})

export {}
