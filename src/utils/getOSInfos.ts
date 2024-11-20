import { UAParser } from 'ua-parser-js'

export async function getOSInfos(): Promise<{
  name: string
  version: string
  details: string
}> {
  let osName = 'Unknown'
  let osVersion = ''

  // 使用 navigator.userAgentData（如果可用）
  if (navigator.userAgentData) {
    const platformInfo = await navigator.userAgentData.getHighEntropyValues([
      'platform',
      'platformVersion'
    ])
    osName = platformInfo.platform || 'Unknown'
    osVersion = platformInfo.platformVersion || ''
  } else {
    // 回退到使用 UAParser
    const parser = new UAParser()
    const result = parser.getResult()
    osName = result.os.name || 'Unknown'
    osVersion = result.os.version || ''
  }

  // 对于特定平台的额外信息
  if (osName.toLowerCase().includes('mac')) {
    osName = 'macOS'
  } else if (osName.toLowerCase().includes('win')) {
    osName = 'Windows'
  }

  const details = `${osName} ${osVersion}`.trim()
  return { name: osName, version: osVersion, details }
}
