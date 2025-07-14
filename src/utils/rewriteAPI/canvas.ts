import { logCollector } from '@/utils/sendLogs'

export function rewriteCanvas(spoofCanvas?: number[]) {
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL

  HTMLCanvasElement.prototype.toDataURL = function (...args) {
    // Add random noise to the canvas content on each call
    const context = this.getContext('2d')
    const { width, height } = this
    logCollector.sendLog('canvas_toDataURL')

    if (!context) {
      return originalToDataURL.apply(this, args)
    }
    if (spoofCanvas) {
      // Generate slight random noise
      const imageData = context.getImageData(0, 0, width, height)
      const [r, g, b] = spoofCanvas
      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] += r // R
        imageData.data[i + 1] += g // G
        imageData.data[i + 2] += b // B
      }

      // Apply noise to the canvas
      context.putImageData(imageData, 0, 0)
    }
    // Call the original method and return the image data with noise
    return originalToDataURL.apply(this, args)
  }

  const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData

  CanvasRenderingContext2D.prototype.getImageData = function (x, y, w, h) {
    const imageData = originalGetImageData.call(this, x, y, w, h)
    logCollector.sendLog('canvas_getImageData')
    if (spoofCanvas) {
      // Add random noise to the image data
      const [r, g, b] = spoofCanvas
      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] += r // R
        imageData.data[i + 1] += g // G
        imageData.data[i + 2] += b // B
      }
    }
    return imageData
  }
}
