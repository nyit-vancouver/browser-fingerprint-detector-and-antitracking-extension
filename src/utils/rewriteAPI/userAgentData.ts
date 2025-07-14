import type { UserAgentData } from '@/constants/userAgents'

import { logCollector } from '../sendLogs'

export function rewriteUserAgentData(userAgentData?: UserAgentData) {
  const originalValue = navigator.userAgentData
  Object.defineProperty(navigator, 'userAgentData', {
    get() {
      logCollector.sendLog('user-agent_userAgentData')
      if (!userAgentData) return originalValue
      return {
        getHighEntropyValues() {
          return Promise.resolve({
            architecture: userAgentData?.architecture,
            model: userAgentData?.model,
            platform: userAgentData?.platform,
            platformVersion: userAgentData?.platformVersion,
            uaFullVersion: userAgentData?.uaFullVersion,
          })
        },
        mobile: userAgentData?.mobile || originalValue?.mobile,
        platform: userAgentData?.platform || originalValue?.platform,
      }
    },
    configurable: true,
  })
}
