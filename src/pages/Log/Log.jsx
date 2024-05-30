import React, { useEffect, useState } from 'react'
import './Log.css'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import { useParams } from 'react-router-dom'
import timeAgo from '../../utils/timeAgo'
import totalTimeAgo from '../../utils/totalTimeAgo'
import TimeAgo from '../../components/TimeAgo/TimeAgo'
import TimeUnitSelector from '../../components/TimeUnitSelector/TimeUnitSelector'
import TotalTimeAgo from '../../components/TotalTimeAgo/TotalTimeAgo'

const Log = () => {
  const { data } = useContext(LocalStorageContext)
  const { id } = useParams()
  const detailedLog = data?.regs?.find((reg) => reg.id === id)
  const [timeUnit, setTimeUnit] = useState('hours')

  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value); 
  }
  
  console.log(detailedLog)
  
  return (
    <div>
      <h1>Log</h1>
      <div>
        <h2>texto: {detailedLog.text}</h2>
        <p>id: {detailedLog.id}</p>
        <p>{new Date(detailedLog.date).toLocaleString()} </p>

        <TimeAgo date={detailedLog.date}></TimeAgo>
        <TimeUnitSelector value={timeUnit} fatherFunctionProp={handleTimeUnitChange}></TimeUnitSelector>
        <TotalTimeAgo date={detailedLog.date} unit={timeUnit}></TotalTimeAgo>
      </div>
    </div>
  )
}

export default Log

