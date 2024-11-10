export async function getLocationInfos() {
  try {
    const response = await fetch('https://ipapi.co/json/')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    const webRTCIP = await getWebRTCIP()
    const webRTCStunIP = await getWebRTCStunIP()
    console.log(webRTCIP, webRTCStunIP)
    return {
      longitude: decimalToDMS(data.longitude || 0, false),
      latitude: decimalToDMS(data.latitude || 0, true),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneBasedOnIP: data.timezone || '',
      timeFromJavascript: new Date().toLocaleString(),
      timeFromIP: new Date().toLocaleString('en-US', {
        timeZone: data.timezone
      }),
      // TODO: add a switch to hide the IP address
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
