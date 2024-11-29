import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { ConfigProvider, Layout as LayoutComp, Menu } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router'

const { Sider, Content } = LayoutComp

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
}

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [header, setHeader] = useState('')

  const location = useLocation()

  const menuItems = useMemo(
    () => [
      {
        key: 'info',
        label: (
          <NavLink to="/info" end>
            Fingerprint Information
          </NavLink>
        ),
      },
      {
        key: 'dashboard',
        label: (
          <NavLink to="/dashboard" end>
            Tracking Dashboard
          </NavLink>
        ),
      },
    ],
    [],
  )

  useEffect(() => {
    setHeader(location.pathname.slice(1))
  }, [location])

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#fff',
          },
        },
      }}
    >
      <LayoutComp>
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
            <Menu selectedKeys={[header]} mode="inline" items={menuItems} />
          </Content>
        </Sider>
        <LayoutComp>
          <Content>{children}</Content>
        </LayoutComp>
      </LayoutComp>
    </ConfigProvider>
  )
}
export default Layout
