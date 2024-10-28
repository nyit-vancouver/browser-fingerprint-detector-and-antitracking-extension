import { initAPIs } from '@/utils/initAPIs'

let ruleId = 2

const getInitialRule = () => ({
  id: ruleId++,
  priority: 2,
  action: {
    type: chrome.declarativeNetRequest?.RuleActionType?.MODIFY_HEADERS, // 参考：https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RuleActionType
    requestHeaders: []
    // [
    //   {
    //     header: "myheader",
    //     operation: chrome.declarativeNetRequest?.HeaderOperation?.SET, //还可以是 append remove 等
    //     value: "123456",
    //   },
    // ],
  },
  condition: {
    urlFilter: 'www.baidu.com', // TODO
    resourceTypes: [
      chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
      chrome.declarativeNetRequest.ResourceType.WEBSOCKET
    ]
  }
})

// rewrite APIs
chrome.runtime.onInstalled.addListener(() => {
  initAPIs()
})

// 监听来自 content.js 的消息
chrome.runtime.onMessage.addListener((message) => {
  console.log('background message', message)
  if (message.type === 'setHeader') {
    const requestHeaders = message.requestHeaders

    chrome.declarativeNetRequest.getDynamicRules(function (res) {
      console.log('getDynamicRules', res)

      const rule = getInitialRule()
      rule.action.requestHeaders = requestHeaders

      chrome.declarativeNetRequest.updateSessionRules(
        {
          addRules: [rule],
          removeRuleIds: []
        },
        (res: any) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError)
          } else {
            console.log('Rule added successfully', res)
          }
        }
      )
    })
  }
  // TODO: delete rule
})

// tab 关闭时清除规则
chrome.tabs.onRemoved.addListener((tabId) => {
  console.log('tab removed', tabId)
  chrome.declarativeNetRequest.getDynamicRules(function (res) {
    console.log('getDynamicRules', res)
    let deleteId = res.find((e) => e.id === tabId)?.id
    if (deleteId === undefined) {
      console.error('deleteId is undefined')
      return
    }
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [deleteId]
    })
  })
})

export {}
