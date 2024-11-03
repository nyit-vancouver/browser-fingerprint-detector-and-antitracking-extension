export default [
  {
    header: 'ETag',
    operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE
  },
  {
    header: 'If-None-Match',
    operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE
  }
]
