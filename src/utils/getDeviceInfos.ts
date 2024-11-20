import { UAParser } from 'ua-parser-js'

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

  try {
    const javascriptUA = navigator.userAgent

    // 创建解析器实例并立即获取结果
    const parser = new UAParser()
    parser.setUA(javascriptUA)
    const result = parser.getResult()

    // 从结果中直接获取设备信息
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
    model: deviceModel
  }
}
