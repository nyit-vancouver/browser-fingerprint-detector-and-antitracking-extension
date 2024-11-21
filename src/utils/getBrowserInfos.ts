import { UAParser } from 'ua-parser-js'

export async function getBroswerInfos() {
  let browserName = 'Unknown'
  let browserVersion = 'Unknown'
  let headerUA = 'Unknown'
  const javascriptUA = navigator.userAgent

  try {
    // 获取 Header UA
    const response = await fetch('https://httpbin.org/headers', {
      method: 'GET'
    })
    const data = await response.json()
    headerUA = data.headers['User-Agent'] || 'Not available'

    // 使用 UAParser 解析 JavaScript UA
    const parser = new UAParser(javascriptUA)
    const browserInfo = parser.getBrowser()
    const ua = await navigator.userAgentData?.getHighEntropyValues?.([
      'uaFullVersion'
    ])
    browserName = browserInfo.name || 'Unknown'
    browserVersion = ua?.uaFullVersion || browserInfo.version || 'Unknown'
  } catch (error) {
    console.error('Error getting browser info:', error)
  }

  return {
    name: browserName,
    version: browserVersion,
    header: headerUA,
    javascript: javascriptUA
  }
}
