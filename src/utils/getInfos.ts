import { UAParser } from 'ua-parser-js'

export async function getBroswerInfos() {
  const parser = new UAParser()
  const res = parser.getResult()
  if (navigator.userAgentData) {
    const ua = await navigator.userAgentData.getHighEntropyValues([
      'platform',
      'platformVersion',
      'architecture',
      'model',
      'uaFullVersion'
    ])
    return {
      ...res,
      browser: {
        ...res.browser,
        version:
          ua.uaFullVersion ||
          ua.fullVersionList?.join(',') ||
          res.browser.version
      },
      device: {
        ...res.device,
        model: ua.model
      },
      os: {
        ...res.os,
        version: ua.platformVersion
      },
      cpu: {
        architecture: ua.architecture
      }
    }
  }
  return res
}
export function getLocationInfos() {}
export function getHardwareInfos() {}
export function getSoftwareInfos() {}
