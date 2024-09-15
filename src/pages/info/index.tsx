import React, { useState } from 'react'
import { getBroswerInfos } from '@/utils/getInfos'

function Info() {
  const [browserInfo] = useState(getBroswerInfos())
  return (
    <div>
      <h1 className="mt-4">Info</h1>
      <p>{browserInfo}</p>
    </div>
  )
}

export default Info
