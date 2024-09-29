import React, { useEffect, useState } from 'react'
import { getHardwareInfos } from '@/utils/getHardwareInfos/index'
import { CpuChipIcon } from '@heroicons/react/24/outline'
import InfoSection from '@/components/InfoSection'

function Hardware() {
  const [hardware, setHardware] = useState({
    canvas: '',
    webGL: '',
    audio: '',
    screenSize: '',
    resolution: '',
    colorDepth: '',
    cpu: ''
  })

  const fetchData = async () => {
    const hardwareInfo = await getHardwareInfos()
    setHardware(hardwareInfo)
  }

  useEffect(() => {
    // DONT DELETE THIS: or getContext('2d') will return null
    console.log(
      (document.getElementById('canvas2D') as HTMLCanvasElement)?.getContext(
        '2d'
      )
    )
    console.log('WebGLRenderingContext', window.WebGLRenderingContext)
    fetchData()
  }, [])

  return (
    <>
      {/* TODO: audio interaction */}
      {/* <span onClick={fetchData}>click me</span> */}
      <InfoSection title="Hardware" data={hardware} icon={CpuChipIcon} />
      <canvas className="hidden" width={240} height={60} id="canvas2D"></canvas>
      <canvas
        className="hidden"
        width={240}
        height={60}
        id="canvasWebGL"
      ></canvas>
    </>
  )
}

export default Hardware
