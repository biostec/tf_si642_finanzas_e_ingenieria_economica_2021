import React from "react";

import { Router, Switch, Route } from "react-router-dom";

import Header from "./components/Globales/Header";
import ManagerSession from "./pages/ManagerSession/index";
import Home from "./pages/Home/index";
import Cartera from "./pages/CarteraFacturas/index";
import Historial from "./pages/HistorialFacturas/index";
import Registro from "./pages/RegistroFacturas/index";
import history from "./utils/history";
import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/login">
            <ManagerSession />
          </Route>
          <PrivateRoute exact path="/carteraFacturas">
            <Cartera />
          </PrivateRoute>
          <PrivateRoute exact path="/historialFacturas">
            <Historial />
          </PrivateRoute>
          <PrivateRoute exact path="/registroFacturas">
            <Registro />
          </PrivateRoute>
          <PrivateRoute exact path="/home">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
