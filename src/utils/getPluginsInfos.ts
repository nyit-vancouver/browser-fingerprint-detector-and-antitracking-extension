interface Plugin {
  name: string
  description: string
  filename?: string
  extensionId?: string
}

export async function getPluginsInfos() {
  const plugins: Plugin[] = []
  if (navigator.plugins) {
    for (let i = 0; i < navigator.plugins.length; i++) {
      const plugin = navigator.plugins[i]
      const pluginInfo: Plugin = {
        name: plugin.name,
        description: plugin.description
      }

      if (plugin.filename) {
        pluginInfo.filename = plugin.filename
      }

      // 检测Chrome PDF Plugin
      if (plugin.name === 'Chrome PDF Plugin') {
        pluginInfo.extensionId = 'mhjfbmdgcfjbbpaeojofohoefgiehjai'
      }

      // 检测Chrome PDF Viewer
      if (plugin.name === 'Chrome PDF Viewer') {
        pluginInfo.extensionId = 'mhjfbmdgcfjbbpaeojofohoefgiehjai'
      }

      plugins.push(pluginInfo)
    }
  }

  // 检测PDF Viewer
  if (navigator.pdfViewerEnabled) {
    plugins.push({
      name: 'PDF Viewer',
      description: 'Built-in PDF viewer'
    })
  }

  // 检测Microsoft Edge PDF Viewer
  if ((navigator as any).msSaveOrOpenBlob) {
    plugins.push({
      name: 'Microsoft Edge PDF Viewer',
      description: 'Built-in PDF viewer for Microsoft Edge'
    })
  }

  // 检测WebKit built-in PDF
  if ((window as any).WebKitPDFPlugin) {
    plugins.push({
      name: 'WebKit built-in PDF',
      description: 'Built-in PDF viewer for WebKit-based browsers'
    })
  }
  return plugins
}
