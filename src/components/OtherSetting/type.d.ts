// 添加隐私配置接口
export interface PrivacyConfig {
  spoofMediaDevices: boolean
  blockCSSExfil: boolean
  limitHistory: boolean
  protectWinName: boolean
  spoofAudioContext: boolean
  spoofClientRects: boolean
  spoofFontFingerprint: boolean
  disableWebRTC: boolean
  screenSize: string
  timeZone: string
}
