import { throttle } from 'throttle-debounce'
import { log } from '@/utils/log'

export default async function addScript(tabId: number) {
  console.warn('addScript get storage', new Date().getTime())
  console.log('tabId', tabId)
  const res = (await chrome.storage.local.get()) || {}
  console.log('Storage get res', res)
  const data = res[`__antiTracking_config_${tabId}`]
  console.warn('get storage end', new Date().getTime())

  console.log('storedData', data)

  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('static/js/inject.js')
  document.documentElement.appendChild(script)

  console.warn('script', new Date().getTime())
  script.onload = () => {
    console.warn('script loaded', new Date().getTime())
    // 移除 script 标签
    script.remove()

    // 创建一个自定义事件，包含传递的数据
    const event = new CustomEvent('injectData', { detail: { data } })

    // 派发自定义事件，使 inject.js 可以接收到数据
    window.dispatchEvent(event)
  }
  window.addEventListener(
    'writeLog',
    throttle(100, (event: Event) => {
      console.log('Received data in writeLog:', event)
      const customEvent = event as CustomEvent
      const { paramName } = customEvent.detail
      log.write(paramName)
    })
  )
}
