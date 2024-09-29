import React, { useEffect, useState } from 'react'
import { getHardwareInfos } from '@/utils/getHardwareInfos'
import { CpuChipIcon } from '@heroicons/react/24/outline'
import InfoSection from '@/components/InfoSection'

function Hardware() {
  const [hardware, setHardware] = useState({
    canvasFingerprint: '',
    webGL: '',
    audio: '',
    video: '',
    screenSize: '',
    resolution: '',
    colorDepth: '',
    cpu: { architecture: '-' }
  })

  const fetchData = async () => {
    const hardwareInfo = await getHardwareInfos()
    setHardware(hardwareInfo)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <InfoSection
      title="Hardware"
      data={{ ...hardware, cpu: hardware.cpu.architecture }}
      icon={CpuChipIcon}
    />
  )
}

export default Hardware
