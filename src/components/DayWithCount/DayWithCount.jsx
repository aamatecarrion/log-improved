import React from 'react';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers';
import formatDate from '../../utils/formatDate';
import '../../App.css';

const DayWithCount = (props) => {
  const { counts = {}, day, outsideCurrentMonth, ...other } = props;
  const dateKey = formatDate(day.getTime())

  const count = counts[dateKey] || 0;

  return (
    <Badge
      sx={{ zIndex: 0  }}
      key={day.toString()}
      color="secondary"
      overlap="circular"
      badgeContent={count > 0 ? count : undefined}
      className='dayWithCount'
    >
      <PickersDay className='dayWithCount' {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
};

export default DayWithCount;