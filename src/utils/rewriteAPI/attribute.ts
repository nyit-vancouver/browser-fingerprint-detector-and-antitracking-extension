import { logQueue } from '@/utils/sendLogs'

interface Configs {
  obj: any
  objStr: string
  paramName: string // the attribute name to be accessed in stored data
  propName: string // the attribute name to be rewritten
}

export function rewriteAttribute(data: Record<string, any>, configs: Configs) {
  const { obj, paramName, propName } = configs
  const originalValue = obj[propName]

  Object.defineProperty(obj, propName, {
    get() {
      logQueue.sendLog(paramName)
      return data?.[paramName] || originalValue
    },
    configurable: true
  })
}
