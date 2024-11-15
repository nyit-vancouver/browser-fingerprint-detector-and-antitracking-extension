export function rewriteAudio() {
  const originalGetChannelData = AudioBuffer.prototype.getChannelData

  AudioBuffer.prototype.getChannelData = function (channel) {
    const data = originalGetChannelData.call(this, channel)

    // 在原始音频数据中引入轻微随机噪声
    for (let i = 0; i < data.length; i++) {
      data[i] += Math.random() * 0.0001 - 0.00005 // 添加微小噪声
    }

    return data
  }

  const originalGetFloatFrequencyData =
    AnalyserNode.prototype.getFloatFrequencyData

  AnalyserNode.prototype.getFloatFrequencyData = function (array) {
    const copiedArray = new Float32Array(array.length)
    originalGetFloatFrequencyData.call(this, copiedArray)

    // 为频率数据添加噪声
    for (let i = 0; i < copiedArray.length; i++) {
      copiedArray[i] += Math.random() * 0.1 - 0.05 // 微小随机值
    }

    array.set(copiedArray)
  }

  const originalStart = OscillatorNode.prototype.start

  OscillatorNode.prototype.start = function (when) {
    // 生成一个微小的随机偏移量，扰乱频率
    this.frequency.value += Math.random() * 0.5 - 0.25 // 加入偏移
    originalStart.call(this, when)
  }
}
