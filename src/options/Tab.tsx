import React, { ReactNode } from 'react'

export interface TabProps {
  label: string
  children: ReactNode
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab">{children}</div>
}

export default Tab
