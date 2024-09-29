import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import {
  getBroswerInfos,
  getLocationInfos,
  getHardwareInfos,
  getGeneralInfos
} from '@/utils/getInfos'

const { Content } = Layout

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
    <Content>
      <div className="ml-16">
        <h1 className="mt-4">Info:</h1>
        <h2 className="mt-4">Browser:</h2>
        <p>name: {ua.browser.name}</p>
        <p>version: {ua.browser.version}</p>
        <p>type: {ua.device.type}</p>
        <p>vendor: {ua.device.vendor}</p>
        <p>name: {ua.engine.name}</p>
        <p>version: {ua.engine.version}</p>
        <p>name: {ua.os.name}</p>
        <p>version: {ua.os.version}</p>
        <p>architecture: {ua.cpu.architecture}</p>
        <h2 className="mt-4">Plugins:</h2>
        <ul>
          {ua.plugins?.map((item: Plugin) => (
            <li key={item.name}>
              {item.name}: {item.description}
            </li>
          ))}
        </ul>
        <h2 className="mt-4">Location:</h2>
        <p>longtitute: {location.longtitute}</p>
        <p>latitude: {location.latitude}</p>
        <p>timezone: {location.timezone}</p>
        <p>localTime: {location.localTime}</p>
        <p>ip: {location.ip}</p>
        <p>isp: {location.isp}</p>
        <p>geocode: {location.geocode}</p>
        <p>region: {location.region}</p>
        <p>city: {location.city}</p>
        <h2 className="mt-4">Hardware:</h2>
        <p>canvas: {hardware.canvas}</p>
        <p>webGL: {hardware.webGL}</p>
        <p>audio: {hardware.audio}</p>
        <p>video: {hardware.video}</p>
        <p>screenSize: {hardware.screenSize}</p>
        <p>resolution: {hardware.resolution}</p>
        <p>colorDepth: {hardware.colorDepth}</p>
        <h2 className="mt-4">General:</h2>
        <p>language: {general.language}</p>
        <p>fonts: {general.fonts}</p>
        <p>cpu: {general.cpu}</p>
        <p>cookie: {general.cookie}</p>
        <p>DNT: {general.header.DNT}</p>
        <p>referrer: {general.header.referrer}</p>
        <p>acceptLanguage: {general.header.acceptLanguage}</p>
      </div>
    </Content>
  )
}

export default Info
