import { throttle } from 'throttle-debounce'
import { log } from '@/utils/log'
import { storage } from '@/utils/storage'

console.log('[content] loaded ')

;(async () => {
  const data = await storage.get(0)

  console.log('storedData', data)

  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('static/js/inject.js')
  document.documentElement.appendChild(script)

  script.onload = () => {
    // 移除 script 标签
    script.remove()

    // 创建一个自定义事件，包含传递的数据
    const event = new CustomEvent('injectData', { detail: { data } })

    // 派发自定义事件，使 inject.js 可以接收到数据
    window.dispatchEvent(event)
  }
})()

window.addEventListener(
  'writeLog',
  throttle(100, (event: Event) => {
    console.log('Received data in writeLog:', event)
    const customEvent = event as CustomEvent
    const { paramName } = customEvent.detail
    log.write(paramName)
  })
)

export {}
