export function rewriteCanvas() {
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL

  HTMLCanvasElement.prototype.toDataURL = function (...args) {
    // 在每次调用时为canvas内容添加随机噪声
    const context = this.getContext('2d')
    const { width, height } = this

    if (!context) {
      return originalToDataURL.apply(this, args)
    }

    // 生成轻微的随机噪声
    const imageData = context.getImageData(0, 0, width, height)
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] += Math.floor(Math.random() * 10) // R
      imageData.data[i + 1] += Math.floor(Math.random() * 10) // G
      imageData.data[i + 2] += Math.floor(Math.random() * 10) // B
    }

    // 重新将噪声应用到canvas
    context.putImageData(imageData, 0, 0)

    // 调用原始方法并返回带有噪声的图片数据
    return originalToDataURL.apply(this, args)
  }

  const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData

  CanvasRenderingContext2D.prototype.getImageData = function (x, y, w, h) {
    const imageData = originalGetImageData.call(this, x, y, w, h)

    // 为图像数据加入随机噪声
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] += Math.floor(Math.random() * 10) // R
      imageData.data[i + 1] += Math.floor(Math.random() * 10) // G
      imageData.data[i + 2] += Math.floor(Math.random() * 10) // B
    }

    return imageData
  }
}
