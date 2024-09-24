import React from 'react'
import ReactDOM from 'react-dom/client'
import Info from './info'
import Tabs from './Tabs'
import Tab from './Tab'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Tabs>
      <Tab label="Information">
        <Info />
      </Tab>
      <Tab label="Configuration">
        <p>内容2</p>
      </Tab>
    </Tabs>
  </React.StrictMode>
)
