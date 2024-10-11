import React, { useEffect, useState } from 'react'
import { getDeviceInfos } from '@/utils/getDeviceInfos'
import { ComputerDesktopIcon } from '@heroicons/react/24/outline'
import InfoSection from '@/components/InfoSection'

function Device() {
  const [info, setInfo] = useState<Record<string, string>>({
    type: '-',
    vendor: '-',
    model: '-'
  })

  const fetchData = async () => {
    const info = await getDeviceInfos()
    setInfo(info)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <InfoSection title="Device" data={{ ...info }} icon={ComputerDesktopIcon} />
  )
}

export default Device
