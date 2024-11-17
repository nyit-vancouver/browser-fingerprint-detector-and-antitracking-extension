import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useState } from 'react'

import InfoSection from '@/components/InfoSection'
import { getSoftwareInfos } from '@/utils/getSoftwareInfos'

interface SoftwareInfo {
  language: string
  fonts: string
  cookie: boolean
  doNotTrack: string
  referrer: string
  flash: string
  activeX: string
  // java: string
  javascript: string
}

function Software() {
  const [info, setInfo] = useState<SoftwareInfo>({
    language: '',
    fonts: '',
    cookie: false,
    doNotTrack: '',
    referrer: '',
    flash: '',
    activeX: '',
    // java: '',
    javascript: ''
  })

  const fetchData = useCallback(async () => {
    console.warn('info')
    const info = await getSoftwareInfos()
    console.warn('info', info)
    setInfo(info)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <InfoSection
      title="Software"
      data={{
        language: info.language,
        fonts: info.fonts,
        cookie: info.cookie ? 'Enabled' : 'Disabled',
        'Do Not Track': info.doNotTrack,
        'Referrer (Source Page)': info.referrer,
        Flash: info.flash,
        ActiveX: info.activeX,
        // Java: info.java,
        JavaScript: info.javascript
      }}
      icon={Cog6ToothIcon}
    />
  )
}

export default Software
