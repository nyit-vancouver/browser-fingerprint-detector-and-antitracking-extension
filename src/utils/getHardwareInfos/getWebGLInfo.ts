import crypto from 'crypto'

interface WebGLInfo {
  vendor: string
  renderer: string
  unmaskedVendor?: string
  unmaskedRenderer?: string
}

// 创建着色器
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
    vendor: gl.getParameter(gl.VENDOR), // 浏览器的 WebGL 供应商信息
    renderer: gl.getParameter(gl.RENDERER) // 渲染器（通常是 GPU）的名字
  }

  // 如果支持 WEBGL_debug_renderer_info 扩展，提供更详细的 GPU 信息
  const extension = gl.getExtension('WEBGL_debug_renderer_info')
  if (extension) {
    deviceInfo.unmaskedVendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL)
    deviceInfo.unmaskedRenderer = gl.getParameter(
      extension.UNMASKED_RENDERER_WEBGL
    )
  }

  return deviceInfo
}

function getWebGLFingerprint(
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement
) {
  // 创建一个简单的 WebGL 渲染
  const vertexShaderSource = `
  attribute vec2 position;
  void main() {
      gl_Position = vec4(position, 0.0, 1.0);
  }
`

  const fragmentShaderSource = `
  void main() {
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);  // 绿色
  }
`

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  )

  // 创建程序
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

  // 设置顶点数据
  const vertices = new Float32Array([
    -1.0,
    -1.0, // 左下
    1.0,
    -1.0, // 右下
    -1.0,
    1.0, // 左上
    1.0,
    1.0 // 右上
  ])

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const positionLocation = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  // 绘制
  gl.clearColor(1.0, 0.0, 0.0, 1.0) // 红色背景
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  // 读取渲染结果
  const pixels = new Uint8Array(canvas.width * canvas.height * 4)
  gl.readPixels(
    0,
    0,
    canvas.width,
    canvas.height,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels
  )

  console.log('pixels', pixels)

  // 用crypto将像素数据转换为哈希值
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
