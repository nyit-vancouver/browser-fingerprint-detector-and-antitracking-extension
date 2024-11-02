import { initAPIs } from '@/utils/initAPIs'
import { storage } from '@/utils/storage'

const getInitialRule = () => ({
  id: Math.floor(Math.random() * Math.pow(10, 9)),
  priority: 1,
  action: {
    type: chrome.declarativeNetRequest?.RuleActionType?.MODIFY_HEADERS, // 参考：https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RuleActionType
    requestHeaders: [] as chrome.declarativeNetRequest.ModifyHeaderInfo[]
  },
  condition: {
    tabIds: [] as number[],
    urlFilter: '*://*/*',
    resourceTypes: [
      chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
      chrome.declarativeNetRequest.ResourceType.WEBSOCKET,
      chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
      chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
      chrome.declarativeNetRequest.ResourceType.IMAGE,
      chrome.declarativeNetRequest.ResourceType.STYLESHEET,
      chrome.declarativeNetRequest.ResourceType.SCRIPT,
      chrome.declarativeNetRequest.ResourceType.FONT,
      chrome.declarativeNetRequest.ResourceType.OBJECT,
      chrome.declarativeNetRequest.ResourceType.MEDIA,
      chrome.declarativeNetRequest.ResourceType.PING,
      chrome.declarativeNetRequest.ResourceType.CSP_REPORT,
      chrome.declarativeNetRequest.ResourceType.OTHER,
      'webbundle',
      'webtransport'
    ] as chrome.declarativeNetRequest.ResourceType[]
  }
})

// rewrite APIs
chrome.runtime.onInstalled.addListener(async () => {
  console.log('onInstalled')
  // TODO: check init:
  // const rules = await chrome.declarativeNetRequest.getSessionRules()
  // console.log('setHeader deleteAll', rules)
  // const ids = rules.map((rule) =>
  //   rule.id
  // )
  // await chrome.declarativeNetRequest.updateSessionRules({
  //   removeRuleIds: ids, // remove existing rules
  // });
  // console.log('Rules delete successfully')
  initAPIs()
})

// 监听来自 content.js 的消息
chrome.runtime.onMessage.addListener(async (message, sender) => {
  console.log('background message', message, sender)
  const { type, requestHeader, tabId } = message
  if (tabId === undefined) {
    console.error('tab id is undefined')
    return
  }
  if (type === 'setHeader') {
    // set request header
    const rules = await chrome.declarativeNetRequest.getSessionRules()
    console.log('setHeader getSessionRules', rules)
    const rule = getInitialRule()
    rule.action.requestHeaders.push(requestHeader)
    rule.condition.tabIds = [tabId]
    await chrome.declarativeNetRequest.updateSessionRules({
      addRules: [rule]
    })
    console.log('Rule added successfully')
  } else if (type === 'deleteHeader') {
    // delete request header
    const rules = await chrome.declarativeNetRequest.getSessionRules()
    console.log('setHeader deleteHeader', rules)
    const id = rules.find(
      (rule) =>
        rule.condition.tabIds?.includes(tabId) &&
        rule.action?.requestHeaders?.some(
          (item) => item.header === requestHeader.header
        )
    )?.id
    if (!id) {
      console.error('id is undefined')
      return
    }
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [id] // remove existing rules
    })
    console.log('Rule delete successfully')
  } else if (type === 'check') {
    // check session rules
    chrome.declarativeNetRequest.getSessionRules(function (rules) {
      console.log('check getSessionRules', rules)
    })
  } else if (type === 'deleteAll') {
    // delete all session rules
    const rules = await chrome.declarativeNetRequest.getSessionRules()
    console.log('setHeader deleteAll', rules)
    const ids = rules.map((rule) => rule.id)
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: ids // remove existing rules
    })
    console.log('Rules delete successfully')
  }
})
// 监听规则匹配
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(function (o) {
  console.log('rule matched:', o)
})
// tab 关闭时清除规则
chrome.tabs.onRemoved.addListener((tabId) => {
  console.log('tab removed', tabId)
  // clear local storage
  // chrome.tabs.sendMessage(tabId, { msgType: "deleteStorage" });
  storage.deleteAll(tabId)
  // clear rules
  chrome.declarativeNetRequest.getSessionRules(function (res) {
    console.log('getSessionRules', res)
    let deleteId = res.find((e) => e.condition.tabIds?.[0] === tabId)?.id
    if (deleteId === undefined) {
      console.error('deleteId is undefined')
      return
    }
    chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [deleteId]
    })
  })
})

// ??为什么加了这个监听，所有的请求都能被拦截了
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    console.log('onBeforeSendHeaders', details)
  },
  { urls: ['<all_urls>'] },
  ['requestHeaders']
)

export {}
