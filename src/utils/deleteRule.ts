export function deleteRule(
  data: string[],
  preRule?: chrome.declarativeNetRequest.Rule
) {
  console.log('deleteRule', data, preRule)
  if (!preRule) {
    return
  }
  const preRequestHeaders = preRule.action?.requestHeaders

  const headers: chrome.declarativeNetRequest.ModifyHeaderInfo[] = []
  // 如果preRequestHeaders不存在，则将其push到headers中
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
      requestHeaders: headers
    }
  }
}
