import {
  UNMASKED_RENDERERS,
  UNMASKED_VENDORS,
  VENDORS
} from '@/constants/webgl'

export function rewriteWebgl() {
  const originalGetParameter = WebGLRenderingContext.prototype.getParameter

  WebGLRenderingContext.prototype.getParameter = function (parameter) {
    let value = originalGetParameter.call(this, parameter)
    const extension = this.getExtension('WEBGL_debug_renderer_info')

    if (parameter === this.RENDERER) {
      value =
        UNMASKED_RENDERERS[
          Math.floor(Math.random() * UNMASKED_RENDERERS.length)
        ]
    } else if (parameter === this.VENDOR) {
      value = VENDORS[Math.floor(Math.random() * VENDORS.length)]
    } else if (extension && parameter === extension.UNMASKED_VENDOR_WEBGL) {
      value =
        UNMASKED_VENDORS[Math.floor(Math.random() * UNMASKED_VENDORS.length)]
    } else if (extension && parameter === extension.UNMASKED_RENDERER_WEBGL) {
      value =
        UNMASKED_RENDERERS[
          Math.floor(Math.random() * UNMASKED_RENDERERS.length)
        ]
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
    if (!pixels) return
    // 添加噪声，随机改变像素值
    const pixelArray = new Uint8Array(
      pixels.buffer,
      pixels.byteOffset,
      pixels.byteLength
    )
    for (let i = 0; i < pixelArray.length; i++) {
      pixelArray[i] += Math.floor(Math.random() * 5) // 添加小幅噪声
    }
  }
}
