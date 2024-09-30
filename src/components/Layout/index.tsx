import React, { useState } from 'react'
import { Menu, Layout as _Layout, ConfigProvider } from 'antd'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'

import Info from '@/pages/Info'
import Config from '@/pages/Config'
import { Header } from 'antd/es/layout/layout'

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
  const [header, setHeader] = useState('Information')

  const menuItems = [
    {
      key: 'info',
      label: 'Information',
      onClick: () => setHeader('Information')
    },
    {
      key: 'config',
      label: 'Configuration',
      onClick: () => setHeader('Configuration')
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
              <h1 className="font-extrabold text-xl">Anti-Tracking</h1>
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
            {/* TODO: 优化 */}
            {header === 'Information' ? <Info /> : <Config />}
          </Content>
        </_Layout>
      </_Layout>
    </ConfigProvider>
  )
}
export default Layout
