export function deleteRule(
  data: string[],
  preRule?: chrome.declarativeNetRequest.Rule,
) {
  console.log('deleteRule', data, preRule)
  if (!preRule) {
    return
  }
  const preRequestHeaders = preRule.action?.requestHeaders

  const headers: chrome.declarativeNetRequest.ModifyHeaderInfo[] = []
  // if the header is not in the data, add it to the headers
  preRequestHeaders?.forEach((item) => {
    if (!data.includes(item.header.toLowerCase())) {
      headers.push({ ...item })
    }
  })

  console.log('deleteRule headers', headers)

  return {
    ...preRule,
    action: {
      ...preRule.action,
      requestHeaders: headers,
    },
  }
}
