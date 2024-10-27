import defaultConfig from '../config/defaultConfig.json'

// 读取配置
export function readConfig() {
  try {
    const rawData = localStorage.getItem('userConfig')
    return rawData
      ? { ...defaultConfig, ...JSON.parse(rawData) }
      : defaultConfig
  } catch (error) {
    console.error('Error reading config:', error)
    return defaultConfig
  }
}

// 写入配置
export function writeConfig(config: any) {
  try {
    localStorage.setItem('userConfig', JSON.stringify(config))
  } catch (error) {
    console.error('Error writing config:', error)
  }
}

// 更新配置
export function updateConfig(key: string, value: any) {
  const config = readConfig()
  config[key] = value
  writeConfig(config)
  // 添加以下行来验证配置是否正确保存
  console.log('Config after update:', readConfig())
}

// 获取配置
export function getConfig(key: string) {
  const config = readConfig()
  return config[key]
}

// 其他 inject.ts 的代码...
