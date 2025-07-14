/* eslint-disable */
export type Platform = 'macos' | 'ios' | 'windows' | 'linux' | 'android'

export interface UserAgent {
  name: string
  type: Platform
  id: string
  userAgent: string
}

export interface UserAgentData {
  mobile: boolean
  platform: string
  architecture: string
  model: string
  platformVersion: string
  uaFullVersion: string
}

export const PLATFORM_MAP: Record<Platform, string> = {
  macos: 'macOS',
  ios: 'iOS',
  windows: 'Windows',
  linux: 'Linux',
  android: 'Android'
}

export const PLATFORMS: Platform[] = [
  'windows',
  'macos',
  'linux',
  'ios',
  'android'
]

export const USER_AGENTS: UserAgent[] = [
  {
    name: 'Win 7 - Edge 109',
    type: 'windows',
    id: 'win1_edg',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55'
  },
  {
    name: 'Win 7 - Firefox 115 ESR',
    type: 'windows',
    id: 'win1_esr2',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'Win 7 - Chrome 109',
    type: 'windows',
    id: 'win1_gcr',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
  },
  {
    name: 'Win 7 - Internet Explorer 11',
    type: 'windows',
    id: 'win1_ie',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko'
  },
  {
    name: 'Win 8 - Edge 109',
    type: 'windows',
    id: 'win2_edg',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55'
  },
  {
    name: 'Win 8 - Firefox 115 ESR',
    type: 'windows',
    id: 'win2_esr2',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'Win 8 - Chrome 109',
    type: 'windows',
    id: 'win2_gcr',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
  },
  {
    name: 'Win 8 - Internet Explorer 11',
    type: 'windows',
    id: 'win2_ie',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.2; WOW64; Trident/7.0; rv:11.0) like Gecko'
  },
  {
    name: 'Win 8.1 - Edge 109',
    type: 'windows',
    id: 'win3_edg',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55'
  },
  {
    name: 'Win 8.1 - Firefox 115 ESR',
    type: 'windows',
    id: 'win3_esr2',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'Win 8.1 - Chrome 109',
    type: 'windows',
    id: 'win3_gcr',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
  },
  {
    name: 'Win 8.1 - Internet Explorer 11',
    type: 'windows',
    id: 'win3_ie',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko'
  },
  {
    name: 'Win 10 - Edge 129',
    type: 'windows',
    id: 'win4_edg',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'
  },
  {
    name: 'Win 10 - Firefox 128 ESR',
    type: 'windows',
    id: 'win4_esr',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0'
  },
  {
    name: 'Win 10 - Firefox 115 ESR',
    type: 'windows',
    id: 'win4_esr2',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'Win 10 - Firefox 131',
    type: 'windows',
    id: 'win4_ff',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0'
  },
  {
    name: 'Win 10 - Chrome 129',
    type: 'windows',
    id: 'win4_gcr',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'Win 10 - Internet Explorer 11',
    type: 'windows',
    id: 'win4_ie',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko'
  },
  {
    name: 'macOS 12 - Edge 129',
    type: 'macos',
    id: 'mac1_edg',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'
  },
  {
    name: 'macOS 12 - Firefox 128 ESR',
    type: 'macos',
    id: 'mac1_esr',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0'
  },
  {
    name: 'macOS 12 - Firefox 115 ESR',
    type: 'macos',
    id: 'mac1_esr2',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'macOS 12 - Firefox 131',
    type: 'macos',
    id: 'mac1_ff',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0'
  },
  {
    name: 'macOS 12 - Chrome 129',
    type: 'macos',
    id: 'mac1_gcr',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'macOS 12 - Safari 18',
    type: 'macos',
    id: 'mac1_sf',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18 Safari/605.1.15'
  },
  {
    name: 'macOS 13 - Edge 129',
    type: 'macos',
    id: 'mac2_edg',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'
  },
  {
    name: 'macOS 13 - Firefox 128 ESR',
    type: 'macos',
    id: 'mac2_esr',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0'
  },
  {
    name: 'macOS 13 - Firefox 115 ESR',
    type: 'macos',
    id: 'mac2_esr2',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'macOS 13 - Firefox 131',
    type: 'macos',
    id: 'mac2_ff',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0'
  },
  {
    name: 'macOS 13 - Chrome 129',
    type: 'macos',
    id: 'mac2_gcr',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'macOS 13 - Safari 18',
    type: 'macos',
    id: 'mac2_sf',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18 Safari/605.1.15'
  },
  {
    name: 'macOS 14 - Edge 129',
    type: 'macos',
    id: 'mac3_edg',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'
  },
  {
    name: 'macOS 14 - Firefox 128 ESR',
    type: 'macos',
    id: 'mac3_esr',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0'
  },
  {
    name: 'macOS 14 - Firefox 115 ESR',
    type: 'macos',
    id: 'mac3_esr2',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'macOS 14 - Firefox 131',
    type: 'macos',
    id: 'mac3_ff',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0'
  },
  {
    name: 'macOS 14 - Chrome 129',
    type: 'macos',
    id: 'mac3_gcr',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'macOS 14 - Safari 18',
    type: 'macos',
    id: 'mac3_sf',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18 Safari/605.1.15'
  },
  {
    name: 'Linux - Edge 129',
    type: 'linux',
    id: 'lin1_edg',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'
  },
  {
    name: 'Linux - Firefox 128 ESR',
    type: 'linux',
    id: 'lin1_esr',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0'
  },
  {
    name: 'Linux - Firefox 115 ESR',
    type: 'linux',
    id: 'lin1_esr2',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'Linux - Firefox 131',
    type: 'linux',
    id: 'lin1_ff',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0'
  },
  {
    name: 'Linux - Chrome 129',
    type: 'linux',
    id: 'lin1_gcr',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'Fedora Linux - Edge 129',
    type: 'linux',
    id: 'lin2_edg',
    userAgent:
      'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'
  },
  {
    name: 'Fedora Linux - Firefox 128 ESR',
    type: 'linux',
    id: 'lin2_esr',
    userAgent:
      'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0'
  },
  {
    name: 'Fedora Linux - Firefox 115 ESR',
    type: 'linux',
    id: 'lin2_esr2',
    userAgent:
      'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'Fedora Linux - Firefox 131',
    type: 'linux',
    id: 'lin2_ff',
    userAgent:
      'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0'
  },
  {
    name: 'Fedora Linux - Chrome 129',
    type: 'linux',
    id: 'lin2_gcr',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'Ubuntu Linux - Edge 129',
    type: 'linux',
    id: 'lin3_edg',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'
  },
  {
    name: 'Ubuntu Linux - Firefox 128 ESR',
    type: 'linux',
    id: 'lin3_esr',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0'
  },
  {
    name: 'Ubuntu Linux - Firefox 115 ESR',
    type: 'linux',
    id: 'lin3_esr2',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0'
  },
  {
    name: 'Ubuntu Linux - Firefox 131',
    type: 'linux',
    id: 'lin3_ff',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0'
  },
  {
    name: 'Ubuntu Linux - Chrome 129',
    type: 'linux',
    id: 'lin3_gcr',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'iOS 16 - Chrome 129 (Phone)',
    type: 'ios',
    id: 'ios1_gcrm',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iOS 16 - Chrome 129 (Tablet)',
    type: 'ios',
    id: 'ios1_gcrt',
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 16_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iOS 16 - Safari 15 (iPhone)',
    type: 'ios',
    id: 'ios1_sfm',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iOS 16 - Safari 15 (iPad)',
    type: 'ios',
    id: 'ios1_sft',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15'
  },
  {
    name: 'iOS 17 - Chrome 129 (Phone)',
    type: 'ios',
    id: 'ios2_gcrm',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iOS 17 - Chrome 129 (Tablet)',
    type: 'ios',
    id: 'ios2_gcrt',
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iOS 17 - Safari 16 (iPhone)',
    type: 'ios',
    id: 'ios2_sfm',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iOS 17 - Safari 16 (iPad)',
    type: 'ios',
    id: 'ios2_sft',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15'
  },
  {
    name: 'iOS 18 - Chrome 129 (Phone)',
    type: 'ios',
    id: 'ios3_gcrm',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iOS 18 - Chrome 129 (Tablet)',
    type: 'ios',
    id: 'ios3_gcrt',
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iOS 18 - Safari 18 (iPhone)',
    type: 'ios',
    id: 'ios3_sfm',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iOS 18 - Safari 18 (iPad)',
    type: 'ios',
    id: 'ios3_sft',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18 Safari/605.1.15'
  },
  {
    name: 'Android 11 - Edge 129 (Phone)',
    type: 'android',
    id: 'and1_edgm',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36 EdgA/129.0.0.0'
  },
  {
    name: 'Android 11 - Firefox 131 (Phone)',
    type: 'android',
    id: 'and1_ffm',
    userAgent:
      'Mozilla/5.0 (Android 11; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0'
  },
  {
    name: 'Android 11 - Firefox 131 (Tablet)',
    type: 'android',
    id: 'and1_fft',
    userAgent:
      'Mozilla/5.0 (Android 11; Tablet; rv:131.0) Gecko/109.0 Firefox/131.0'
  },
  {
    name: 'Android 11 - Chrome 129 (Phone)',
    type: 'android',
    id: 'and1_gcrm',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36'
  },
  {
    name: 'Android 11 - Chrome 129 (Tablet)',
    type: 'android',
    id: 'and1_gcrt',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'Android 12 - Edge 129 (Phone)',
    type: 'android',
    id: 'and2_edgm',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36 EdgA/129.0.0.0'
  },
  {
    name: 'Android 12 - Firefox 131 (Phone)',
    type: 'android',
    id: 'and2_ffm',
    userAgent:
      'Mozilla/5.0 (Android 12; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0'
  },
  {
    name: 'Android 12 - Firefox 131 (Tablet)',
    type: 'android',
    id: 'and2_fft',
    userAgent:
      'Mozilla/5.0 (Android 12; Tablet; rv:131.0) Gecko/109.0 Firefox/131.0'
  },
  {
    name: 'Android 12 - Chrome 129 (Phone)',
    type: 'android',
    id: 'and2_gcrm',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36'
  },
  {
    name: 'Android 12 - Chrome 129 (Tablet)',
    type: 'android',
    id: 'and2_gcrt',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'Android 13 - Edge 129 (Phone)',
    type: 'android',
    id: 'and3_edgm',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36 EdgA/129.0.0.0'
  },
  {
    name: 'Android 13 - Firefox 131 (Phone)',
    type: 'android',
    id: 'and3_ffm',
    userAgent:
      'Mozilla/5.0 (Android 13; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0'
  },
  {
    name: 'Android 13 - Firefox 131 (Tablet)',
    type: 'android',
    id: 'and3_fft',
    userAgent:
      'Mozilla/5.0 (Android 13; Tablet; rv:131.0) Gecko/109.0 Firefox/131.0'
  },
  {
    name: 'Android 13 - Chrome 129 (Phone)',
    type: 'android',
    id: 'and3_gcrm',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36'
  },
  {
    name: 'Android 13 - Chrome 129 (Tablet)',
    type: 'android',
    id: 'and3_gcrt',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  },
  {
    name: 'Android 14 - Edge 129 (Phone)',
    type: 'android',
    id: 'and4_edgm',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36 EdgA/129.0.0.0'
  },
  {
    name: 'Android 14 - Firefox 131 (Phone)',
    type: 'android',
    id: 'and4_ffm',
    userAgent:
      'Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0'
  },
  {
    name: 'Android 14 - Firefox 131 (Tablet)',
    type: 'android',
    id: 'and4_fft',
    userAgent:
      'Mozilla/5.0 (Android 14; Tablet; rv:131.0) Gecko/109.0 Firefox/131.0'
  },
  {
    name: 'Android 14 - Chrome 129 (Phone)',
    type: 'android',
    id: 'and4_gcrm',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36'
  },
  {
    name: 'Android 14 - Chrome 129 (Tablet)',
    type: 'android',
    id: 'and4_gcrt',
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  }
]
