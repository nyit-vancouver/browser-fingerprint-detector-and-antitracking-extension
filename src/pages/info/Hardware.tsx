import React, { useEffect, useState } from 'react'
import { getHardwareInfos } from '@/utils/getHardwareInfos/index'
import { CpuChipIcon } from '@heroicons/react/24/outline'
import { Card, List } from 'antd'
import { useObject2List } from '@/hooks/useObject2List'

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

  const hardwareList = useObject2List(hardware)

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
      <Card
        className="py-0"
        title={
          <div className="flex items-center">
            <CpuChipIcon className="w-5 h-5 mr-2 text-blue-500" />
            Hardware
          </div>
        }
        bordered={false}
        styles={{
          body: { padding: '0' },
          header: { borderBottom: 'none', padding: '0 16px' }
        }}
      >
        <List
          size="small"
          itemLayout="vertical"
          bordered={false}
          split={false}
          dataSource={hardwareList}
          renderItem={(item) => (
            <List.Item>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-500 text-xs">
                  {item.title}
                </span>
              </div>
              {item.title === 'webGL' ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content.replace(/\n/g, '<br />')
                  }}
                ></div>
              ) : (
                <div>{item.content}</div>
              )}
            </List.Item>
          )}
        />
      </Card>
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
