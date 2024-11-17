import UAParser from 'ua-parser-js'

function getDeviceType(): string {
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile ? 'Mobile' : 'Desktop'
  }

  // 如果 userAgentData 不可用，回退到传统方法
  const ua = navigator.userAgent
  if (ua.match(/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i)?.length) {
    return 'Tablet'
  }
  if (
    ua.match(
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i
    )?.length
  ) {
    return 'Mobile'
  }
  return 'Desktop'
}

export async function getDeviceInfos() {
  let deviceVendor = 'unknown'
  let deviceModel = 'unknown'

  const javascriptUA = navigator.userAgent
  const parser = new UAParser(javascriptUA)
  const deviceInfo = parser.getDevice()

  deviceVendor = deviceInfo.vendor || 'unknown'
  deviceModel = deviceInfo.model || 'unknown'

  return {
    type: getDeviceType(),
    vendor: deviceVendor,
    model: deviceModel
  }
}
