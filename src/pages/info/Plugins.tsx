import React, { useEffect, useState } from 'react'
import { getPluginsInfos } from '@/utils/getPluginsInfos'
import { PuzzlePieceIcon } from '@heroicons/react/24/outline'

interface Plugin {
  name: string
  description: string
  filename?: string
  extensionId?: string
}

function Plugins() {
  const [info, setInfo] = useState<Plugin[]>([])

  const fetchData = async () => {
    const info = await getPluginsInfos()
    setInfo(info)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const PluginItem = ({ plugin }: { plugin: Plugin }) => (
    <li className="text-sm text-gray-700">
      <span className="font-medium">{plugin.name}:</span> {plugin.description}
      {plugin.filename && (
        <span className="text-xs text-gray-500 ml-1">
          (Filename: {plugin.filename})
        </span>
      )}
      {plugin.extensionId && (
        <span className="text-xs text-gray-500 ml-1">
          (Extension ID: {plugin.extensionId})
        </span>
      )}
    </li>
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mt-4 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <PuzzlePieceIcon className="w-5 h-5 mr-2 text-blue-500" />
        Plugins
      </h2>
      <ul className="space-y-1 max-h-40 overflow-y-auto">
        {info?.map((plugin: Plugin, index: number) => (
          <PluginItem key={index} plugin={plugin} />
        ))}
      </ul>
    </div>
  )
}

export default Plugins
