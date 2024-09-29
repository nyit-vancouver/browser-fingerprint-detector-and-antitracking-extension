import React, { useState } from 'react'
import { Menu, Layout as _Layout, ConfigProvider } from 'antd'
import Info from '@/pages/Info'
import Config from '@/pages/Config'

const { Sider, Content } = _Layout

const Layout = () => {
  const [header, setHeader] = useState('Information')
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
        <Sider theme="light" width="15%">
          <Menu defaultSelectedKeys={['info']} mode="inline">
            <Menu.Item key="logo" className="pointer-events-none">
              <h1>Anti-Tracking</h1>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="info">
              <span onClick={() => setHeader('Information')}>Information</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="config">
              <span onClick={() => setHeader('Configuration')}>
                Configuration
              </span>
            </Menu.Item>
          </Menu>
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
