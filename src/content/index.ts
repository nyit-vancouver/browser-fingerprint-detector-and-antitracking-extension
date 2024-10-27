console.log('[content] loaded ')
;(function () {
  if (chrome.runtime) {
    const script = document.createElement('script')
    script.src = chrome.runtime.getURL('static/js/inject.js')
    document.documentElement.appendChild(script)
    script.onload = () => script.remove()
  }
})()
export {}
