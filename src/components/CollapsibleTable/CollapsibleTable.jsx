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
import convertirTimestampAFecha  from '../../utils/convertirTimestampAFecha';
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
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset', padding: "10px", userSelect: 'none' } }} onClick={() => setOpen(!open)}>
        <TableCell>
          <Icon
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Icon>
        </TableCell>
        <TableCell component="th" scope="row" >
          <Typography variant="h6">{new Date(props.day).toLocaleDateString('es-ES', { weekday: 'long' })} {props.day}</Typography>

        </TableCell>
        <TableCell component="th" scope="row">{props.records.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
        <Collapse in={open} timeout={100} unmountOnExit>
          <Box sx={{ margin: 1, userSelect: 'none' }}>
            <Table size="small" aria-label="records">
              <TableBody>
                {props.records.sort((a, b) => b.date - a.date).map((record, index) => (
                  <TableRow
                    key={record.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? purple['A100'] : purple['A200'],
                      textDecorationLine: 'none',
                      '&:hover': {
                        backgroundColor: purple['A400'],
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
