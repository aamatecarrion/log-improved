import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
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

// Helper function to format date with day name
//retorna yyyy-mm-dd a partir de una fecha unix en milisegundos
function convertirTimestampAFecha(timestamp) {
  const fecha = new Date(timestamp);
  const year = fecha.getFullYear();
  const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const day = fecha.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

//retorna hh:mm a partir de una fecha unix
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format
};

// Function to group records by day
const groupRecordsByDay = (records) => {
  return records.reduce((acc, record) => {
    const day = convertirTimestampAFecha(record.date);
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(record);
    return acc;
  }, {});
};

function DayRow(props) {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" colSpan={4}>
          <Typography variant="h6">{new Date(props.day).toLocaleDateString('es-ES', { weekday: 'long' })} {props.day}</Typography>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="records">
                <TableBody>
                  {props.records.sort((a, b) => b.date - a.date).map((record, index) => (
                    <TableRow
                      key={record.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? 'grey.300' : 'white',
                        textDecorationLine: 'none',
                        '&:hover': {
                          backgroundColor: 'grey.400',
                          cursor: 'pointer',
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
            </Box>
          </Collapse>
        </TableCell>
        <TableCell component="th" scope="row">{props.records.length}</TableCell>
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

export default function CollapsibleTable() {
  const { data } = useContext(LocalStorageContext);

  if (!data?.regs) {
    return <Typography>No data available</Typography>;
  }
  const groupedRecords = groupRecordsByDay(data.regs);
  const sortedUniqueDays = Object.keys(groupedRecords).sort().reverse();

  return (
    <TableContainer component={Paper} sx={{ mb: 20 }}>
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
