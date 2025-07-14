import { UAParser } from 'ua-parser-js'

function getDeviceType(): string {
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile ? 'Mobile' : 'Desktop'
  }

  // if userAgentData is not available, fallback to user agent string
  const ua = navigator.userAgent
  if (ua.match(/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i)?.length) {
    return 'Tablet'
  }
  if (
    ua.match(
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i,
    )?.length
  ) {
    return 'Mobile'
  }
  return 'Desktop'
}

export async function getDeviceInfos() {
  let deviceVendor = 'unknown'
  let deviceModel = 'unknown'

  try {
    const javascriptUA = navigator.userAgent

    const parser = new UAParser()
    parser.setUA(javascriptUA)
    const result = parser.getResult()

    if (result.device) {
      deviceVendor = result.device.vendor || 'unknown'
      deviceModel = result.device.model || 'unknown'
    }
  } catch (error) {
    console.error('Error parsing user agent:', error)
  }

  return {
    type: getDeviceType(),
    vendor: deviceVendor,
    model: deviceModel,
  }
}
