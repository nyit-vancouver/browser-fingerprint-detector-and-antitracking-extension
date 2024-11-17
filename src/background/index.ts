import { debounce } from 'throttle-debounce'

import { deleteRule } from '@/utils/deleteRule'
import { getRule } from '@/utils/getRule'
import sendStorageToContent from '@/utils/sendStorageToContent'
import { storage } from '@/utils/storage'

import { AntiTrackingLog } from './type'

const MAX_STORAGE_CAPACITY = 0.9

// 监听 tab 更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('tab onUpdated', tabId, changeInfo, tab)
  // 不在chrome://页面执行
  if (tab.url?.includes('chrome://')) {
    return
  }
  // 只在页面加载时执行
  if (!changeInfo.status || changeInfo.status !== 'loading') {
    return
  }
  console.warn('executeScript', new Date().getTime())
  // 执行 sendStorageToContent.js
  chrome.scripting.executeScript({
    target: { tabId },
    func: sendStorageToContent,
    args: [tabId],
    injectImmediately: true
  })
})

// 监听存储空间使用情况
chrome.storage.onChanged.addListener(
  debounce(2000, async () => {
    const bytesInUse = await chrome.storage.local.getBytesInUse()
    console.log('Bytes in use:', bytesInUse)
    if (bytesInUse >= chrome.storage.local.QUOTA_BYTES * MAX_STORAGE_CAPACITY) {
      console.warn('Warning: storage space usage is over 90%')
      const trackingLogs: AntiTrackingLog =
        (await chrome.storage.local.get())?.__antiTracking_log || {}
      // const deleteKeys = []
      // for (const [key, value] of Object.entries(storage)) {
      //   console.log('key, value', key, value)
      // 删除过期数据
      // if (
      //   value._timestamp &&
      //   Date.now() - value._timestamp > MAX_STORAGE_DAYS
      // ) {
      //   console.log('delete', key)
      //   deleteKeys.push(key)
      // }
      // if (key === '__antiTracking_log') {
      const sortedTimestamps = Object.values(trackingLogs)
        .map((item) => item._timestamp)
        .sort((a, b) => a - b)
      const mid = Math.floor(sortedTimestamps.length / 2)
      const midTimestamp = sortedTimestamps[mid]

      const res = { ...trackingLogs }

      Object.entries(trackingLogs).forEach(([k, v]) => {
        // 根据_timestamp删除前50%的旧数据
        if (v._timestamp < midTimestamp) {
          console.log('delete', k)
          delete res[k]
        }
      })
      await chrome.storage.local.set({
        ...storage,
        __antiTracking_log: res
      })
      // }
      // if (deleteKeys.length > 0) {
      //   await chrome.storage.local.remove(deleteKeys)
      // }
    }
  })
)

// 监听来自 tabStorage 的消息
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
    const rule = getRule(data, [tabId]) //, preRule)
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
  }
  // else if (type === 'deleteAll') {
  // // delete all session rules
  // const rules = await chrome.declarativeNetRequest.getSessionRules()
  // console.log('setHeader deleteAll', rules)
  // const ids = rules.map((rule) => rule.id)
  // await chrome.declarativeNetRequest.updateSessionRules({
  //   removeRuleIds: ids // remove existing rules
  // })
  // console.log('Rules delete successfully')
  // }
})
// tab 关闭时清除规则
chrome.tabs.onRemoved.addListener((tabId) => {
  console.log('tab removed', tabId)
  // clear local storage
  storage.deleteAll(tabId)
  // clear rules
  chrome.declarativeNetRequest.getSessionRules(function (res) {
    console.log('getSessionRules', res)
    const deleteId = res.find((e) => e.condition.tabIds?.[0] === tabId)?.id
    if (deleteId === undefined) {
      console.error('deleteId is undefined')
      return
    }
    chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [deleteId]
    })
  })
})

// DO NOT DELETE THIS LISTENER
// 监听请求头
chrome.webRequest.onBeforeSendHeaders.addListener(
  function () {
    // console.log('onBeforeSendHeaders', details)
  },
  { urls: ['<all_urls>'] },
  ['requestHeaders']
)

export {}
