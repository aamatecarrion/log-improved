import React from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import formatDate from '../../utils/formatDate'
import formatTime from '../../utils/formatTime'
import { Box, Button, Card, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { blue, purple } from '@mui/material/colors'

const Name = () => {
    const { data } = useContext(LocalStorageContext)
    const { name } = useParams()
    const navigate = useNavigate()
    
    return (
    <div>
        <Button variant='contained' onClick={() => navigate('/')}>Volver</Button>
        <Card sx={{ pl: '8px', pr: '8px', mt: '8px' }}>
        <Box sx={{ margin: 1, userSelect: 'none' }}>
          <Table size="small" aria-label="records">
            <TableBody>
              {data.regs.filter((reg) => reg.text === name).sort((a, b) => b.date - a.date).map((record, index) => (
                <TableRow
                  key={record.id}
                  sx={{
                    backgroundColor: (() => {
                      if (index % 2 === 0) {
                        return 'white';
                      } else {
                        return 'white';
                      }
                    })(),
              textDecorationLine: 'none',
              '&:hover': {
                backgroundColor: blue['A700'],
                    },
                  }}
              onClick={() => {
                console.log(`/log/${record.id}`)
                navigate(`/log/${record.id}`)
              }}
                >
              <TableCell>{new Date(record.date).toLocaleDateString('es-ES', { weekday: 'long' })}</TableCell>
              <TableCell>{formatDate(record.date)} {formatTime(record.date)}</TableCell>
              <TableCell>{record.text}</TableCell>
            </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
    </div>
  )
}

export default Name
