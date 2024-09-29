import React, { useEffect, useState } from 'react'
import { getSoftwareInfos } from '@/utils/getSoftwareInfos'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import InfoSection from '@/components/InfoSection'

interface SoftwareInfo {
  language: string
  fonts: string
  cpu: number
  cookie: boolean
  doNotTrack: string
  referrer: string
  flash: string
  activeX: string
  java: string
  javascript: string
}

function Software() {
  const [info, setInfo] = useState<SoftwareInfo>({
    language: '',
    fonts: '',
    cpu: 0,
    cookie: false,
    doNotTrack: '',
    referrer: '',
    flash: '',
    activeX: '',
    java: '',
    javascript: ''
  })

  const fetchData = async () => {
    const info = await getSoftwareInfos()
    setInfo(info)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <InfoSection
      title="Software"
      data={{
        language: info.language,
        fonts: info.fonts,
        cpu: info.cpu,
        cookie: info.cookie ? 'Enabled' : 'Disabled',
        'Do Not Track': info.doNotTrack,
        'Referrer (Source Page)': info.referrer,
        Flash: info.flash,
        ActiveX: info.activeX,
        Java: info.java,
        JavaScript: info.javascript
      }}
      icon={Cog6ToothIcon}
    />
  )
}

export default Software
