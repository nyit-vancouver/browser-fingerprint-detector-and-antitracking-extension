import React from 'react'
import { List, Switch } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'

function App() {
  // const handlerDetailsClick = () => {
  //   window.location.href = '/info'
  //   if (chrome.runtime.openOptionsPage) {
  //     chrome.runtime.openOptionsPage()
  //   } else {
  //     window.open(chrome.runtime.getURL('options.html'))
  //   }
  // }

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }

  return (
    <List size="large">
      <List.Item>
        <div className="popup-list-item">
          <span className="icon">👣</span>
          <h1 className="font-bold flex items-center">Anti - Tracking</h1>
        </div>
      </List.Item>
      <List.Item className="bg-amber-500">
        <div className="popup-list-item">
          <span className="icon">🛡️</span>
          <div className="flex justify-between items-center">
            <span>Risk of being tracking : 90%</span>
            <Link className="text-white" to={'/details/info'}>
              Details →
            </Link>
          </div>
        </div>
      </List.Item>
      <List.Item>
        <div className="popup-list-item">
          <span className="icon">👤</span>
          <div className="flex justify-between items-center">
            <span>Hide Digital Fingerprint</span>
            <Switch onChange={onChange} />
          </div>
        </div>
      </List.Item>
      <List.Item>
        <div className="popup-list-item">
          <span className="icon">🔧</span>
          <div className="flex justify-between items-center">
            <span>Custom Configuration</span>
            <Link className="text-blue-400" to={'/details/config'}>
              Configuration →
            </Link>
          </div>
        </div>
      </List.Item>
    </List>
  )
}

export default App
