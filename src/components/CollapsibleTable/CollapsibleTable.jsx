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
import { Link } from 'react-router-dom';

// Helper function to format date with day name
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const dayName = date.toLocaleDateString('default', { weekday: 'long' });
  const formattedDate = date.toLocaleDateString().split('T')[0];
  return `${dayName}, ${formattedDate}`;
};

// Helper function to format time
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format
};

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
  const { day, records } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row" colSpan={5}>
          <Typography variant="h6">{day}</Typography>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="records">
                <TableBody>
                  {records.map((record, index) => (
                    <TableRow
                      key={record.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? 'grey.300' : 'white',
                        textDecorationLine: 'none',
                        '&:hover': {
                          backgroundColor: 'grey.400',
                        },
                      }}
                    component={Link} to={`/log/${record.id}`}
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

  // Get the days sorted in descending order
  const sortedDays = Object.keys(groupedRecords).sort((a, b) => new Date(b) - new Date(a));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {sortedDays.map((day) => (
            <DayRow key={day} day={day} records={groupedRecords[day]} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
