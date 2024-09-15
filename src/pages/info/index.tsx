import React, { useEffect, useState } from 'react'
import {
  getBroswerInfos,
  getLocationInfos,
  getHardwareInfos,
  getGeneralInfos
} from '@/utils/getInfos'

type UaType = Record<string, any>

function Info() {
  const [ua, setUa] = useState<UaType>({
    browser: { name: '-', version: '-' },
    device: { type: '-', vendor: '-' },
    engine: { name: '-', version: '-' },
    os: { name: '-', version: '-' },
    cpu: { architecture: '-' },
    plugins: []
  })
  const [location, setLocation] = useState({
    longtitute: 0,
    latitude: 0,
    timezone: '',
    localTime: '',
    ip: '',
    isp: '',
    geocode: '',
    region: '',
    city: ''
  })
  const [hardware, setHardware] = useState({
    canvas: '',
    webGL: '',
    audio: '',
    video: '',
    screenSize: '',
    resolution: '',
    colorDepth: ''
  })
  const [general, setGeneral] = useState({
    language: '',
    fonts: '',
    cpu: '',
    cookie: '',
    header: {
      DNT: '',
      referrer: '',
      acceptLanguage: ''
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      const ua = await getBroswerInfos()
      setUa(ua)
      const location = await getLocationInfos()
      setLocation(location)
      const hardware = await getHardwareInfos()
      setHardware(hardware)
      const general = await getGeneralInfos()
      setGeneral(general)
    }
    fetchData()
  }, [])
  // TODO: 优化页面展示
  return (
    <div>
      <h1 className="mt-4">Info:</h1>
      <h2 className="mt-4">Browser:</h2>
      <p>{ua.browser.name}</p>
      <p>{ua.browser.version}</p>
      <p>{ua.device.type}</p>
      <p>{ua.device.vendor}</p>
      <p>{ua.engine.name}</p>
      <p>{ua.engine.version}</p>
      <p>{ua.os.name}</p>
      <p>{ua.os.version}</p>
      <p>{ua.cpu.architecture}</p>
      <h2 className="mt-4">Plugins:</h2>
      <ul>
        {ua.plugins?.map((item: Plugin) => (
          <li key={item.name}>
            {item.name}: {item.description}
          </li>
        ))}
      </ul>
      <h2 className="mt-4">Location:</h2>
      <p>{location.longtitute}</p>
      <p>{location.latitude}</p>
      <p>{location.timezone}</p>
      <p>{location.localTime}</p>
      <p>{location.ip}</p>
      <p>{location.isp}</p>
      <p>{location.geocode}</p>
      <p>{location.region}</p>
      <p>{location.city}</p>
      <h2 className="mt-4">Hardware:</h2>
      <p>{hardware.canvas}</p>
      <p>{hardware.webGL}</p>
      <p>{hardware.audio}</p>
      <p>{hardware.video}</p>
      <p>{hardware.screenSize}</p>
      <p>{hardware.resolution}</p>
      <p>{hardware.colorDepth}</p>
      <h2 className="mt-4">General:</h2>
      <p>{general.language}</p>
      <p>{general.fonts}</p>
      <p>{general.cpu}</p>
      <p>{general.cookie}</p>
      <p>{general.header.DNT}</p>
      <p>{general.header.referrer}</p>
      <p>{general.header.acceptLanguage}</p>
    </div>
  )
}

export default Info
