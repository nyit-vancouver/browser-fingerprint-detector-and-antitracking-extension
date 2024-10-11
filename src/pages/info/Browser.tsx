import React, { useEffect, useState } from 'react'
import { getBroswerInfos } from '@/utils/getBrowserInfos'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import InfoSection from '@/components/InfoSection'

type UaType = Record<string, any>

function Browser() {
  const [info, setInfo] = useState<UaType>({
    name: '-',
    version: '-',
    header: '-',
    javascript: '-'
  })

  const fetchData = async () => {
    const info = await getBroswerInfos()
    setInfo(info)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <InfoSection
      title="Browser"
      data={{
        name: info.name,
        version: info.version,
        'Header UA': info.header,
        'JavaScript UA': info.javascript
      }}
      icon={GlobeAltIcon}
    />
  )
}

export default Browser
