import React, { useEffect, useState } from 'react'
import { getOSInfos } from '@/utils/getOSInfos'
import { ServerIcon } from '@heroicons/react/24/outline'
import InfoSection from '@/components/InfoSection'

function OS() {
  const [info, setInfo] = useState<Record<string, any>>({
    name: '-',
    version: '-',
    details: '-'
  })

  const fetchData = async () => {
    const info = await getOSInfos()
    setInfo(info)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <InfoSection
      title="Operating System"
      data={{ ...info }}
      icon={ServerIcon}
    />
  )
}

export default OS
