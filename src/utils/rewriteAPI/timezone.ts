import { logQueue } from '@/utils/sendLogs'

export function rewriteTimezone(data: Record<string, any>) {
  const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions
  Object.defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
    value: function () {
      logQueue.sendLog('timezone')
      // 调用原始的 resolvedOptions 方法
      const options = originalResolvedOptions.call(this)
      // 修改返回的时区
      options.timeZone = data.timezone || options.timeZone
      return options
    },
    writable: true,
    configurable: true
  })
}
