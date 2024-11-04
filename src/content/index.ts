// import { handler } from "@/utils/initAPIs";
//
console.log('[content] loaded ')

;(window as any)._antiTrackingInit = false

// (async function () {

// 1. 创建一个代理 navigator 对象的 Proxy
const navigatorProxy = new Proxy(window.navigator, {
  get(target, prop) {
    if (prop === 'userAgent') {
      console.log('navigator.userAgent is accessed')
      // 2. 当访问 `userAgent` 属性时返回自定义值
      // TODO: !!页面脚本访问navigator.userAgent时是什么值？
      return '123'
    }
    // 3. 其他属性保持不变
    return Reflect.get(target, prop)
  }
})

// 4. 将 window.navigator 替换为代理对象
Object.defineProperty(window, 'navigator', {
  value: navigatorProxy,
  writable: false,
  enumerable: true,
  configurable: true
})

console.log(window.navigator.userAgent)
export {}
