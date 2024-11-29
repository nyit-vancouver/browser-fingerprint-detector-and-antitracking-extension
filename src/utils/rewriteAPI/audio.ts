import { logCollector } from '@/utils/sendLogs'

interface SpoofAudioContext {
  getChannelDataNoise: number
  getFloatFrequencyDataNoise: number
  getByteFrequencyDataNoise: number
  oscillatorStartNoise: number
}

export function rewriteAudio(spoofAudioContext?: SpoofAudioContext) {
  const originalGetChannelData = AudioBuffer.prototype.getChannelData

  AudioBuffer.prototype.getChannelData = function (channel) {
    const data = originalGetChannelData.call(this, channel)

    logCollector.sendLog('audio_getChannelData')

    if (!spoofAudioContext) return data

    // add noise to the channel data
    for (let i = 0; i < data.length; i++) {
      data[i] += spoofAudioContext.getChannelDataNoise
    }

    return data
  }

  const originalGetFloatFrequencyData =
    AnalyserNode.prototype.getFloatFrequencyData

  AnalyserNode.prototype.getFloatFrequencyData = function (array) {
    logCollector.sendLog('audio_getFloatFrequencyData')
    if (!spoofAudioContext) return
    const copiedArray = new Float32Array(array.length)
    originalGetFloatFrequencyData.call(this, copiedArray)
    // add noise to the frequency data
    for (let i = 0; i < copiedArray.length; i++) {
      copiedArray[i] += spoofAudioContext.getFloatFrequencyDataNoise
    }

    array.set(copiedArray)
  }

  const originalGetByteFrequencyData =
    AnalyserNode.prototype.getByteFrequencyData

  AnalyserNode.prototype.getByteFrequencyData = function (array) {
    logCollector.sendLog('audio_getByteFrequencyData')
    if (!spoofAudioContext) return

    const copiedArray = new Uint8Array(array.length)
    originalGetByteFrequencyData.call(this, copiedArray)
    for (let i = 0; i < copiedArray.length; i++) {
      // add noise to the frequency data
      const noise = spoofAudioContext.getByteFrequencyDataNoise
      copiedArray[i] = Math.min(255, Math.max(0, copiedArray[i] + noise)) // ensure the value is within the range [0, 255]
    }
    array.set(copiedArray)
  }

  const originalStart = OscillatorNode.prototype.start

  OscillatorNode.prototype.start = function (when) {
    // create a new oscillator
    logCollector.sendLog('audio_start')
    if (!spoofAudioContext) return
    this.frequency.value += spoofAudioContext.oscillatorStartNoise // add noise to the frequency
    originalStart.call(this, when)
  }
}
