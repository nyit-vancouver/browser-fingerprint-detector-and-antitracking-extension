import React, { useState, ReactElement } from 'react'
import { TabProps } from './Tab'

interface TabsProps {
  children: ReactElement<TabProps>[]
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex border-b border-gray-200">
        {React.Children.map(children, (child, index) => (
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === index
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">{React.Children.toArray(children)[activeTab]}</div>
    </div>
  )
}

export default Tabs
