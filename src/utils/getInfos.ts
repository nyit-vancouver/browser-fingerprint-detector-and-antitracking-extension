import UAParser from 'ua-parser-js'
import crypto from 'crypto'

async function getOSInfo(): Promise<{
  name: string
  version: string
  details: string
}> {
  let osName = 'Unknown'
  let osVersion = ''

  // 使用 navigator.userAgentData（如果可用）
  if (navigator.userAgentData) {
    const platformInfo = await navigator.userAgentData.getHighEntropyValues([
      'platform',
      'platformVersion'
    ])
    osName = platformInfo.platform || 'Unknown'
    osVersion = platformInfo.platformVersion || ''
  } else {
    // 回退到使用 UAParser
    const parser = new UAParser()
    const result = parser.getResult()
    osName = result.os.name || 'Unknown'
    osVersion = result.os.version || ''
  }

  // 对于特定平台的额外信息
  if (osName.toLowerCase().includes('mac')) {
    osName = 'macOS'
  } else if (osName.toLowerCase().includes('win')) {
    osName = 'Windows'
  }

  const details = `${osName} ${osVersion}`.trim()
  return { name: osName, version: osVersion, details }
}

interface Plugin {
  name: string
  description: string
  filename?: string
  extensionId?: string
}

export async function getBroswerInfos() {
  let browserName = 'Unknown'
  let browserVersion = 'Unknown'
  let deviceVendor = 'unknown'
  let deviceModel = 'unknown'
  let headerUA = 'Unknown'
  const javascriptUA = navigator.userAgent

  try {
    // 获取 Header UA
    const response = await fetch('https://httpbin.org/headers', {
      method: 'GET'
    })
    const data = await response.json()
    headerUA = data.headers['User-Agent'] || 'Not available'

    // 使用 UAParser 解析 JavaScript UA
    const parser = new UAParser(javascriptUA)
    const browserInfo = parser.getBrowser()
    const deviceInfo = parser.getDevice()
    browserName = browserInfo.name || 'Unknown'
    browserVersion = browserInfo.version || 'Unknown'
    deviceVendor = deviceInfo.vendor || 'unknown'
    deviceModel = deviceInfo.model || 'unknown'
  } catch (error) {
    console.error('Error getting browser info:', error)
  }

  const osInfo = await getOSInfo()

  const plugins: Plugin[] = []
  if (navigator.plugins) {
    for (let i = 0; i < navigator.plugins.length; i++) {
      const plugin = navigator.plugins[i]
      const pluginInfo: Plugin = {
        name: plugin.name,
        description: plugin.description
      }

      if (plugin.filename) {
        pluginInfo.filename = plugin.filename
      }

      // 检测Chrome PDF Plugin
      if (plugin.name === 'Chrome PDF Plugin') {
        pluginInfo.extensionId = 'mhjfbmdgcfjbbpaeojofohoefgiehjai'
      }

      // 检测Chrome PDF Viewer
      if (plugin.name === 'Chrome PDF Viewer') {
        pluginInfo.extensionId = 'mhjfbmdgcfjbbpaeojofohoefgiehjai'
      }

      plugins.push(pluginInfo)
    }
  }

  // 检测PDF Viewer
  if (navigator.pdfViewerEnabled) {
    plugins.push({
      name: 'PDF Viewer',
      description: 'Built-in PDF viewer'
    })
  }

  // 检测Microsoft Edge PDF Viewer
  if ((navigator as any).msSaveOrOpenBlob) {
    plugins.push({
      name: 'Microsoft Edge PDF Viewer',
      description: 'Built-in PDF viewer for Microsoft Edge'
    })
  }

  // 检测WebKit built-in PDF
  if ((window as any).WebKitPDFPlugin) {
    plugins.push({
      name: 'WebKit built-in PDF',
      description: 'Built-in PDF viewer for WebKit-based browsers'
    })
  }

  return {
    browser: {
      name: browserName,
      version: browserVersion,
      header: headerUA,
      javascript: javascriptUA
    },
    device: {
      type: getDeviceType(),
      vendor: deviceVendor,
      model: deviceModel
    },
    engine: { name: 'unknown', version: 'unknown' },
    os: osInfo,
    plugins
  }
}

function getDeviceType(): string {
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile ? 'Mobile' : 'Desktop'
  }

  // 如果 userAgentData 不可用，回退到传统方法
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet'
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'Mobile'
  }
  return 'Desktop'
}

export async function getHardwareInfos() {
  const canvas = document.createElement('canvas')
  let webGL = 'Not available'
  let canvasFingerprint = 'Not available'

  try {
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl instanceof WebGLRenderingContext) {
      webGL = gl.getParameter(gl.VERSION)
    }

    // 生成 canvas 指纹
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = "14px 'Arial'"
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = '#f60'
      ctx.fillRect(125, 1, 62, 20)
      ctx.fillStyle = '#069'
      ctx.fillText('abcdefghijklmnopqrstuvwxyz', 2, 15)
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
      ctx.fillText('abcdefghijklmnopqrstuvwxyz', 4, 17)

      const dataURL = canvas.toDataURL()
      canvasFingerprint = crypto.createHash('md5').update(dataURL).digest('hex')
    }
  } catch (e) {
    console.error('Error getting WebGL or Canvas info:', e)
  }

  let audio = 'Not available'
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext
    if (AudioContext) {
      const audioContext = new AudioContext()
      audio = audioContext.sampleRate.toString()
    }
  } catch (e) {
    console.error('Error getting audio info:', e)
  }

  return {
    canvasFingerprint,
    webGL,
    audio,
    video: document.createElement('video').canPlayType('video/mp4'),
    screenSize: `${window.screen.width}x${window.screen.height}`,
    resolution: `${window.screen.availWidth}x${window.screen.availHeight}`,
    colorDepth: window.screen.colorDepth.toString(),
    cpu: {
      architecture: navigator.hardwareConcurrency
        ? `${navigator.hardwareConcurrency} cores`
        : 'unknown'
    }
  }
}

export async function getGeneralInfos() {
  const dnt = navigator.doNotTrack
  const doNotTrack: string =
    dnt === '1' || dnt === 'yes'
      ? 'Enabled'
      : dnt === '0' || dnt === 'no'
        ? 'Disabled'
        : 'Not set'

  return {
    language: navigator.language,
    fonts: await detectAvailableFonts(),
    cpu: navigator.hardwareConcurrency,
    cookie: navigator.cookieEnabled,
    doNotTrack,
    referrer: document.referrer || 'Direct visit',
    flash: detectFlash(),
    activeX: detectActiveX(),
    java: detectJava(),
    javascript: detectJavascript(), // 新增的JavaScript检测
    portScan: 'Not available' // 新增的Port Scan信息
  }
}

function detectFlash(): string {
  let flashEnabled = false

  try {
    // 使用类型断言，确保 TypeScript 不会报错
    if (typeof (window as any).ActiveXObject !== 'undefined') {
      flashEnabled = Boolean(
        new (window as any).ActiveXObject('ShockwaveFlash.ShockwaveFlash')
      )
    }
  } catch (e) {
    // 捕获异常，不做任何操作
    console.error('Error detecting Flash:', e)
  }

  if (!flashEnabled) {
    // 通过遍历 mimeTypes 来检查是否存在 application/x-shockwave-flash
    const mimeTypes = navigator.mimeTypes
    if (mimeTypes && mimeTypes.namedItem('application/x-shockwave-flash')) {
      flashEnabled = true
    }
  }

  return flashEnabled ? 'Enabled' : 'Disabled'
}

function detectActiveX(): string {
  try {
    return typeof (window as any).ActiveXObject !== 'undefined'
      ? 'Enabled'
      : 'Disabled'
  } catch (_) {
    console.error('Error detecting ActiveX:', _)
    return 'Disabled'
  }
}

function detectJava(): string {
  let javaEnabled = navigator.javaEnabled()

  // 额外检查 Java 插件
  if (!javaEnabled && navigator.plugins) {
    for (let i = 0; i < navigator.plugins.length; i++) {
      if (navigator.plugins[i].name.toLowerCase().indexOf('java') > -1) {
        javaEnabled = true
        break
      }
    }
  }

  return javaEnabled ? 'Enabled' : 'Disabled'
}

function detectJavascript(): string {
  return 'Enabled' // 如果这段代码能够执行，说明JavaScript是启用的
}

async function detectAvailableFonts() {
  const baseFonts = ['monospace', 'sans-serif', 'serif']
  const fontList = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Times',
    'Courier New',
    'Courier',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Bookman',
    'Comic Sans MS',
    'Trebuchet MS',
    'Arial Black',
    'Impact',
    'Tahoma',
    'Calibri',
    'Cambria',
    'Consolas',
    'Franklin Gothic',
    'Futura',
    'Geneva',
    'Lucida Grande',
    'Optima',
    'Segoe UI',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Noto Sans',
    'Source Sans Pro',
    'Ubuntu',
    'Merriweather',
    'Playfair Display',
    'Raleway',
    'Oswald',
    'Poppins',
    'Nunito',
    'Fira Sans',
    'Quicksand',
    'Josefin Sans',
    'Work Sans',
    'Mulish',
    'Inter',
    'Rubik',
    'Barlow',
    'Karla'
  ]

  const availableFonts = new Set<string>()

  // 方法1: 测量文本高度
  function createSpan(fontFamily: string) {
    const span = document.createElement('span')
    span.style.fontFamily = fontFamily
    span.style.fontSize = '12px'
    span.style.position = 'absolute'
    span.style.left = '-9999px'
    span.style.visibility = 'hidden'
    span.textContent = 'mmmmmmmmmmlli'
    return span
  }

  const testDiv = document.createElement('div')
  document.body.appendChild(testDiv)

  const baseFontSpans = baseFonts.map((font) => createSpan(font))
  baseFontSpans.forEach((span) => testDiv.appendChild(span))

  for (const font of fontList) {
    const testSpan = createSpan(`'${font}', ${baseFonts.join(', ')}`)
    testDiv.appendChild(testSpan)

    const isAvailable = baseFontSpans.some(
      (baseSpan) =>
        testSpan.offsetWidth !== baseSpan.offsetWidth ||
        testSpan.offsetHeight !== baseSpan.offsetHeight
    )

    if (isAvailable) {
      availableFonts.add(font)
    }

    testDiv.removeChild(testSpan)
  }

  document.body.removeChild(testDiv)

  // 方法2: 浏览器函数枚举（如果可用）
  if ('queryLocalFonts' in window) {
    try {
      const button = document.createElement('button')
      button.textContent = 'Detect System Fonts'
      button.style.position = 'fixed'
      button.style.bottom = '10px'
      button.style.right = '10px'
      button.style.zIndex = '9999'
      document.body.appendChild(button)

      button.onclick = async () => {
        try {
          const fonts = await (window as any).queryLocalFonts()
          fonts.forEach((font: any) => {
            if (fontList.includes(font.family)) {
              availableFonts.add(font.family)
            }
          })
          console.log('Method 2 (user triggered):', Array.from(availableFonts))
          document.body.removeChild(button)
        } catch (error) {
          console.error('Error querying local fonts:', error)
        }
      }
    } catch (error) {
      console.error('Error setting up font detection:', error)
    }
  } else {
    console.log('queryLocalFonts API is not available')
  }

  // 方法3: Canvas 检测
  function canvasDetect(font: string) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return false

    const testText = 'abcdefghijklmnopqrstuvwxyz0123456789'
    context.font = `12px ${font}, Arial`
    context.fillText(testText, 0, 20)
    const baseline = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data

    context.font = '12px Arial'
    context.fillText(testText, 0, 20)
    const test = context.getImageData(0, 0, canvas.width, canvas.height).data

    for (let i = 0; i < baseline.length; i += 4) {
      if (
        baseline[i] !== test[i] ||
        baseline[i + 1] !== test[i + 1] ||
        baseline[i + 2] !== test[i + 2]
      ) {
        return true
      }
    }
    return false
  }

  for (const font of fontList) {
    if (canvasDetect(font)) {
      availableFonts.add(font)
    }
  }
  return Array.from(availableFonts).join(', ')
}

// 添加新的函数来获取WebRTC IP
async function getWebRTCIP(): Promise<string> {
  return new Promise((resolve) => {
    const pc = new RTCPeerConnection({ iceServers: [] })
    pc.createDataChannel('')
    pc.createOffer().then(pc.setLocalDescription.bind(pc))
    pc.onicecandidate = (ice) => {
      if (ice && ice.candidate && ice.candidate.candidate) {
        const matches = ice.candidate.candidate.match(
          /([0-9]{1,3}(\.[0-9]{1,3}){3})/
        )
        if (matches) {
          resolve(matches[1])
        }
      }
    }
    setTimeout(() => resolve('Not available'), 1000)
  })
}

// 添加新的函数来获取WebRTC STUN IP
async function getWebRTCStunIP(): Promise<string> {
  return new Promise((resolve) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    })
    pc.createDataChannel('')
    pc.createOffer().then(pc.setLocalDescription.bind(pc))
    pc.onicecandidate = (ice) => {
      if (ice && ice.candidate && ice.candidate.candidate) {
        const matches = ice.candidate.candidate.match(
          /([0-9]{1,3}(\.[0-9]{1,3}){3})/
        )
        if (matches) {
          resolve(matches[1])
        }
      }
    }
    setTimeout(() => resolve('Not available'), 1000)
  })
}

export async function getLocationInfos() {
  try {
    const response = await fetch('https://ipapi.co/json/')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    const webRTCIP = await getWebRTCIP()
    const webRTCStunIP = await getWebRTCStunIP()
    return {
      longitude: decimalToDMS(data.longitude || 0, false),
      latitude: decimalToDMS(data.latitude || 0, true),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneBasedOnIP: data.timezone || '',
      timeFromJavascript: new Date().toLocaleString(),
      timeFromIP: new Date().toLocaleString('en-US', {
        timeZone: data.timezone
      }),
      ip: data.ip || '',
      webRTCIP,
      webRTCStunIP,
      isp: data.org || '',
      geocode:
        data.country_code && data.postal
          ? `${data.country_code}-${data.postal}`
          : '',
      region: data.region || '',
      city: data.city || ''
    }
  } catch (error) {
    console.error('Error fetching location info:', error)
    return {
      longitude: '0',
      latitude: '0',
      timezone: '',
      timeZoneBasedOnIP: '',
      timeFromJavascript: new Date().toLocaleString(),
      timeFromIP: '',
      ip: '',
      webRTCIP: 'Not available',
      webRTCStunIP: 'Not available',
      isp: '',
      geocode: '',
      region: '',
      city: ''
    }
  }
}

// 辅助函数：将十进制度数转换为度分秒格式
function decimalToDMS(decimal: number, isLatitude: boolean): string {
  const absolute = Math.abs(decimal)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2)

  const direction = isLatitude
    ? decimal >= 0
      ? 'N'
      : 'S'
    : decimal >= 0
      ? 'E'
      : 'W'

  return `${degrees}°${minutes}'${seconds}"${direction}`
}
