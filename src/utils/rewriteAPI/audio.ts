import { logQueue } from '@/utils/sendLogs'

interface SpoofAudioContext {
  getChannelDataNoise: number
  getFloatFrequencyDataNoise: number
  getByteFrequencyDataNoise: number
  oscillatorStartNoise: number
}

export function rewriteAudio(spoofAudioContext: SpoofAudioContext) {
  const originalGetChannelData = AudioBuffer.prototype.getChannelData

  AudioBuffer.prototype.getChannelData = function (channel) {
    const data = originalGetChannelData.call(this, channel)

    logQueue.sendLog('audio_getChannelData')

    if (!spoofAudioContext) return data

    // 在原始音频数据中引入轻微随机噪声
    for (let i = 0; i < data.length; i++) {
      data[i] += spoofAudioContext.getChannelDataNoise // 添加微小噪声
    }

    return data
  }

  const originalGetFloatFrequencyData =
    AnalyserNode.prototype.getFloatFrequencyData

  AnalyserNode.prototype.getFloatFrequencyData = function (array) {
    logQueue.sendLog('audio_getFloatFrequencyData')
    if (!spoofAudioContext) return
    const copiedArray = new Float32Array(array.length)
    originalGetFloatFrequencyData.call(this, copiedArray)
    // 为频率数据添加噪声
    for (let i = 0; i < copiedArray.length; i++) {
      copiedArray[i] += spoofAudioContext.getFloatFrequencyDataNoise // 微小随机值
    }

    array.set(copiedArray)
  }

  const originalGetByteFrequencyData =
    AnalyserNode.prototype.getByteFrequencyData

  AnalyserNode.prototype.getByteFrequencyData = function (array) {
    logQueue.sendLog('audio_getByteFrequencyData')
    if (!spoofAudioContext) return

    const copiedArray = new Uint8Array(array.length)
    originalGetByteFrequencyData.call(this, copiedArray)
    // 为频率数据添加噪声
    for (let i = 0; i < copiedArray.length; i++) {
      // 添加随机偏移量，范围控制在 -5 到 +5
      const noise = spoofAudioContext.getByteFrequencyDataNoise
      copiedArray[i] = Math.min(255, Math.max(0, copiedArray[i] + noise)) // 保证值在 0-255 范围内
    }
    array.set(copiedArray)
  }

  const originalStart = OscillatorNode.prototype.start

  OscillatorNode.prototype.start = function (when) {
    // 生成一个微小的随机偏移量，扰乱频率
    logQueue.sendLog('audio_start')
    if (!spoofAudioContext) return
    this.frequency.value += spoofAudioContext.oscillatorStartNoise // 加入偏移
    originalStart.call(this, when)
  }
}
