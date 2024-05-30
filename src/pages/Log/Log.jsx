import React, { useEffect, useState } from 'react'
import './Log.css'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import { useParams } from 'react-router-dom'

const Log = () => {
  const { data } = useContext(LocalStorageContext)
  const { id } = useParams()
  const [detailedLog] = useState(() => data?.regs?.filter((reg) => reg.id === id) || [])

  return (
    <div>
      <h1>Log</h1>
      <div>
        {detailedLog.map((reg) => (
          <div key={reg.id}>
            <h2>{reg.text}</h2>
            <p>{new Date(reg.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Log
