export interface TrackingLog {
  domain: string
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
  _timestamp: number
}

export const trackingData: TrackingLog[] = [
  {
    domain: 'www.baidu.com',
    logs: {
      height: 5,
      width: 14,
      language: 5,
      colorDepth: 3,
      hardwareConcurrency: 18,
      deviceMemory: 15,
      timezone: 2,
      canvas: 5,
      webgl: 5,
      audio: 5,
      userAgent: 5,
      font: 5,
      webrtc: 5
    },
    _timestamp: 1633660800000
  },
  {
    domain: 'www.baidu.com',
    logs: {
      height: 9,
      width: 16,
      language: 9,
      colorDepth: 5,
      hardwareConcurrency: 19,
      deviceMemory: 17,
      timezone: 3,
      canvas: 8,
      webgl: 5,
      audio: 5,
      userAgent: 5,
      font: 5,
      webrtc: 5
    },
    _timestamp: 1633660900000
  },
  {
    domain: 'www.example.com',
    logs: {
      height: 5,
      width: 14,
      language: 5,
      colorDepth: 3,
      hardwareConcurrency: 18,
      deviceMemory: 15,
      timezone: 2
    },
    _timestamp: 16336608005909
  }
]
