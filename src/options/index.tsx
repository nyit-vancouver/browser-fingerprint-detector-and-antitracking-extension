import React from 'react'
import ReactDOM from 'react-dom/client'
import Info from './info'
import Tabs from './Tabs'
import Tab from './Tab'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div className="w-full min-h-screen bg-gray-50">
      <Tabs>
        <Tab label="Information">
          <Info />
        </Tab>
        <Tab label="Configuration">
          <p>内容2</p>
        </Tab>
      </Tabs>
    </div>
  </React.StrictMode>
)
