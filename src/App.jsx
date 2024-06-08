import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Buttons from './pages/Buttons/Buttons';
import Log from './pages/Log/Log';
import Nav from './components/Nav/Nav';
import { LocalStorageProvider } from './contexts/LocalStorageContext';
import './App.css';
import GearShiftAutoScroll from './components/ScrollUp/ScrollUp';
import ScrollUp from './components/ScrollUp/ScrollUp';
import ExportJson from './pages/ExportJson/ExportJson';
import ImportJson from './pages/ImportJson/ImportJson';

const App = () => {
  return (
    <LocalStorageProvider>
      <BrowserRouter basename='/log-improved/'>
        <Routes >
          <Route exact path="/" element={<Home></Home>} />
          <Route exact path="/buttons" element={<Buttons></Buttons>} />
          <Route exact path="/log/:id" element={<Log></Log>} />
          <Route exact path="/exportjson" element={<ExportJson></ExportJson>} />
          <Route exact path="/importjson" element={<ImportJson></ImportJson>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ScrollUp></ScrollUp>
        <Nav></Nav>
      </BrowserRouter>
    </LocalStorageProvider>
  );
};

export default App;
