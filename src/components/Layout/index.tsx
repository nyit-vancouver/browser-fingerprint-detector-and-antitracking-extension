import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Menu, Layout as _Layout, ConfigProvider } from 'antd'

const { Sider, Header } = _Layout

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
              <Link to="/details/info" onClick={() => setHeader('Information')}>
                Information
              </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="config">
              <Link
                to="/details/config"
                onClick={() => setHeader('Configuration')}
              >
                Configuration
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <_Layout>
          <Header>{header}</Header>
          <Outlet />
        </_Layout>
      </_Layout>
    </ConfigProvider>
  )
}
export default Layout
