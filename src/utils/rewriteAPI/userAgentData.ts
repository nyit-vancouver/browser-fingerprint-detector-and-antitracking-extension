import type { UserAgentData } from '@/constants/userAgents'

import { logQueue } from '../sendLogs'

export function rewriteUserAgentData(userAgentData?: UserAgentData) {
  const navigatorProxy = new Proxy(navigator, {
    get(target, prop) {
      logQueue.sendLog('user-agent_userAgentData')
      if (prop === 'getHighEntropyValues') {
        if (!userAgentData) return Reflect.get(target, prop)
        return function () {
          return Promise.resolve({
            architecture: userAgentData?.architecture, // 伪造设备架构
            model: userAgentData?.model, // 伪造设备型号
            platform: userAgentData?.platform, // 伪造平台
            platformVersion: userAgentData?.platformVersion, // 伪造平台版本
            uaFullVersion: userAgentData?.uaFullVersion // 浏览器完整版本号
          })
        }
      } else if (prop === 'mobile') {
        return userAgentData?.mobile || Reflect.get(target, prop)
      } else if (prop === 'platform') {
        return userAgentData?.platform || Reflect.get(target, prop)
      }
      return Reflect.get(target, prop)
    }
  })

  Object.defineProperty(navigator, 'userAgentData', {
    value: navigatorProxy,
    writable: false,
    enumerable: true,
    configurable: true
  })
}
