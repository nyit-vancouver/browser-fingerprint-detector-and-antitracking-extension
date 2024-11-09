class LogQueue {
  private logs: string[] = []
  private maxLogs = 30
  private timer: number = 0

  sendLog(paramName: string) {
    console.log('sendLog', paramName)
    this.logs.push(paramName)
    if (this.logs.length >= this.maxLogs) {
      this.sendLogs()
      this.logs = []
    }
    clearTimeout(this.timer)
    // 计时，如果 1s 内没有新的 log，则发送
    this.timer = window.setTimeout(() => {
      if (this.logs.length > 0) {
        this.sendLogs()
        this.logs = []
      }
    }, 1000)
  }

  sendLogs() {
    console.log('sendLogs', this.logs)
    const event = new CustomEvent('writeLogs', {
      detail: {
        paramNames: this.logs
      }
    })
    window.dispatchEvent(event)
  }
}

export const logQueue = new LogQueue()
