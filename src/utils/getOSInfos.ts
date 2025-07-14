import { UAParser } from 'ua-parser-js'

export async function getOSInfos(): Promise<{
  name: string
  version: string
  details: string
}> {
  let osName = 'Unknown'
  let osVersion = ''

  if (navigator.userAgentData) {
    const platformInfo = await navigator.userAgentData.getHighEntropyValues([
      'platform',
      'platformVersion',
    ])
    osName = platformInfo.platform || 'Unknown'
    osVersion = platformInfo.platformVersion || ''
  } else {
    // if userAgentData is not available, fallback to user agent string
    const parser = new UAParser()
    const result = parser.getResult()
    osName = result.os.name || 'Unknown'
    osVersion = result.os.version || ''
  }

  // normalize os name
  if (osName.toLowerCase().includes('mac')) {
    osName = 'macOS'
  } else if (osName.toLowerCase().includes('win')) {
    osName = 'Windows'
  }

  const details = `${osName} ${osVersion}`.trim()
  return { name: osName, version: osVersion, details }
}
