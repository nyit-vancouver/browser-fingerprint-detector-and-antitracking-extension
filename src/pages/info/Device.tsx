import { ComputerDesktopIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useState } from 'react'

import InfoSection from '@/components/InfoSection'
import { getDeviceInfos } from '@/utils/getDeviceInfos'

function Device() {
  const [info, setInfo] = useState<Record<string, string>>({
    type: '-',
    vendor: '-',
    model: '-'
  })

  const fetchData = useCallback(async () => {
    const info = await getDeviceInfos()
    setInfo(info)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <InfoSection title="Device" data={{ ...info }} icon={ComputerDesktopIcon} />
  )
}

export default Device
