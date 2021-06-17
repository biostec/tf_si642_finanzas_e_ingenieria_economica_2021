import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Globales/Header";
import ManagerLogin from "./pages/Login/index";
import Home from "./pages/Home/index";
import Cartera from "./pages/CarteraFacturas/index";
import Historial from "./pages/HistorialFacturas/index";
import Registro from "./pages/RegistroFacturas/index";
import history from "./utils/history";

const App = () => {
  const [logeado, setLogeado] = useState(false);

  useEffect(() => {
    if (!logeado) history.push("/");
  });

  return (
    <Router history={history}>
      <Header logeado={logeado} setLogeado={setLogeado} />
      {!logeado ? (
        <ManagerLogin logeado={logeado} setLogeado={setLogeado} />
      ) : (
        <Switch>
          <Route path="/carteraFacturas">
            <Cartera />
          </Route>
          <Route path="/historialFacturas">
            <Historial />
          </Route>
          <Route path="/registroFacturas">
            <Registro />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

export default App;
