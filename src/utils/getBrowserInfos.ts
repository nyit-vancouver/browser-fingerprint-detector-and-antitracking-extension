import { UAParser } from 'ua-parser-js'

export async function getBroswerInfos() {
  let browserName = 'Unknown'
  let browserVersion = 'Unknown'
  let headerUA = 'Unknown'
  const javascriptUA = navigator.userAgent

  try {
    // get browser info from httpbin
    const response = await fetch('https://httpbin.org/headers', {
      method: 'GET',
    })
    const data = await response.json()
    headerUA = data.headers['User-Agent'] || 'Not available'

    // parse user agent string
    const parser = new UAParser(javascriptUA)
    const browserInfo = parser.getBrowser()
    const ua = await navigator.userAgentData?.getHighEntropyValues?.([
      'uaFullVersion',
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
    javascript: javascriptUA,
  }
}
