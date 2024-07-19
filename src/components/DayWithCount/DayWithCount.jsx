import React from 'react';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers';
import formatDate from '../../utils/formatDate';

const DayWithCount = (props) => {
  const { counts = {}, day, outsideCurrentMonth, ...other } = props;
  const dateKey = formatDate(day.getTime())

  const count = counts[dateKey] || 0;

  return (
    <Badge
      key={day.toString()}
      color="secondary"
      overlap="circular"
      badgeContent={count > 0 ? count : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
};

export default DayWithCount;