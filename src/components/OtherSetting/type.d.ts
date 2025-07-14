export interface Settings {
  spoofCanvas: boolean
  spoofWebgl: boolean
  spoofAudioContext: boolean
  // spoofFontFingerprint: boolean
  disableWebRTC: boolean
  screenSize: string | undefined
  timeZone: string | undefined
  colorDepth: number | undefined
  hardwareConcurrency: number | undefined
  deviceMemory: number | undefined
}

export type Setting =
  | {
      spoofCanvas: boolean
    }
  | {
      spoofWebgl: boolean
    }
  | {
      spoofAudioContext: boolean
    }
  | {
      disableWebRTC: boolean
    }
  | {
      screenSize: string
    }
  | {
      timeZone: string
    }
  | {
      colorDepth: number | undefined
    }
  | {
      hardwareConcurrency: number | undefined
    }
  | {
      deviceMemory: number | undefined
    }
