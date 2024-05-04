import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListaRegistros from './ListaRegistros';
import DetalleRegistro from './DetalleRegistro';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListaRegistros} />
        <Route exact path="/registro/:id" component={DetalleRegistro} />
      </Switch>
    </Router>
  );
};

export default App;
