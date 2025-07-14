import { GlobeAltIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useState } from 'react'

import InfoSection from '@/components/InfoSection'
import { getBroswerInfos } from '@/utils/getBrowserInfos'

type UaType = Record<string, any>

function Browser() {
  const [info, setInfo] = useState<UaType>({
    name: '-',
    version: '-',
    header: '-',
    javascript: '-'
  })

  const fetchData = useCallback(async () => {
    const info = await getBroswerInfos()
    setInfo(info)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
