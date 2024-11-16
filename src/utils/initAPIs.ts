import {
  blockWebrtc,
  rewriteAttribute,
  rewriteAudio,
  rewriteCanvas,
  rewriteTimezone,
  rewriteWebgl
} from '@/utils/rewriteAPI'

// initAPIs will only be called when the data is not empty
// logs will be recorded when the data is not empty
// whether rewrite or not depends on if there is stored data
function initAPIs(data: Record<string, any>) {
  // spoof user agent
  rewriteAttribute(data, {
    obj: window.navigator,
    objStr: 'navigator',
    paramName: 'user-agent',
    propName: 'userAgent'
  })
  // HARDWARE
  // spoof screen size
  rewriteAttribute(data, {
    obj: window.screen,
    objStr: 'screen',
    paramName: 'height',
    propName: 'height'
  })
  rewriteAttribute(data, {
    obj: window.screen,
    objStr: 'screen',
    paramName: 'width',
    propName: 'width'
  })
  // spoof colorDepth
  rewriteAttribute(data, {
    obj: window.screen,
    objStr: 'screen',
    paramName: 'colorDepth',
    propName: 'colorDepth'
  })
  // spoof hardwareConcurrency
  rewriteAttribute(data, {
    obj: window.navigator,
    objStr: 'navigator',
    paramName: 'hardwareConcurrency',
    propName: 'hardwareConcurrency'
  })
  // spoof deviceMemory
  rewriteAttribute(data, {
    obj: window.navigator,
    objStr: 'navigator',
    paramName: 'deviceMemory',
    propName: 'deviceMemory'
  })
  // spoof canvas
  rewriteCanvas(data.spoofCanvas)
  // spoof webgl
  rewriteWebgl(data.spoofWebgl)
  // spoof audio
  rewriteAudio(data.spoofAudioContext)

  // SOFTWARE
  // timezone
  rewriteTimezone(data)
  // spoof language
  rewriteAttribute(data, {
    obj: window.navigator,
    objStr: 'navigator',
    paramName: 'language',
    propName: 'language'
  })
  // spoof font

  // NETWORK
  // block webrtc
  blockWebrtc(data.disableWebRTC)
}

export { initAPIs }
