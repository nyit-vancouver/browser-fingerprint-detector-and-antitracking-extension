import React, { useEffect, useState } from 'react'
import { getBroswerInfos } from '@/utils/getInfos'

type UaType = Record<string, any>

function Info() {
  const [ua, setUa] = useState<UaType>({
    browser: { name: '-', version: '-' },
    device: { type: '-', vendor: '-' },
    engine: { name: '-', version: '-' },
    os: { name: '-', version: '-' },
    cpu: { architecture: '-' }
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBroswerInfos()
      setUa(res)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="mt-4">Info</h1>
      <p>{ua.browser.name}</p>
      <p>{ua.browser.version}</p>
      <p>{ua.device.type}</p>
      <p>{ua.device.vendor}</p>
      <p>{ua.engine.name}</p>
      <p>{ua.engine.version}</p>
      <p>{ua.os.name}</p>
      <p>{ua.os.version}</p>
      <p>{ua.cpu.architecture}</p>
    </div>
  )
}

export default Info
