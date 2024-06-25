import React, { useContext } from 'react'
import useColors from '../../hooks/useColors'
import { Box, Card, Paper, Switch, Typography } from '@mui/material'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import { Label } from '@mui/icons-material'

const Settings = () => {
  const { colors, colorChange } = useColors()
  const { data, setData } = useContext(LocalStorageContext)

  return (
    <React.Fragment>

      <Paper elevation={6} sx={{ p: '10px', m: '8px' }}>
        <Typography variant="h4">Configuración</Typography>
        <Box sx={{ m: '10px' }}>
          <Typography variant="h9">Modo claro</Typography>
          <Switch
            
            checked={data.darkMode}
            onChange={(event) => setData({ ...data, darkMode: event.target.checked })}
          />
          <Typography variant="h9">Modo oscuro</Typography>
        </Box>
      </Paper>

      <Paper elevation={6} sx={{ p: '10px', m: '8px' }}>
        <p>Esto está en proceso de construcción, se supone que es para elegir el color de fondo de cada día de la semana</p>
        {Object.entries(colors).map(([day, color]) => (
          <div key={day}>
            <label>{day.replace('color', '')}:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => colorChange(day, e.target.value)}
            />
          </div>
        ))}
      </Paper>

    </React.Fragment>
  )
}

export default Settings
