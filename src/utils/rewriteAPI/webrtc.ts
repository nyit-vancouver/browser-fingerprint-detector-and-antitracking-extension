import { logQueue } from '@/utils/sendLogs'

export function blockWebrtc(isBlockWebrtc: boolean) {
  if (!isBlockWebrtc) return

  // Save the original interface
  const origRTCPeerConnection = window.RTCPeerConnection
  const origMediaDevices = navigator.mediaDevices

  const emptyFunction = () => {}

  // Create a simulated RTCPeerConnection
  const mockRTCPeerConnection = function (...args: any[]) {
    logQueue.sendLog('webrtc')

    if (!isBlockWebrtc) {
      return new origRTCPeerConnection(...args)
    }

    // Returns a mock object
    return {
      createDataChannel: emptyFunction,
      createOffer: emptyFunction,
      createAnswer: emptyFunction,
      setLocalDescription: emptyFunction,
      setRemoteDescription: emptyFunction,
      addIceCandidate: emptyFunction,
      removeTrack: emptyFunction,
      addTrack: emptyFunction,
      close: emptyFunction,
      addEventListener: emptyFunction,
      removeEventListener: emptyFunction,
      dispatchEvent: emptyFunction,
      getConfiguration: () => ({}),
      getSenders: () => [],
      getReceivers: () => [],
      getTransceivers: () => [],
      iceConnectionState: 'disconnected',
      iceGatheringState: 'complete',
      connectionState: 'disconnected',
      signalingState: 'closed',
      localDescription: null,
      remoteDescription: null
    }
  }

  // Replace RTCPeerConnection
  Object.defineProperty(window, 'RTCPeerConnection', {
    value: mockRTCPeerConnection,
    writable: false,
    configurable: true
  })

  // Replace webkitRTCPeerConnection (for old versions of Chrome)
  Object.defineProperty(window, 'webkitRTCPeerConnection', {
    value: mockRTCPeerConnection,
    writable: false,
    configurable: true
  })

  // Prevent getUserMedia
  if (origMediaDevices) {
    const mockMediaDevices = {
      ...origMediaDevices,
      getUserMedia: async () => {
        throw new Error('Permission denied')
      },
      getDisplayMedia: async () => {
        throw new Error('Permission denied')
      },
      enumerateDevices: async () => []
    }

    Object.defineProperty(navigator, 'mediaDevices', {
      value: mockMediaDevices,
      writable: false,
      configurable: true
    })
  }

  // Prevent legacy getUserMedia
  const legacyGetUserMedia =
    (navigator as any).getUserMedia ||
    (navigator as any).webkitGetUserMedia ||
    (navigator as any).mozGetUserMedia ||
    (navigator as any).msGetUserMedia

  if (legacyGetUserMedia) {
    Object.defineProperty(navigator, 'getUserMedia', {
      value: () => {
        throw new Error('Permission denied')
      },
      writable: false,
      configurable: true
    })
  }
}
