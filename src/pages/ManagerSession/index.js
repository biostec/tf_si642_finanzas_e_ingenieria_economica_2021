import React, { useState } from "react";
import InicioSesion from "../../components/ManagerSession/InicioSesion";
import Registro from "../../components/ManagerSession/Registro";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./../../components/ManagerSession/style.js";
import imagen from "../../utils/bienvenida.jpg";

const ManagerSession = () => {
  const classes = useStyles();
  const [register, setRegister] = useState(false);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <React.Fragment>
        {register ? (
          <Registro register={register} setRegister={setRegister} />
        ) : (
          <InicioSesion register={register} setRegister={setRegister} />
        )}
      </React.Fragment>
      <Grid item xs={false} md={6} className="100vh">
        <div className="row h-100">
          <img
            src={imagen}
            alt="imagen1"
            className=" mx-auto d-block align-self-center p-5"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default ManagerSession;
