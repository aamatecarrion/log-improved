import * as React from 'react';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

const initialValue = new Date('2022-04-17');

function ServerDay(props) {


  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      variant='dot'      
      color="primary"
    >
      <PickersDay  day={props.day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);


  return (
      <DateCalendar
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