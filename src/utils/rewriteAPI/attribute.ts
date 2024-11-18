import { logQueue } from '@/utils/sendLogs'

interface Configs {
  obj: any
  objStr: string
  paramName: string // the attribute name to be accessed in stored data
  propName: string // the attribute name to be rewritten
}

export function rewriteAttribute(
  data: Record<string, any>,
  configs: Configs,
  handler?: (data: Record<string, any>, target: any, originalValue: any) => any
) {
  const { obj, objStr, paramName, propName } = configs
  const navigatorProxy = new Proxy(obj, {
    get(target, prop) {
      if (prop === propName) {
        logQueue.sendLog(paramName)
        return handler
          ? handler(data, target, Reflect.get(target, prop))
          : data?.[paramName] || Reflect.get(target, prop)
      }
      return Reflect.get(target, prop)
    }
  })

  Object.defineProperty(window, objStr, {
    value: navigatorProxy,
    writable: false,
    enumerable: true,
    configurable: true
  })
}
