import { UAParser } from 'ua-parser-js'

export async function getBroswerInfos() {
  const parser = new UAParser()
  const res = parser.getResult()
  const plugins =
    Object.values(navigator.plugins)?.map((item) => ({
      name: item.name,
      description: item.description
    })) || []

  if (navigator.userAgentData) {
    const ua = await navigator.userAgentData.getHighEntropyValues([
      'platform',
      'platformVersion',
      'architecture',
      'model',
      'uaFullVersion'
    ])
    return {
      ...res,
      browser: {
        ...res.browser,
        version:
          ua.uaFullVersion ||
          ua.fullVersionList?.join(',') ||
          res.browser.version
      },
      device: {
        ...res.device,
        model: ua.model
      },
      os: {
        ...res.os,
        version: ua.platformVersion
      },
      cpu: {
        architecture: ua.architecture
      },
      plugins
    }
  }
  return { ...res, plugins }
}

export async function getLocationInfos() {
  // TODO: 地理位置经纬度、时区、当地时间、IP地址、ISP、地理编码、地区城市、国家
  // TODO: webRTC、Geolocation API、3rd party service

  return {
    longtitute: 0,
    latitude: 0,
    timezone: '',
    localTime: '',
    ip: '',
    isp: '',
    geocode: '',
    region: '',
    city: ''
  }
}
export async function getHardwareInfos() {
  // TODO: canvas、webGL、audio、video、screen size and resolution、color depth、
  return {
    canvas: '',
    webGL: '',
    audio: '',
    video: '',
    screenSize: '',
    resolution: '',
    colorDepth: ''
  }
}
export async function getGeneralInfos() {
  // TODO: 语言、字体、CPU、cookie、header（DNT、DoNotTrack、referrer、接收字体）
  return {
    language: '',
    fonts: '',
    cpu: '',
    cookie: '',
    header: {
      // TODO: other headers
      DNT: '',
      referrer: '',
      acceptLanguage: ''
    }
  }
}
