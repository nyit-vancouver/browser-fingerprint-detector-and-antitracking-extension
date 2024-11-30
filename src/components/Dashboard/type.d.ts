export interface TrackingLog {
  url: string
  logs: {
    height?: number
    width?: number
    language?: number
    colorDepth?: number
    hardwareConcurrency?: number
    deviceMemory?: number
    timezone?: number
    canvas?: number
    webgl?: number
    audio?: number
    userAgent?: number
    font?: number
    webrtc?: number
  }
  timestamp: number
}
