import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Info from '@/pages/Info'
import Config from '@/pages/Config'
import PopupList from '@/components/PopupList'
import Layout from '@/components/Layout'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PopupList />
  },
  {
    path: '/details',
    element: <Layout />,
    children: [
      {
        path: 'info',
        element: <Info />
      },
      {
        path: 'config',
        element: <Config />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
