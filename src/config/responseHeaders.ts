export const ifNoneMatch = {
  header: 'If-None-Match',
  operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE
}

export const etag = {
  header: 'ETag',
  operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE
}

export const referer = {
  header: 'Referer',
  operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE
}

export const dnt = {
  header: 'DNT',
  operation: chrome.declarativeNetRequest.HeaderOperation.SET,
  value: '1'
}

export const xForwardedFor = {
  header: 'X-Forwarded-For',
  operation: chrome.declarativeNetRequest.HeaderOperation.SET,
  value: '111.8.203.174'
}

export const acceptLanguage = {
  header: 'Accept-Language',
  operation: chrome.declarativeNetRequest.HeaderOperation.SET,
  value: 'en-US,en;q=0.9'
}

export const userAgent = {
  header: 'User-Agent',
  operation: chrome.declarativeNetRequest.HeaderOperation.SET,
  value:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}
