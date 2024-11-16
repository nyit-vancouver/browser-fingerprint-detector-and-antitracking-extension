import { logQueue } from '@/utils/sendLogs'

export function blockWebrtc(isBlockWebrtc: boolean) {
  const OriginalRTCPeerConnection = window.RTCPeerConnection

  if (OriginalRTCPeerConnection) {
    const newRTCPeerConnection = function (...args: any[]) {
      logQueue.sendLog('webrtc')
      const pc = new OriginalRTCPeerConnection(...args)
      if (isBlockWebrtc) {
        // 拦截候选地址，过滤掉所有的网络候选
        pc.addEventListener('icecandidate', (event) => {
          if (event.candidate) {
            // 阻止所有候选地址的发送，阻止 IP 泄露
            return
          }
        })
      }
      return pc
    }

    // 替换原有的 RTCPeerConnection
    Object.defineProperty(window, 'RTCPeerConnection', {
      value: newRTCPeerConnection,
      writable: false,
      enumerable: true,
      configurable: true
    })
  }
}
