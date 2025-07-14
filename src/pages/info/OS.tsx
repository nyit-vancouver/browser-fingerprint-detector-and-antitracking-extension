import { ServerIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useState } from 'react'

import InfoSection from '@/components/InfoSection'
import { getOSInfos } from '@/utils/getOSInfos'

function OS() {
  const [info, setInfo] = useState<Record<string, any>>({
    name: '-',
    version: '-',
    details: '-'
  })

  const fetchData = useCallback(async () => {
    const info = await getOSInfos()
    setInfo(info)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <InfoSection
      title="Operating System"
      data={{ ...info }}
      icon={ServerIcon}
    />
  )
}

export default OS
