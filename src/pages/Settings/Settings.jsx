import React, { useContext } from 'react';
import { Box, Paper, Switch, Typography } from '@mui/material';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import useColors from '../../hooks/useColors';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

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
          <p>(Esto no funciona de momento)</p>
        </Box>
      </Paper>

      <Paper elevation={6} sx={{ p: '10px', m: '8px' }}>
        <Typography variant="h6">Color de fondo de cada día de la semana</Typography>
        {dayNames.map((dayName, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', my: '10px' }}>
            <label htmlFor={dayName} style={{ flex: '1' }}>{dayName}</label>
            <input 
              id={dayName} 
              type="color" 
              value={colors[index]} 
              onChange={(e) => colorChange(index, e.target.value)}
              style={{ flex: '2', height: '50px', border: 'none', cursor: 'pointer' }} 
            />
          </Box>
        ))}
      </Paper>
    </React.Fragment>
  );
};

export default Settings;

