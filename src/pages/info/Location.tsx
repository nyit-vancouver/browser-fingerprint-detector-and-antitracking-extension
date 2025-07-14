import { MapPinIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useState } from 'react'

import InfoSection from '@/components/InfoSection'
import { getLocationInfos } from '@/utils/getLocationInfos'

interface LocationInfo {
  longitude: string
  latitude: string
  timezone: string
  timeZoneBasedOnIP: string
  timeFromJavascript: string
  timeFromIP: string
  ip: string
  webRTCIP: string
  webRTCStunIP: string
  isp: string
  geocode: string
  region: string
  city: string
}

function Location() {
  const [location, setLocation] = useState<LocationInfo>({
    longitude: '0',
    latitude: '0',
    timezone: '',
    timeZoneBasedOnIP: '',
    timeFromJavascript: '',
    timeFromIP: '',
    ip: '',
    webRTCIP: '',
    webRTCStunIP: '',
    isp: '',
    geocode: '',
    region: '',
    city: ''
  })

  const fetchData = useCallback(async () => {
    const locationInfo = await getLocationInfos()
    setLocation(locationInfo)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <InfoSection
      title="Location"
      data={{
        longitude: location.longitude,
        latitude: location.latitude,
        'Time Zone': location.timezone,
        'Time Zone Based on IP': location.timeZoneBasedOnIP,
        'Time From Javascript': location.timeFromJavascript,
        'Time From IP': location.timeFromIP,
        'IP (from API)': location.ip,
        'WebRTC IP': location.webRTCIP,
        'WebRTC STUN IP': location.webRTCStunIP,
        isp: location.isp,
        geocode: location.geocode,
        region: location.region,
        city: location.city
      }}
      icon={MapPinIcon}
    />
  )
}

export default Location
