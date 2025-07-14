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
        description: plugin.description,
      }

      if (plugin.filename) {
        pluginInfo.filename = plugin.filename
      }

      if (plugin.name === 'Chrome PDF Plugin') {
        pluginInfo.extensionId = 'mhjfbmdgcfjbbpaeojofohoefgiehjai'
      }

      if (plugin.name === 'Chrome PDF Viewer') {
        pluginInfo.extensionId = 'mhjfbmdgcfjbbpaeojofohoefgiehjai'
      }

      plugins.push(pluginInfo)
    }
  }

  if (navigator.pdfViewerEnabled) {
    plugins.push({
      name: 'PDF Viewer',
      description: 'Built-in PDF viewer',
    })
  }

  if ((navigator as any).msSaveOrOpenBlob) {
    plugins.push({
      name: 'Microsoft Edge PDF Viewer',
      description: 'Built-in PDF viewer for Microsoft Edge',
    })
  }

  if ((window as any).WebKitPDFPlugin) {
    plugins.push({
      name: 'WebKit built-in PDF',
      description: 'Built-in PDF viewer for WebKit-based browsers',
    })
  }
  return plugins
}
