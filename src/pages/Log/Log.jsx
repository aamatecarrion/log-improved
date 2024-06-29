import React, { useEffect, useState } from 'react'
import './Log.css'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import { useNavigate, useParams } from 'react-router-dom'
import timeAgo from '../../utils/timeAgo'
import totalTimeAgo from '../../utils/totalTimeAgo'
import formatTime from '../../utils/formatTime'
import TimeAgo from '../../components/TimeAgo/TimeAgo'
import TimeUnitSelector from '../../components/TimeUnitSelector/TimeUnitSelector'
import TotalTimeAgo from '../../components/TotalTimeAgo/TotalTimeAgo'
import { Box, Button, Card, CardContent, Table, TableCell, TableBody, TableRow, Typography } from '@mui/material'
import EliminarConDialogo from '../../components/EliminarConDialogo/EliminarConDialogo'
import { blue, purple } from '@mui/material/colors'
import formatDate from '../../utils/formatDate'
import { DateCalendar } from '@mui/x-date-pickers'


const Log = () => {
  const { data } = useContext(LocalStorageContext)
  const { id } = useParams()
  const detailedLog = data?.regs?.find((reg) => reg.id === id)
  const [timeUnit, setTimeUnit] = useState('hours')
  const navigate = useNavigate()

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


  return (
    <div>
      <Button variant='contained' onClick={() => navigate('/')}>Volver</Button>
      <EliminarConDialogo registro={detailedLog}></EliminarConDialogo>
      <Card sx={{ pl: '8px', pr: '8px', mt: '8px' }}>
        <Typography variant='h4'>{detailedLog.text}</Typography>
        <p>{formatearFecha(detailedLog.date)}</p>

        <TimeAgo date={detailedLog.date}></TimeAgo>
        <TimeUnitSelector value={timeUnit} fatherFunctionProp={handleTimeUnitChange}></TimeUnitSelector>
        <TotalTimeAgo date={detailedLog.date} unit={timeUnit}></TotalTimeAgo>
      </Card>
      <Card sx={{ pl: '8px', pr: '8px', mt: '8px' }}>
        <div style={{ maxHeight: '200px', overflow: 'auto' }}>
          <table style={{  margin: 'auto', width: '100%', textAlign: 'center', userSelect: 'none' }}>
            <tbody>
              {data.regs.filter((reg) => reg.text === detailedLog.text).sort((a, b) => b.date - a.date).map((record, index) => (
                <tr
                  key={record.id}
                  style={{
                    backgroundColor: (() => {
                      if (record.id === detailedLog.id) {
                        return blue[300];
                      } else if (index % 2 === 0) {
                        return 'white';
                      } else {
                        return 'white';
                      }
                    })(),
                  }}
                  onClick={() => {
                    navigate(`/log/${record.id}`)
                  }}
                >
                  <td style={{  padding: '5px' }}>{new Date(record.date).toLocaleDateString('es-ES', { weekday: 'long' })}</td>
                  <td >{formatDate(record.date)} {formatTime(record.date)}</td>
                  <td>{record.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <DateCalendar showDaysOutsideCurrentMonth sx={{ mb: '300px' }} value={(formatearFecha(detailedLog.date))} readOnly />
      </Card>
    </div >
  )
}

export default Log

