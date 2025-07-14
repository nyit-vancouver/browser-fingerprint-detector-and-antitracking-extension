import { logCollector } from '@/utils/sendLogs'

export function rewriteTimezone(data: Record<string, any>) {
  // Store the original resolvedOptions method to call it later
  const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions
  Object.defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
    value: function () {
      logCollector.sendLog('timezone')
      // Call the original resolvedOptions method
      const options = originalResolvedOptions.call(this)
      // Modify the returned time zone
      options.timeZone = data.timezone || options.timeZone
      return options
    },
    writable: true,
    configurable: true,
  })
}
