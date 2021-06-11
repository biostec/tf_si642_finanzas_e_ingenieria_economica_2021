// import logo from './logo.svg';
// import './App.css';

import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from "./components/Globales/Header"
import Login from "./pages/Login/index"
import Perfil from "./pages/Perfil/index"
import Cartera from "./pages/CarteraFacturas/index"
import Historial from "./pages/HistorialFacturas/index"
import Registro from "./pages/RegistroFacturas/index"

function App() {
  const [logeado, setLogeado] = useState(false);
 return (
    <Router>
      <Header logeado={logeado} setLogeado={setLogeado}  />
      {
        !logeado 
        ? 
          <Login logeado={logeado} setLogeado={setLogeado} /> 
        :
          <React.Fragment>
            <Switch>
              <Route path="/cartera">
                <Cartera />
              </Route>
              <Route path="/historial">
                <Historial />
              </Route>
              <Route path="/registro">
                <Registro />
              </Route>
              <Route path="/">
                <Perfil />
              </Route>
            </Switch>
          </React.Fragment>
      }
    </Router>
  );
}

export default App;
