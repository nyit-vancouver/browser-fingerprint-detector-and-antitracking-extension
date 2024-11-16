import { logQueue } from '@/utils/sendLogs'

export function rewriteCanvas(spoofCanvas: number[]) {
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL

  HTMLCanvasElement.prototype.toDataURL = function (...args) {
    // 在每次调用时为canvas内容添加随机噪声
    const context = this.getContext('2d')
    const { width, height } = this
    logQueue.sendLog('canvas_toDataURL')

    if (!context) {
      return originalToDataURL.apply(this, args)
    }
    if (spoofCanvas) {
      // 生成轻微的随机噪声
      const imageData = context.getImageData(0, 0, width, height)
      const [r, g, b] = spoofCanvas
      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] += r // R
        imageData.data[i + 1] += g // G
        imageData.data[i + 2] += b // B
      }

      // 重新将噪声应用到canvas
      context.putImageData(imageData, 0, 0)
    }
    // 调用原始方法并返回带有噪声的图片数据
    return originalToDataURL.apply(this, args)
  }

  const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData

  CanvasRenderingContext2D.prototype.getImageData = function (x, y, w, h) {
    const imageData = originalGetImageData.call(this, x, y, w, h)
    logQueue.sendLog('canvas_getImageData')
    if (spoofCanvas) {
      // 为图像数据加入随机噪声
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
