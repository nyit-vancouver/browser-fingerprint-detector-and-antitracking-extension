import { initAPIs } from '@/utils/initAPIs'

console.warn('[content] loaded ', new Date().getTime())

function handleTabStorage(event: any) {
  console.log('Received data in writeLog:', event)
  const customEvent = event as CustomEvent
  const { data } = customEvent.detail
  console.log('Message from background:', data)

  if (data) {
    initAPIs(data)
  }
}

window.addEventListener('tabStorage', handleTabStorage)

export {}
