import React, { useEffect, useState } from 'react'
import {
  getBroswerInfos,
  getLocationInfos,
  getHardwareInfos,
  getGeneralInfos
} from '@/utils/getInfos'
import {
  GlobeAltIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  MapPinIcon,
  ServerIcon,
  Cog6ToothIcon,
  PuzzlePieceIcon,
  InformationCircleIcon // 新增
} from '@heroicons/react/24/outline'

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

type UaType = Record<string, any>

interface GeneralInfo {
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

interface Plugin {
  name: string
  description: string
  filename?: string
  extensionId?: string
}

function Info() {
  const [ua, setUa] = useState<UaType>({
    browser: { name: '-', version: '-', header: '-', javascript: '-' },
    device: { type: '-', vendor: '-', model: '-' },
    engine: { name: '-', version: '-' },
    os: { name: '-', version: '-' },
    plugins: []
  })
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
  const [general, setGeneral] = useState<GeneralInfo>({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uaInfo = await getBroswerInfos()
        setUa(uaInfo)
        const locationInfo = await getLocationInfos()
        setLocation(locationInfo)
        const hardwareInfo = await getHardwareInfos()
        setHardware(hardwareInfo)
        const generalInfo = await getGeneralInfos()
        setGeneral(generalInfo)
      } catch (error) {
        console.error('Error fetching information:', error)
      }
    }
    fetchData()
  }, [])

  const InfoSection = ({
    title,
    data,
    icon: Icon
  }: {
    title: string
    data: Record<string, any>
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }) => (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <Icon className="w-5 h-5 mr-2 text-blue-500" />
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 flex items-center">
              {key}
              {key.includes('WebRTC') && (
                <span className="relative group ml-1">
                  <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
                  <span className="absolute bottom-full left-0 w-64 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    When WebRTC IP leaks occur, this information will show your
                    real IP address.
                  </span>
                </span>
              )}
            </span>
            <span className="text-sm text-gray-800 break-words">
              {key === 'canvasFingerprint'
                ? (value as string).substring(0, 16) + '...'
                : typeof value === 'object'
                  ? JSON.stringify(value)
                  : value?.toString() || 'N/A'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  const PluginItem = ({ plugin }: { plugin: Plugin }) => (
    <li className="text-sm text-gray-700">
      <span className="font-medium">{plugin.name}:</span> {plugin.description}
      {plugin.filename && (
        <span className="text-xs text-gray-500 ml-1">
          (Filename: {plugin.filename})
        </span>
      )}
      {plugin.extensionId && (
        <span className="text-xs text-gray-500 ml-1">
          (Extension ID: {plugin.extensionId})
        </span>
      )}
    </li>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          System Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto">
          <InfoSection
            title="Browser"
            data={{
              name: ua.browser.name,
              version: ua.browser.version,
              'Header UA': ua.browser.header,
              'JavaScript UA': ua.browser.javascript
            }}
            icon={GlobeAltIcon}
          />
          <InfoSection
            title="Device"
            data={ua.device}
            icon={ComputerDesktopIcon}
          />
          <InfoSection
            title="Operating System"
            data={{ ...ua.os, details: ua.os.details }}
            icon={ServerIcon}
          />
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
          <InfoSection
            title="Hardware"
            data={{ ...hardware, cpu: hardware.cpu.architecture }}
            icon={CpuChipIcon}
          />
          <InfoSection
            title="Software"
            data={{
              language: general.language,
              fonts: general.fonts,
              cpu: general.cpu,
              cookie: general.cookie ? 'Enabled' : 'Disabled',
              'Do Not Track': general.doNotTrack,
              'Referrer (Source Page)': general.referrer,
              Flash: general.flash,
              ActiveX: general.activeX,
              Java: general.java,
              JavaScript: general.javascript
            }}
            icon={Cog6ToothIcon}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 mt-4 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <PuzzlePieceIcon className="w-5 h-5 mr-2 text-blue-500" />
            Plugins
          </h2>
          <ul className="space-y-1 max-h-40 overflow-y-auto">
            {ua.plugins?.map((plugin: Plugin, index: number) => (
              <PluginItem key={index} plugin={plugin} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Info
