import type { UserAgentData } from '@/constants/userAgents'

import { logQueue } from '../sendLogs'

export function rewriteUserAgentData(userAgentData?: UserAgentData) {
  const originalValue = navigator.userAgentData
  Object.defineProperty(navigator, 'userAgentData', {
    get() {
      logQueue.sendLog('user-agent_userAgentData')
      if (!userAgentData) return originalValue
      return {
        getHighEntropyValues() {
          return Promise.resolve({
            architecture: userAgentData?.architecture, // 伪造设备架构
            model: userAgentData?.model, // 伪造设备型号
            platform: userAgentData?.platform, // 伪造平台
            platformVersion: userAgentData?.platformVersion, // 伪造平台版本
            uaFullVersion: userAgentData?.uaFullVersion // 浏览器完整版本号
          })
        },
        mobile: userAgentData?.mobile || originalValue?.mobile,
        platform: userAgentData?.platform || originalValue?.platform
      }
    },
    configurable: true
  })
}
