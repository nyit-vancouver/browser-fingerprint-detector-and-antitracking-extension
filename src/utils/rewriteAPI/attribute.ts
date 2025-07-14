import { logCollector } from '@/utils/sendLogs'

interface Configs {
  obj: any
  objStr: string
  paramName: string // the attribute name to be accessed in stored data
  propName: string // the attribute name to be rewritten
}

/**
 * Rewrites the attribute of an object to log access and return a value from the provided data.
 *
 * @param {Record<string, any>} data - The data object containing values to be returned.
 * @param {Configs} configs - The configuration object containing the target object, parameter name, and property name.
 */

export function rewriteAttribute(data: Record<string, any>, configs: Configs) {
  const { obj, paramName, propName } = configs
  const originalValue = obj[propName]

  Object.defineProperty(obj, propName, {
    get() {
      logCollector.sendLog(paramName)
      return data?.[paramName] || originalValue
    },
    configurable: true,
  })
}
