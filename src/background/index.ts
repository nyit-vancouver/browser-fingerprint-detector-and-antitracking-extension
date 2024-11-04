import { initAPIs } from '@/utils/initAPIs'
import { storage } from '@/utils/storage'
import { getRule } from '@/utils/getRule'
import { deleteRule } from '@/utils/deleteRule'

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('tab onUpdated', tabId, changeInfo, tab)
  if (tab.url?.includes('chrome://')) {
    return
  }
  // 例如：只在打开特定网址（比如新标签页或特定站点）时注入脚本
  if (changeInfo.status !== 'loading') {
    return
  }
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['static/js/content.js']
  })
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
  const { type, data, tabId } = message

  if (tabId === undefined) {
    console.error('tab id is undefined')
    return
  }

  if (type === 'setHeader') {
    // set request header
    const rules = await chrome.declarativeNetRequest.getSessionRules()
    console.log('setHeader getSessionRules', rules)
    const preRule = rules.find((rule) => rule.condition.tabIds?.includes(tabId))
    const preRuleId = preRule?.id
    const rule = getRule(data, [tabId], preRule)
    await chrome.declarativeNetRequest.updateSessionRules({
      // rule是包含了之前规则的新规则
      addRules: [rule],
      // 如果preRuleId存在，则删除之前的规则
      removeRuleIds: preRuleId ? [preRuleId] : undefined
    })
    console.log('Rule added successfully')
  } else if (type === 'deleteHeader') {
    // delete request header
    const preRules = await chrome.declarativeNetRequest.getSessionRules()
    console.log('setHeader deleteHeader', preRules)
    const preRule = preRules.find(
      (rule) =>
        rule.condition.tabIds?.includes(tabId) &&
        rule.action?.requestHeaders?.some((item) =>
          data.includes(item.header.toLowerCase())
        )
    )
    const preRuleId = preRule?.id
    // 如果找不到对应的规则，则直接返回
    if (!preRuleId) {
      console.error('preRuleId is undefined')
      return
    }
    // 删除了指定的header后的rules
    const rule = deleteRule(data, preRule)
    if (!rule) {
      console.error('rule is undefined')
      return
    }
    await chrome.declarativeNetRequest.updateSessionRules({
      addRules: rule.action.requestHeaders.length === 0 ? undefined : [rule],
      removeRuleIds: [preRuleId]
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
// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(function (o) {
//   console.log('rule matched:', o)
// })
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
  function () {
    // console.log('onBeforeSendHeaders', details)
  },
  { urls: ['<all_urls>'] },
  ['requestHeaders']
)

export {}
