import React, { useContext } from 'react';
import { Box, Paper, Switch, Typography } from '@mui/material';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import useColors from '../../hooks/useColors';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import saludoSegunHora from '../../utils/saludoSegunHora';

const getDayNamesInSpanish = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = format(addDays(new Date(2020, 1, 3), i), 'EEEE', { locale: es }); // 2020-02-03 is a Monday
    days.push(day.charAt(0).toUpperCase() + day.slice(1)); // Capitalize first letter
  }
  return days;
};

const dayNames = getDayNamesInSpanish();

const Settings = () => {
  const { colors, colorChange } = useColors();
  const { data, setData } = useContext(LocalStorageContext);

  return (
    <div style={{ height: '200vh' }}>
      <Paper elevation={6} sx={{ p: '10px', m: '8px' }}>
        <Typography variant="h4">Configuración</Typography>
        <Box sx={{ m: '10px' }}>
          <Typography variant="h9">Modo claro</Typography>
          <Switch
            checked={data.darkMode}
            onChange={(event) => setData({ ...data, darkMode: event.target.checked })}
          />
          <Typography variant="h9">Modo oscuro</Typography>
          <p>(Esto no funciona de momento)</p>
        </Box>
      </Paper>

      <Paper elevation={6} sx={{ p: '10px', m: '8px' }}>
        <Typography variant="h6">Color de fondo de cada día de la semana</Typography>
        {dayNames.map((dayName, index) => {
          const colorKey = `color${dayName}`;
          return (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', my: '10px' }}>
              <label htmlFor={colorKey} style={{ flex: '1' }}>{dayName}</label>
              <input 
                id={colorKey} 
                type="color" 
                value={colors[colorKey] || '#ffffff'}  // Valor por defecto si está indefinido
                onChange={(e) => colorChange(colorKey, e.target.value)}
                style={{ flex: '2', height: '50px', border: 'none', cursor: 'pointer' }} 
              />
            </Box>
          );
        })}
      </Paper>
      <p style={{ position: 'absolute', bottom: '-300px' }}>Aquí no hay nada de momento pero {saludoSegunHora()} gracias por bajar</p>
    </div>
  );
};

export default Settings;