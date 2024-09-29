import crypto from 'crypto'

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
