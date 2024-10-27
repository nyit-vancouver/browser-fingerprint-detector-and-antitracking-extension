Object.defineProperty(window.navigator, 'platform', {
  get: function () {
    return 'Win32'
  }
})
console.log(window.navigator.platform) // Win32

export {}
