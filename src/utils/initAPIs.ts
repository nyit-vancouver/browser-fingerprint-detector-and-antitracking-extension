// import { log } from './log'
// // import { getCurrentTabId } from "./getCurrentTabId"
// import { tabStorage } from './TabStorage'

// export async function handler(paramName: string, defaultValue: any) {
//   console.log('hinavigator.userAgent is accessed', await chrome.storage.local.get())
//   // logging
//   log.write(paramName)
//   // get value
//   const storedValue = await tabStorage.get(currentTabId, paramName)
//   console.log('init header', storedValue)
//   return storedValue || defaultValue
// }
function initAPIs() {
  // const originalUserAgent = navigator.userAgent;
  // TODO: 如果有SessionStorage，读取SessionStorage中的数据
  // TODO: 如果没有，就取原来的数据
  // TODO: log
  // API 1
  // API 2
  // API 3
  // spoof font
  // spoof user agent
  // Object.defineProperty(window.navigator, 'userAgent', {
  //   get: () => 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit'
  // }
  // spoof screen size
  // timezone
  // block media devices
  // spoof audio context
  // block canvas
  // block webgl
  // block webaudio
  // block webrtc
  // block css exfil
  // limit tab history
}

export { initAPIs }
