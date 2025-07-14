import { debounce } from 'throttle-debounce'

import { deleteRule } from '@/utils/deleteRule'
import { getRule } from '@/utils/getRule'
import sendStorageToContent from '@/utils/sendStorageToContent'
import { storage } from '@/utils/storage'

import { AntiTrackingLog } from './type'

const MAX_STORAGE_CAPACITY = 0.9

// Listen for tab update events
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log('tab onUpdated', tabId, changeInfo, tab)
  // Do not execute on chrome:// pages due to lack of permissions
  if (tab.url?.includes('chrome://')) {
    return
  }
  // Execute only when the page loads
  if (!changeInfo.status || changeInfo.status !== 'loading') {
    return
  }
  console.warn('executeScript', new Date().getTime())
  // Set storage access permissions for use in the sendStorageToContent function
  await chrome.storage.session.setAccessLevel({
    accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS',
  })
  // execute sendStorageToContent.js
  chrome.scripting.executeScript({
    target: { tabId },
    func: sendStorageToContent,
    args: [tabId],
    injectImmediately: true,
  })
})

// Monitor local storage usage
chrome.storage.local.onChanged.addListener(
  debounce(2000, async () => {
    const bytesInUse = await chrome.storage.local.getBytesInUse()
    console.log('Bytes in use:', bytesInUse)
    if (bytesInUse >= chrome.storage.local.QUOTA_BYTES * MAX_STORAGE_CAPACITY) {
      console.warn('Warning: storage space usage is over 90%')
      const trackingLogs: AntiTrackingLog =
        (await chrome.storage.local.get())?.__antiTracking_log || {}
      const sortedTimestamps = Object.values(trackingLogs)
        .map((item) => item._timestamp)
        .sort((a, b) => a - b)
      const thresholdIndex = Math.floor(sortedTimestamps.length / 5)
      const thresholdTimestamp = sortedTimestamps[thresholdIndex]

      const res = { ...trackingLogs }

      Object.entries(trackingLogs).forEach(([k, v]) => {
        // Delete the oldest 20% of data based on _timestamp
        if (v._timestamp <= thresholdTimestamp) {
          console.log('delete', k)
          delete res[k]
        }
      })
      await chrome.storage.local.set({
        ...storage,
        __antiTracking_log: res,
      })
    }
  }),
)

// Listen for messages from tabStorage
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
    const rule = getRule(data, [tabId])
    // delete the previous rule and add a new rule
    await chrome.declarativeNetRequest.updateSessionRules({
      addRules: [rule],
      removeRuleIds: preRuleId ? [preRuleId] : undefined,
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
          data.includes(item.header.toLowerCase()),
        ),
    )
    const preRuleId = preRule?.id
    if (!preRuleId) {
      console.error('preRuleId is undefined')
      return
    }
    const rule = deleteRule(data, preRule)
    if (!rule) {
      console.error('rule is undefined')
      return
    }
    await chrome.declarativeNetRequest.updateSessionRules({
      addRules: rule.action.requestHeaders.length === 0 ? undefined : [rule],
      removeRuleIds: [preRuleId],
    })
    console.log('Rule delete successfully')
  }
})
// Clear rules when the tab is closed
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
      removeRuleIds: [deleteId],
    })
  })
})

// DO NOT DELETE THIS LISTENER
// Listen to request headers
chrome.webRequest.onBeforeSendHeaders.addListener(
  function () {},
  { urls: ['<all_urls>'] },
  ['requestHeaders'],
)

export {}
