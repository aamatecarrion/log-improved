import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Names from './pages/Names/Names';
import Log from './pages/Log/Log';
import Nav from './components/Nav/Nav';

import { LocalStorageContext } from './contexts/LocalStorageContext';

import './App.css';
import ExportJson from './pages/ExportJson/ExportJson';
import ImportJson from './pages/ImportJson/ImportJson';
import Charts from './pages/Charts/Charts';
import Name from './pages/Name/Name';
import Settings from './pages/Settings/Settings';
import Info from './pages/Info/Info';
import Pruebas from './pages/Pruebas/Pruebas';

import { es } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers';
// If you are using date-fns v3.x, please import the v3 adapter
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'


const App = () => {
  const { data } = useContext(LocalStorageContext)

  return (

    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <BrowserRouter basename='/log-improved/'>
        <Routes >
          <Route exact path="/" element={<Home></Home>} />
          <Route exact path="/log/:id" element={<Log></Log>} />
          <Route exact path="/charts" element={<Charts></Charts>} />
          <Route exact path="/names" element={<Names></Names>} />
          <Route exact path="/pruebas" element={<Pruebas></Pruebas>} />
          <Route exact path="/settings" element={<Settings></Settings>} />
          <Route exact path="/info" element={<Info></Info>} />
          <Route exact path="/name/:name" element={<Name></Name>} />
          <Route exact path="/exportjson" element={<ExportJson></ExportJson>} />
          <Route exact path="/importjson" element={<ImportJson></ImportJson>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Nav></Nav>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
