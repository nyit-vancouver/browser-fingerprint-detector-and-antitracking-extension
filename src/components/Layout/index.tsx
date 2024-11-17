import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { ConfigProvider, Menu, Layout as _Layout } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React, { useState } from 'react'

import Dashboard from '@/pages/Dashboard'
import Info from '@/pages/Info'

const { Sider, Content } = _Layout

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset'
}

const Layout = () => {
  const [header, setHeader] = useState('info')

  const menuItems = [
    {
      key: 'info',
      label: 'Fingerprint Information',
      onClick: () => setHeader('info')
    },
    {
      key: 'dashboard',
      label: 'Tracking Dashboard',
      onClick: () => setHeader('dashboard')
    }
  ]
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#fff'
          }
        }
      }}
    >
      <_Layout>
        <Sider theme="light" width="15%" style={siderStyle}>
          <Header className="flex items-center px-0">
            <div className="flex-1 flex justify-center items-center py-4">
              <ShieldCheckIcon className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="font-extrabold text-xl text-black mb-0">
                Anti-Tracking
              </h1>
            </div>
          </Header>
          <Content>
            <Menu
              defaultSelectedKeys={['info']}
              mode="inline"
              items={menuItems}
            />
          </Content>
        </Sider>
        <_Layout>
          <Content>
            {header === 'info' && <Info />}
            {header === 'dashboard' && <Dashboard />}
          </Content>
        </_Layout>
      </_Layout>
    </ConfigProvider>
  )
}
export default Layout
