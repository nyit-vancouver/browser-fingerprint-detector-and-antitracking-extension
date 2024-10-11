import crypto from 'crypto'

export async function getAudioFingerprint(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) {
        return reject('Not available')
      }

      const audioContext = new AudioContext()
      const oscillator = audioContext.createOscillator()
      const analyser = audioContext.createAnalyser()
      const gain = audioContext.createGain()

      oscillator.type = 'triangle'
      oscillator.frequency.setValueAtTime(10000, audioContext.currentTime)
      gain.gain.setValueAtTime(0, audioContext.currentTime)

      oscillator.connect(gain)
      gain.connect(analyser)
      analyser.connect(audioContext.destination)

      oscillator.start(0)

      setTimeout(() => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(dataArray)

        const fingerprint = dataArray.toString()

        console.log('Audio fingerprint:', fingerprint)
        resolve(crypto.createHash('md5').update(fingerprint).digest('hex'))

        oscillator.stop()
        audioContext.close()
      }, 500)
    } catch (e) {
      console.error('Error generating audio fingerprint:', e)
      reject(e)
    }
  })
}
