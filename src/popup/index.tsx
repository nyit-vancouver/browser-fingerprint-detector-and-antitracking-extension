import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import PopupList from '@/components/PopupList'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <PopupList />
    </React.StrictMode>
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
