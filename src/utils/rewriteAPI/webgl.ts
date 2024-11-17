import { logQueue } from '@/utils/sendLogs'

interface SpoofWebgl {
  renderer: string
  vendor: string
  unmaskedVendor: string
  unmaskedRenderer: string
  pixel: number
}

export function rewriteWebgl(spoofWebgl?: SpoofWebgl) {
  const originalGetParameter = WebGLRenderingContext.prototype.getParameter

  WebGLRenderingContext.prototype.getParameter = function (parameter) {
    let value = originalGetParameter.call(this, parameter)

    logQueue.sendLog('webgl_getParameter')

    if (!spoofWebgl) return value

    const extension = this.getExtension('WEBGL_debug_renderer_info')

    if (parameter === this.RENDERER) {
      value = spoofWebgl.renderer
    } else if (parameter === this.VENDOR) {
      value = spoofWebgl.vendor
    } else if (extension && parameter === extension.UNMASKED_VENDOR_WEBGL) {
      value = spoofWebgl.unmaskedVendor
    } else if (extension && parameter === extension.UNMASKED_RENDERER_WEBGL) {
      value = spoofWebgl.unmaskedRenderer
    } else if (
      parameter === this.MAX_TEXTURE_SIZE ||
      parameter === this.MAX_RENDERBUFFER_SIZE
    ) {
      value = value - Math.floor(Math.random() * 10)
    }
    return value
  }

  const originalReadPixels = WebGLRenderingContext.prototype.readPixels

  WebGLRenderingContext.prototype.readPixels = function (
    x,
    y,
    width,
    height,
    format,
    type,
    pixels
  ) {
    originalReadPixels.call(this, x, y, width, height, format, type, pixels)

    logQueue.sendLog('webgl_readPixels')

    if (!pixels || !spoofWebgl) return

    // 添加噪声，随机改变像素值
    const pixelArray = new Uint8Array(
      pixels.buffer,
      pixels.byteOffset,
      pixels.byteLength
    )
    for (let i = 0; i < pixelArray.length; i++) {
      pixelArray[i] += spoofWebgl.pixel // 添加小幅噪声
    }
  }
}
