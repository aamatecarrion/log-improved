import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { purple } from '@mui/material/colors';
import formatTime from '../../utils/formatTime';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useContext } from 'react';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';
import formatDate from '../../utils/formatDate';
import useColors from '../../hooks/useColors';

function getDaysBetweenDates(startDate) {
  const dates = [];

  const startDateObject = new Date(startDate);
  startDateObject.setHours(0, 0, 0, 0);

  const endDateObject = new Date();
  endDateObject.setHours(0, 0, 0, 0);

  const sumador = new Date(startDateObject);
  while (sumador <= endDateObject) {
    dates.push( new Date(sumador).toDateString() );
    sumador.setDate(sumador.getDate() + 1);
  }
  return dates
}

function DayRow(props) {
  


  const colors = useColors()
  const navigate = useNavigate();
  const { data } = useContext(LocalStorageContext);

  const records = data?.regs?.filter((reg) => new Date(reg.date).toDateString() === props.day)   
  console.log(records)
  const dayColor = colors[new Date(props.day).getDay()]
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset', backgroundColor: dayColor, userSelect: 'none' }, fontSize: '14px' }}>

        <TableCell component="th" scope="row" >
          <Typography variant="h6">{new Date(props.day).toLocaleDateString('es-ES', { weekday: 'long' })} {new Date(props.day).toISOString().substring(0, 10)}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">{records.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={3}>

          <Table sx={{ margin: 0, userSelect: 'none' }} size="small" aria-label="records">
            <TableBody>
              {records.sort((a, b) => b.date - a.date).map((record, index) => (

                <TableRow
                  key={record.id}

                  onClick={() => navigate(`log/${record.id}`)}
                >
                  <TableCell>{formatTime(record.date)}</TableCell>
                  <TableCell>{record.text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function LogsTable() {
  const { data } = useContext(LocalStorageContext);

  if (!data?.regs) {
    return <Typography>No hay registros</Typography>;
  } 

  const sortedUniqueDays = getDaysBetweenDates(data.regs[0].date)
  return (
    <TableContainer component={Paper} sx={{ mb: 20, }}>
      <Table aria-label="collapsible table">
        <TableBody>
          {sortedUniqueDays.map((day) => (
            <DayRow key={day} day={day} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

