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
// Helper function to format date with day name


// Function to group records by day
const groupRecordsByDay = (records) => {
  return records.reduce((acc, record) => {
    const day = formatDate(record.date);
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(record);
    return acc;
  }, {});
};

function DayRow(props) {
  
  const colors = useColors()
  const navigate = useNavigate();
  console.log(props.day)
  const dayColor = colors[new Date(props.day).getDay()]
  console.log(dayColor)
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset', backgroundColor: dayColor, userSelect: 'none' }, fontSize: '14px' }}>
        
        <TableCell component="th" scope="row" >
          <Typography variant="h6">{new Date(props.day).toLocaleDateString('es-ES', { weekday: 'long' })} {props.day}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">{props.records.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={3}>
        
            <Table sx={{ margin: 0, userSelect: 'none' }} size="small" aria-label="records">
              <TableBody>
                {props.records.sort((a, b) => b.date - a.date).map((record, index) => (
                  
                   <TableRow
                    key={record.id}
                    sx={{
                      backgroundColor: 'white',
                      textDecorationLine: 'none',
                      '&:hover': {
                        backgroundColor: 'white',
                      },
                    }}
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

DayRow.propTypes = {
  day: PropTypes.string.isRequired,
  records: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default function LogsTable() {
  const { data } = useContext(LocalStorageContext);

  if (!data?.regs) {
    return <Typography>No hay registros</Typography>;
  }
  const groupedRecords = groupRecordsByDay(data.regs);
  const sortedUniqueDays = Object.keys(groupedRecords).sort().reverse();

  return (
    <TableContainer component={Paper} sx={{ mb: 20, }}>
      <Table aria-label="collapsible table">
        <TableBody>
          {sortedUniqueDays.map((day) => (
            <DayRow key={day} day={day} records={groupedRecords[day]} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

    