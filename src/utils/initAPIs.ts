import { logQueue } from './sendLogs'

interface Configs {
  obj: any
  objStr: string
  paramName: string
  propName: string
}

function initAttribute(
  data: Record<string, any>,
  configs: Configs,
  handler?: (data: Record<string, any>, target: any, originalValue: any) => any
) {
  const { obj, objStr, paramName, propName } = configs
  const navigatorProxy = new Proxy(obj, {
    get(target, prop) {
      if (prop === propName) {
        console.log(`${paramName} is accessed`)
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

function initAPIs(data: Record<string, any>) {
  // spoof user agent
  initAttribute(data, {
    obj: window.navigator,
    objStr: 'navigator',
    paramName: 'user-agent',
    propName: 'userAgent'
  })
  // TODO: spoof font
  // spoof screen size
  initAttribute(data, {
    obj: window.screen,
    objStr: 'screen',
    paramName: 'height',
    propName: 'height'
  })
  initAttribute(data, {
    obj: window.screen,
    objStr: 'screen',
    paramName: 'width',
    propName: 'width'
  })
  // timezone
  const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions
  Object.defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
    value: function () {
      // 调用原始的 resolvedOptions 方法
      const options = originalResolvedOptions.call(this)
      // 修改返回的时区
      options.timeZone = data.timezone || options.timeZone // 你想要的自定义时区
      return options
    },
    writable: true,
    configurable: true
  })
  // spoof language
  initAttribute(data, {
    obj: window.navigator,
    objStr: 'navigator',
    paramName: 'language',
    propName: 'language'
  })
  // spoof colorDepth
  initAttribute(data, {
    obj: window.screen,
    objStr: 'screen',
    paramName: 'colorDepth',
    propName: 'colorDepth'
  })
  // spoof hardwareConcurrency
  initAttribute(data, {
    obj: window.navigator,
    objStr: 'navigator',
    paramName: 'hardwareConcurrency',
    propName: 'hardwareConcurrency'
  })
  // spoof deviceMemory
  initAttribute(data, {
    obj: window.navigator,
    objStr: 'navigator',
    paramName: 'deviceMemory',
    propName: 'deviceMemory'
  })
  // block media devices
  // spoof audio context
  // block canvas
  // block webgl
  // block webaudio
  // block webrtc
  // block css exfil
  // limit tab history
}

export { initAPIs }
