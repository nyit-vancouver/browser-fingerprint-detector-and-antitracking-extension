import { ARCHITECTURES } from '@/constants/architecture'
import { MODELS } from '@/constants/models'
import { PLATFORM_MAP } from '@/constants/userAgents'
import type { UserAgent } from '@/constants/userAgents'

export function getUserAgentDetails({ userAgent, type, name }: UserAgent) {
  const mobile = /ios|android/i.test(type)
  return {
    'user-agent': userAgent,
    userAgentData: {
      platform: PLATFORM_MAP[type],
      mobile,
      architecture:
        ARCHITECTURES[Math.floor(Math.random() * ARCHITECTURES.length)],
      model: MODELS[Math.floor(Math.random() * MODELS.length)],
      platformVersion: `${name.match(/(\d+)\s*-\s*(\d+)/)?.[0] || 10}.0`,
      uaFullVersion:
        userAgent.match(/\/(\d+(\.\d+)*)(?=\s*['"]?$)/g)?.[0].slice(1) ||
        '131.0'
    }
  }
}
