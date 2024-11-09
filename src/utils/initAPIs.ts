interface Configs {
  obj: any
  objStr: string
  paramName: string
  propName: string
}

function sendLog(paramName: string) {
  const event = new CustomEvent('writeLog', {
    detail: {
      paramName
    }
  })
  window.dispatchEvent(event)
}

function initAPI(data: Record<string, any>, configs: Configs) {
  const { obj, objStr, paramName, propName } = configs
  const navigatorProxy = new Proxy(obj, {
    get(target, prop) {
      if (prop === propName) {
        console.log(`${paramName} is accessed`)
        sendLog(paramName)
        return data?.[paramName] || Reflect.get(target, prop)
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
  initAPI(data, {
    obj: window.navigator,
    objStr: 'navigator',
    paramName: 'user-agent',
    propName: 'userAgent'
  })
  // spoof font
  // spoof user agent
  // Object.defineProperty(window.navigator, 'userAgent', {
  //   get: () => 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit'
  // }
  // spoof screen size
  // timezone
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
