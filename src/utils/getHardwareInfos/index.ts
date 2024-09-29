import { getAudioFingerprint } from './getAudioFingerprint'
import { getCanvasFingerprint } from './getCanvasFingerprint'
import { getWebGLInfo } from './getWebGLInfo'

export async function getHardwareInfos() {
  let audio = 'unknown'
  try {
    audio = await getAudioFingerprint()
  } catch (e) {
    console.error('Error getting audio fingerprint:', e)
  }

  return {
    canvas: getCanvasFingerprint(),
    webGL: getWebGLInfo(),
    audio,
    video: document.createElement('video').canPlayType('video/mp4'), // TODO
    screenSize: `${window.screen.width}x${window.screen.height}`, // TODO
    resolution: `${window.screen.availWidth}x${window.screen.availHeight}`, // TODO
    colorDepth: window.screen.colorDepth.toString(),
    cpu: {
      architecture: navigator.hardwareConcurrency
        ? `${navigator.hardwareConcurrency} cores`
        : 'unknown'
    }
  }
}
