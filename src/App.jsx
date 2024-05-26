import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Buttons from './pages/Buttons/Buttons';
import Graphs from './pages/Graphs/Graphs';
import Log from './pages/Log/Log';
import Nav from './components/Nav/Nav';
import { LocalStorageProvider } from './contexts/LocalStorageContext';
import './App.css';

const App = () => {
  return (
    <LocalStorageProvider>
      <BrowserRouter basename='/log-improved/'>
        <Routes >
          <Route exact path="/" element={<Home></Home>} />
          <Route exact path="/buttons" element={<Buttons></Buttons>} />
          <Route exact path="/log/:id" element={<Log></Log>} />
          <Route exact path="/graphs" element={<Graphs></Graphs>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Nav></Nav>
      </BrowserRouter>
    </LocalStorageProvider>
  );
};

export default App;
