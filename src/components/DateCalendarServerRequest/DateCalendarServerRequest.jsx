import * as React from 'react';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';


// ###############################################################################
function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}
// ###############################################################################

export default function DateCalendarServerRequest() {

  const { data } = useContext(LocalStorageContext)
  const [highlightedDays, setHighlightedDays] = useState([30,1, 2, 15]);


  

  return (
      <DateCalendar
        showDaysOutsideCurrentMonth
        defaultValue={initialValue}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
  );
}
