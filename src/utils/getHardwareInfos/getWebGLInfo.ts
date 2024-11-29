import crypto from 'crypto'

interface WebGLInfo {
  vendor: string
  renderer: string
  unmaskedVendor?: string
  unmaskedRenderer?: string
}

function createShader(gl: WebGLRenderingContext, type: GLenum, source: string) {
  const shader = gl.createShader(type)
  if (shader) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
  } else {
    console.error('Failed to create shader')
  }
  return shader
}

function getWebGLDeviceInfo(gl: WebGLRenderingContext) {
  const deviceInfo: WebGLInfo = {
    vendor: gl.getParameter(gl.VENDOR),
    renderer: gl.getParameter(gl.RENDERER),
  }

  // if the extension is available, get the unmasked vendor and renderer
  const extension = gl.getExtension('WEBGL_debug_renderer_info')
  if (extension) {
    deviceInfo.unmaskedVendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL)
    deviceInfo.unmaskedRenderer = gl.getParameter(
      extension.UNMASKED_RENDERER_WEBGL,
    )
  }

  return deviceInfo
}

function getWebGLFingerprint(
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
) {
  const vertexShaderSource = `
  attribute vec2 position;
  void main() {
      gl_Position = vec4(position, 0.0, 1.0);
  }
`

  const fragmentShaderSource = `
  void main() {
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);  // green
  }
`

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource,
  )

  const program = gl.createProgram()
  if (!program) {
    console.error('Failed to create WebGL program')
    return ''
  }
  if (vertexShader && fragmentShader) {
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)
  } else {
    console.error('Failed to attachShader')
  }

  // set up a buffer with 4 vertices
  const vertices = new Float32Array([
    -1.0,
    -1.0, // left bottom
    1.0,
    -1.0, // right bottom
    -1.0,
    1.0, // left top
    1.0,
    1.0, // right top
  ])

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const positionLocation = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  // paint
  gl.clearColor(1.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  // read pixels
  const pixels = new Uint8Array(canvas.width * canvas.height * 4)
  gl.readPixels(
    0,
    0,
    canvas.width,
    canvas.height,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels,
  )

  console.log('pixels', pixels)

  // use the pixels to generate a hash
  return crypto.createHash('md5').update(Buffer.from(pixels)).digest('hex')
}

export function getWebGLInfo() {
  const canvasElement =
    (document.getElementById('canvasWebGL') as HTMLCanvasElement) ||
    document.createElement('canvas')

  canvasElement.width = 240
  canvasElement.height = 60

  const gl =
    canvasElement.getContext('webgl') ||
    (canvasElement.getContext('experimental-webgl') as WebGLRenderingContext)
  console.log('context webgl', gl)
  if (!gl) {
    return `- vendor: Not available\n
        - renderer: Not available\n
      - WebGL Fingerprint: Not available\n
    `
  }
  const deviceInfo = getWebGLDeviceInfo(gl)
  const fingerprint = getWebGLFingerprint(gl, canvasElement)
  return `- vendor: ${deviceInfo.vendor}
      - renderer: ${deviceInfo.renderer}
      - unmaskedVendor: ${deviceInfo.unmaskedVendor}
      - unmaskedRenderer: ${deviceInfo.unmaskedRenderer}
    - WebGL Fingerprint: 
      ${fingerprint}
  `
}
