import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Names from './pages/Names/Names';
import Log from './pages/Log/Log';
import Nav from './components/Nav/Nav';
import { LocalStorageProvider } from './contexts/LocalStorageContext';
import './App.css';
import ExportJson from './pages/ExportJson/ExportJson';
import ImportJson from './pages/ImportJson/ImportJson';
import Charts from './pages/Charts/Charts';
import Name from './pages/Name/Name';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale'
import Settings from './pages/Settings/Settings';


dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekStart: 1,
  weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
});

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LocalStorageProvider>
        <BrowserRouter basename='/log-improved/'>
          <Routes >
            <Route exact path="/" element={<Home></Home>} />
            <Route exact path="/log/:id" element={<Log></Log>} />
            <Route exact path="/charts" element={<Charts></Charts>} />
            <Route exact path="/names" element={<Names></Names>} />
            <Route exact path="/settings" element={<Settings></Settings>} />
            <Route exact path="/name/:name" element={<Name></Name>} />
            <Route exact path="/exportjson" element={<ExportJson></ExportJson>} />
            <Route exact path="/importjson" element={<ImportJson></ImportJson>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Nav></Nav>
        </BrowserRouter>
      </LocalStorageProvider>
    </LocalizationProvider>
  );
};

export default App;
