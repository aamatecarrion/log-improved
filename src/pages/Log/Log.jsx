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
import { Button, Card, Typography } from '@mui/material'

const Log = () => {
  const { data } = useContext(LocalStorageContext)
  const { id } = useParams()
  const detailedLog = data?.regs?.find((reg) => reg.id === id)
  const [timeUnit, setTimeUnit] = useState('hours')

  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value);
  }

  const formatearFecha = (date) => {
    const fecha = new Date(date)
    const year = fecha.getFullYear().toString().padStart(4, '0')
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0')
    const day = fecha.getDate().toString().padStart(2, '0')
    const hours = fecha.getHours().toString().padStart(2, '0')
    const minutes = fecha.getMinutes().toString().padStart(2, '0')
    const seconds = fecha.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  console.log(detailedLog)

  return (
    <div>
      <Button variant='contained' onClick={() => window.history.back()}>Volver</Button>
      
      <Card sx={{ pl: '8px', pr: '8px', mt: '8px' }}>
        <Typography variant='h4'>{detailedLog.text}</Typography>
        <p>{formatearFecha(detailedLog.date)}</p>

        <TimeAgo date={detailedLog.date}></TimeAgo>
        <TimeUnitSelector value={timeUnit} fatherFunctionProp={handleTimeUnitChange}></TimeUnitSelector>
        <TotalTimeAgo date={detailedLog.date} unit={timeUnit}></TotalTimeAgo>
      </Card>
    </div>
  )
}

export default Log

