import { CORES } from '@/constants/cores'
import { DEVICE_MEMORIES } from '@/constants/deviceMemories'
import { LANGUAGES } from '@/constants/languages'
import { SCREEN_SIZES } from '@/constants/screenSizes'
import { USER_AGENTS } from '@/constants/userAgents'
import {
  UNMASKED_RENDERERS,
  UNMASKED_VENDORS,
  VENDORS,
} from '@/constants/webgl'

import { getUserAgentDetails } from './getUserAgentDetails'

export function getRandomizedCanvasOffsets() {
  return [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ] // RGB
}

export function getRandomizedAudioConfigs() {
  return {
    channelDataNoise: Math.random() * 0.0001 - 0.00005,
    floatFrequencyDataNoise: Math.random() * 0.1 - 0.05,
    byteFrequencyDataNoise: Math.floor((Math.random() - 0.5) * 10),
    oscillatorStartNoise: Math.random() * 0.5 - 0.25,
  }
}

export function getRandomizedWebglConfigs() {
  return {
    renderer:
      UNMASKED_RENDERERS[Math.floor(Math.random() * UNMASKED_RENDERERS.length)],
    vendor: VENDORS[Math.floor(Math.random() * VENDORS.length)],
    unmaskedVendor:
      UNMASKED_VENDORS[Math.floor(Math.random() * UNMASKED_VENDORS.length)],
    unmaskedRenderer:
      UNMASKED_RENDERERS[Math.floor(Math.random() * UNMASKED_RENDERERS.length)],
    pixel: Math.floor(Math.random() * 5),
  }
}

export function getRandomizedUserAgent() {
  // Randomly select one from USER_AGENTS
  const uaInfo = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
  return getUserAgentDetails(uaInfo)
}

export function getRandomizedIP() {
  // Randomly generate an IP address
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join(
    '.',
  )
}

function getRandomizedScreenSize() {
  const [width, height] =
    SCREEN_SIZES[Math.floor(Math.random() * SCREEN_SIZES.length)].split('x')
  return { width: Number(width), height: Number(height) }
}

function getRandomizedLanguage() {
  const { code, nav, value } =
    LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)]
  return {
    language: code,
    languages: nav,
    'accept-language': value,
  }
}

export function getRandomizedConfigs() {
  let storageData: Record<string, any> = {}

  // canvas/webgl/audiocontext
  storageData.spoofCanvas = getRandomizedCanvasOffsets()
  storageData.spoofWebgl = getRandomizedWebglConfigs()
  storageData.spoofAudioContext = getRandomizedAudioConfigs()
  // user-agent/navigator.userAgentData
  storageData = { ...storageData, ...getRandomizedUserAgent() }

  // hardwareConcurrency/deviceMemory
  storageData.deviceMemory =
    DEVICE_MEMORIES[Math.floor(Math.random() * DEVICE_MEMORIES.length)]
  storageData.hardwareConcurrency =
    CORES[Math.floor(Math.random() * CORES.length)]
  // window.screen.width, window.screen.height and window.devicePixelRatio
  // TODO: window.devicePixelRatio
  storageData = { ...storageData, ...getRandomizedScreenSize() }
  // TODO: new Date().getTimezoneOffset()
  //navigator.language and navigator.languages
  storageData = { ...storageData, ...getRandomizedLanguage() }
  // webRTC
  storageData.disableWebRTC = true
  return storageData
}
