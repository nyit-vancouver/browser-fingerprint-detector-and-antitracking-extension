import { throttle } from 'throttle-debounce'
// 监听 `injectData` 事件
window.addEventListener(
  'injectData',
  throttle(100, (event: Event) => {
    const customEvent = event as CustomEvent
    const { data } = customEvent.detail
    console.log('Received data in inject.js:', event, data)

    // 1. 创建一个代理 navigator 对象的 Proxy
    const navigatorProxy = new Proxy(window.navigator, {
      get(target, prop) {
        if (prop === 'userAgent') {
          console.log('navigator.userAgent is accessed', window)
          // 2. 当访问 `userAgent` 属性时返回自定义值
          const event = new CustomEvent('writeLog', {
            detail: {
              paramName: 'user-agent'
            }
          })
          window.dispatchEvent(event)

          return data['user-agent'] || Reflect.get(target, prop)
        }
        // 3. 其他属性保持不变
        return Reflect.get(target, prop)
      }
    })

    // // 4. 将 window.navigator 替换为代理对象
    Object.defineProperty(window, 'navigator', {
      value: navigatorProxy,
      writable: false,
      enumerable: true,
      configurable: true
    })
  })
)
export {}
