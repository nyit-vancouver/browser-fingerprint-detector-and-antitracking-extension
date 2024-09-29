import crypto from 'crypto'

export function getCanvasFingerprint() {
  const canvasElement =
    (document.getElementById('canvas2D') as HTMLCanvasElement) ||
    document.createElement('canvas')
  const ctx = canvasElement.getContext('2d')
  if (!ctx) {
    return 'Not available'
  }

  const txt = 'Hello World'
  ctx.textBaseline = 'top'
  ctx.font = "14px 'Arial'"
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#f60'
  ctx.fillRect(125, 1, 62, 20)
  ctx.fillStyle = '#069'
  ctx.fillText(txt, 2, 15)
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
  ctx.fillText(txt, 4, 17)

  const canvasData = canvasElement.toDataURL()
  return crypto.createHash('md5').update(canvasData).digest('hex')
}
