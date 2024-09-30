export async function getSoftwareInfos() {
  const dnt = navigator.doNotTrack
  const doNotTrack: string =
    dnt === '1' || dnt === 'yes'
      ? 'Enabled'
      : dnt === '0' || dnt === 'no'
        ? 'Disabled'
        : 'Not set'

  return {
    language: navigator.language,
    fonts: await detectAvailableFonts(),
    cpu: navigator.hardwareConcurrency,
    cookie: navigator.cookieEnabled,
    doNotTrack,
    referrer: document.referrer || 'Direct visit',
    flash: detectFlash(),
    activeX: detectActiveX(),
    java: detectJava(),
    javascript: detectJavascript(), // 新增的JavaScript检测
    portScan: 'Not available' // 新增的Port Scan信息
  }
}

function detectFlash(): string {
  let flashEnabled = false

  try {
    // 使用类型断言，确保 TypeScript 不会报错
    if (typeof (window as any).ActiveXObject !== 'undefined') {
      flashEnabled = Boolean(
        new (window as any).ActiveXObject('ShockwaveFlash.ShockwaveFlash')
      )
    }
  } catch (e) {
    // 捕获异常，不做任何操作
    console.error('Error detecting Flash:', e)
  }

  if (!flashEnabled) {
    // 通过遍历 mimeTypes 来检查是否存在 application/x-shockwave-flash
    const mimeTypes = navigator.mimeTypes
    if (mimeTypes && mimeTypes.namedItem('application/x-shockwave-flash')) {
      flashEnabled = true
    }
  }

  return flashEnabled ? 'Enabled' : 'Disabled'
}

function detectActiveX(): string {
  try {
    return typeof (window as any).ActiveXObject !== 'undefined'
      ? 'Enabled'
      : 'Disabled'
  } catch (_) {
    console.error('Error detecting ActiveX:', _)
    return 'Disabled'
  }
}

function detectJava(): string {
  let javaEnabled = navigator.javaEnabled()

  // 额外检查 Java 插件
  if (!javaEnabled && navigator.plugins) {
    for (let i = 0; i < navigator.plugins.length; i++) {
      if (navigator.plugins[i].name.toLowerCase().indexOf('java') > -1) {
        javaEnabled = true
        break
      }
    }
  }

  return javaEnabled ? 'Enabled' : 'Disabled'
}

function detectJavascript(): string {
  return 'Enabled' // 如果这段代码能够执行，说明JavaScript是启用的
}

async function detectAvailableFonts() {
  const baseFonts = ['monospace', 'sans-serif', 'serif']
  const fontList = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Times',
    'Courier New',
    'Courier',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Bookman',
    'Comic Sans MS',
    'Trebuchet MS',
    'Arial Black',
    'Impact',
    'Tahoma',
    'Calibri',
    'Cambria',
    'Consolas',
    'Franklin Gothic',
    'Futura',
    'Geneva',
    'Lucida Grande',
    'Optima',
    'Segoe UI',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Noto Sans',
    'Source Sans Pro',
    'Ubuntu',
    'Merriweather',
    'Playfair Display',
    'Raleway',
    'Oswald',
    'Poppins',
    'Nunito',
    'Fira Sans',
    'Quicksand',
    'Josefin Sans',
    'Work Sans',
    'Mulish',
    'Inter',
    'Rubik',
    'Barlow',
    'Karla'
  ]

  const availableFonts = new Set<string>()

  // 方法1: 测量文本高度
  function createSpan(fontFamily: string) {
    const span = document.createElement('span')
    span.style.fontFamily = fontFamily
    span.style.fontSize = '12px'
    span.style.position = 'absolute'
    span.style.left = '-9999px'
    span.style.visibility = 'hidden'
    span.textContent = 'mmmmmmmmmmlli'
    return span
  }

  const testDiv = document.createElement('div')
  document.body.appendChild(testDiv)

  const baseFontSpans = baseFonts.map((font) => createSpan(font))
  baseFontSpans.forEach((span) => testDiv.appendChild(span))

  for (const font of fontList) {
    const testSpan = createSpan(`'${font}', ${baseFonts.join(', ')}`)
    testDiv.appendChild(testSpan)

    const isAvailable = baseFontSpans.some(
      (baseSpan) =>
        testSpan.offsetWidth !== baseSpan.offsetWidth ||
        testSpan.offsetHeight !== baseSpan.offsetHeight
    )

    if (isAvailable) {
      availableFonts.add(font)
    }

    testDiv.removeChild(testSpan)
  }

  document.body.removeChild(testDiv)

  // 方法2: 浏览器函数枚举（如果可用）
  if ('queryLocalFonts' in window) {
    try {
      const button = document.createElement('button')
      button.textContent = 'Detect System Fonts'
      button.style.position = 'fixed'
      button.style.bottom = '10px'
      button.style.right = '10px'
      button.style.zIndex = '9999'
      document.body.appendChild(button)

      button.onclick = async () => {
        try {
          const fonts = await (window as any).queryLocalFonts()
          fonts.forEach((font: any) => {
            if (fontList.includes(font.family)) {
              availableFonts.add(font.family)
            }
          })
          console.log('Method 2 (user triggered):', Array.from(availableFonts))
          document.body.removeChild(button)
        } catch (error) {
          console.error('Error querying local fonts:', error)
        }
      }
    } catch (error) {
      console.error('Error setting up font detection:', error)
    }
  } else {
    console.log('queryLocalFonts API is not available')
  }

  // 方法3: Canvas 检测
  function canvasDetect(font: string) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return false

    const testText = 'abcdefghijklmnopqrstuvwxyz0123456789'
    context.font = `12px ${font}, Arial`
    context.fillText(testText, 0, 20)
    const baseline = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data

    context.font = '12px Arial'
    context.fillText(testText, 0, 20)
    const test = context.getImageData(0, 0, canvas.width, canvas.height).data

    for (let i = 0; i < baseline.length; i += 4) {
      if (
        baseline[i] !== test[i] ||
        baseline[i + 1] !== test[i + 1] ||
        baseline[i + 2] !== test[i + 2]
      ) {
        return true
      }
    }
    return false
  }

  for (const font of fontList) {
    if (canvasDetect(font)) {
      availableFonts.add(font)
    }
  }
  return Array.from(availableFonts).join(', ')
}
