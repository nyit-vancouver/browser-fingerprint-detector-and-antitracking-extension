import { getAudioFingerprint } from './getAudioFingerprint'
import { getCanvasFingerprint } from './getCanvasFingerprint'
import { getWebGLInfo } from './getWebGLInfo'
import { getDeviceResolution } from './getDeviceResolution'

export async function getHardwareInfos() {
  let audio = 'unknown'
  try {
    audio = await getAudioFingerprint()
  } catch (e) {
    console.error('Error getting audio fingerprint:', e)
  }

  const { width, height } = getDeviceResolution()
  const deviceMemory = (navigator as any).deviceMemory

  return {
    canvas: getCanvasFingerprint(),
    webGL: getWebGLInfo(),
    audio,
    screenSize: `${window.screen.width}x${window.screen.height}`, // will not change after resizing
    resolution: `${width}x${height}`,
    colorDepth: window.screen.colorDepth.toString(),
    cpu: navigator.hardwareConcurrency
      ? `${navigator.hardwareConcurrency} cores`
      : 'unknown',
    deviceMemory: deviceMemory ? `${deviceMemory} GB` : 'unknown'
  }
}
