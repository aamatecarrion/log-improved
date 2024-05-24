import React from 'react'
import './Log.css'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
const Log = () => {
  const { data } = useContext(LocalStorageContext)

  return (
    <div>
      <h1>Log</h1>
    </div>
  )
}

export default Log