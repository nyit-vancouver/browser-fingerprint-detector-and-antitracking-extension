export function getDeviceResolution() {
  const width = window.screen.width * window.devicePixelRatio
  const height = window.screen.height * window.devicePixelRatio
  return { width, height }
}
